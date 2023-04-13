/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { ScrollableTabView } from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import {
  PAYMENT_APPROVED_CODE,
  PAYMENT_CANCELED_CODE,
  PAYMENT_ERROR_CODE,
} from "@services/PayPalAPI";
import { PaypalPanel, StepIndicator, StripePanel } from "@components";
import { WooWorker } from "api-ecommerce";
import StripeAPI from "@services/StripeAPI";
import stripe from "@stripe/stripe-react-native";
import { Languages, Images, Config } from "@common";
import { BlockTimer, toast } from "@app/Omni";
import Modal from "react-native-modalbox";

import MyCart from "./MyCart";
import Delivery from "./Delivery";
import FinishOrder from "./FinishOrder";
import PaymentEmpty from "./Empty";
import Buttons from "./Buttons";
import Payment from "./Payment";

import styles from "./styles";

stripe.initStripe({
  publishableKey: Config.Stripe.publishableKey,
});

export const OrderStatus = {
  pending: "pending",
  processing: "processing",
  onHold: "on-hold",
  completed: "completed",
  cancelled: "cancelled",
  refunded: "refunded",
  failed: "failed",
};

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      createdOrder: {},
      userInfo: null,
    };
  }

  checkUserLogin = () => {
    const { user } = this.props.user;
    if (user === null) {
      this.props.onMustLogin();
      return false;
    }
    return true;
  };

  onNext = () => {
    // check validate before moving next
    let valid = true;
    switch (this.state.currentIndex) {
      case 0:
        valid = this.checkUserLogin();
        break;

      default:
        break;
    }

    if (valid && typeof this.tabCartView !== "undefined") {
      const nextPage = this.state.currentIndex + 1;
      this.tabCartView.goToPage(nextPage);
    }
  };

  onPrevious = () => {
    if (this.state.currentIndex === 0) {
      this.props.onBack();
      return;
    }
    this.tabCartView.goToPage(this.state.currentIndex - 1);
  };

  updatePageIndex = (page) => {
    this.setState({ currentIndex: page.i });
  };

  onChangeTabIndex = (page) => {
    this.tabCartView && this.tabCartView.goToPage(page);
  };

  renderPaypalLayout = () => {
    return (
      <Modal
        ref="PayPalModal"
        backdropPressToClose={false}
        backButtonClose
        swipeToClose
        onClosed={() => this.completePurchase(this.state.paymentState)}
        style={{ flex: 1 }}>
        <PaypalPanel
          ref="payPalPanel"
          order={this.state.createdOrder}
          setPaymentStates={(paymentState) => this.setState({ paymentState })}
          closeModal={() => this.refs.PayPalModal.close()}
        />
      </Modal>
    );
  };

  renderStripeLayout = () => {
    return (
      <Modal
        ref="StripeModal"
        backdropPressToClose={false}
        backButtonClose
        swipeToClose
        onClosed={() => this.completePurchase(this.state.paymentState)}
        style={{ flex: 1 }}>
        <StripePanel
          ref="stripePanel"
          order={this.state.createdOrder}
          setPaymentStates={(paymentState) => this.setState({ paymentState })}
          closeModal={() => this.refs.StripeModal.close()}
        />
      </Modal>
    );
  };

  completePurchase = (responseCode) => {
    const orderId = this.state.createdOrder.id;
    switch (responseCode) {
      case PAYMENT_APPROVED_CODE:
        WooWorker.setOrderStatus(orderId, OrderStatus.processing, () => {
          this.setState({ isLoading: false });
          this.onNext();
        });
        break;
      case PAYMENT_CANCELED_CODE:
        WooWorker.setOrderStatus(orderId, OrderStatus.cancelled, () => {
          this.setState({ isLoading: false });
        });
        break;
      case PAYMENT_ERROR_CODE:
        WooWorker.setOrderStatus(orderId, OrderStatus.failed, () => {
          this.setState({ isLoading: false });
        });
        break;
      default:
      // just close the modal or error
    }
  };

  onShowPaypal = (createdOrder) => {
    this.setState({ createdOrder });
    this.refs.PayPalModal.open();
  };

  onShowStripe = (createdOrder) => {
    this.setState({ createdOrder });
    this.handleStripePayment();
  };

  handleStripePayment = async () => {
    try {
      this.setState({
        loading: true,
        token: null,
      });
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: "full",
        prefilledInformation: {},
      });
      this.setState({ loading: false, token });

      if (token) {
        StripeAPI.processPayment(
          token,
          this.state.createdOrder.total,
          (response) => {
            toast(response.message);
            if (response.success) {
              WooWorker.setOrderStatus(
                this.state.createdOrder.id,
                OrderStatus.processing,
                (responseData) => {
                  this.setState({ isLoading: false });
                }
              );

              this.props.emptyCart();
              this.onNext();
            }
          }
        );
      }
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ title: Languages.ShoppingCart });
  }

  finishOrder = () => {
    const { onFinishOrder } = this.props;
    onFinishOrder();
    BlockTimer.execute(() => {
      this.tabCartView.goToPage(0);
    }, 1500);
  };

  render() {
    const { onViewProduct, navigation, cartItems, onViewHome } = this.props;
    const { currentIndex } = this.state;

    if (currentIndex == 0 && cartItems && cartItems.length == 0) {
      return <PaymentEmpty onViewHome={onViewHome} />;
    }
    const steps = [
      { label: Languages.MyCart, icon: Images.IconCart },
      { label: Languages.Delivery, icon: Images.IconPin },
      { label: Languages.Payment, icon: Images.IconMoney },
      { label: Languages.Order, icon: Images.IconFlag },
    ];
    return (
      <View style={styles.fill}>
        <View style={styles.indicator}>
          <StepIndicator
            steps={steps}
            onChangeTab={this.onChangeTabIndex}
            currentIndex={currentIndex}
          />
        </View>
        <View style={styles.content}>
          <ScrollableTabView
            ref={(tabView) => {
              this.tabCartView = tabView;
            }}
            locked
            onChangeTab={this.updatePageIndex}
            style={{ backgroundColor: "#fff" }}
            initialPage={0}
            tabBarPosition="overlayTop"
            prerenderingSiblingsNumber={1}
            renderTabBar={() => <View style={{ padding: 0, margin: 0 }} />}>
            <MyCart
              key="cart"
              onNext={this.onNext}
              onPrevious={this.onPrevious}
              navigation={navigation}
              onViewProduct={onViewProduct}
            />

            <Delivery
              key="delivery"
              onNext={(formValues) => {
                this.setState({ userInfo: formValues });
                this.onNext();
              }}
              onPrevious={this.onPrevious}
            />
            <Payment
              key="payment"
              onPrevious={this.onPrevious}
              onNext={this.onNext}
              userInfo={this.state.userInfo}
              onShowStripe={this.onShowStripe}
              onShowPaypal={this.onShowPaypal}
            />

            <FinishOrder key="finishOrder" finishOrder={this.finishOrder} />
          </ScrollableTabView>

          {this.renderPaypalLayout()}
          {this.renderStripeLayout()}

          {currentIndex == 0 && (
            <Buttons onPrevious={this.onPrevious} onNext={this.onNext} />
          )}
        </View>
      </View>
    );
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("@redux/CartRedux");
  return {
    ...ownProps,
    ...stateProps,
    emptyCart: () => {
      CartRedux.actions.emptyCart(dispatch);
    },
  };
}

const mapStateToProps = ({ carts, user }) => ({
  cartItems: carts.cartItems,
  user,
});
export default connect(mapStateToProps, undefined, mergeProps)(Cart);
