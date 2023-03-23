/* eslint-disable */
/** @format */
import WPUserAPI from '../../services/WPUserAPI'
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import base64 from "base-64";
import Reactotron from "reactotron-react-native";
import Modal from "react-native-modalbox";
import { isObject } from "lodash";
import CustomAPI from "@services/CustomAPI";
import { BlockTimer, toast } from "@app/Omni";
import { StepIndicator } from "@components";
import {
  Languages,
  Images,
  Constants,
  Config,
  withTheme,
  Tools,
} from "@common";

import MyCart from "./MyCart";
import Delivery from "./Delivery";
import Payment from "./Payment";
import FinishOrder from "./FinishOrder";
import PaymentEmpty from "./Empty";
import Buttons from "./Buttons";
import styles from "./styles";
import { async } from 'validate.js';
import { WooWorker } from "api-ecommerce";
/**
 * 购物车容器组件
 */
class Cart extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    user: PropTypes.object,
    onMustLogin: PropTypes.func.isRequired,
    finishOrder: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    onFinishOrder: PropTypes.func.isRequired,
    onViewProduct: PropTypes.func,
    cartItems: PropTypes.array,
    onViewHome: PropTypes.func,
  };
  timer = null;
  static defaultProps = {
    cartItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {

      currentIndex: 0,//下单流程
      // createdOrder: {},
      userInfo: null,
      order: "",
      isLoading: false,
      orderId: null,
      openModal: false,
      checkOutUrl: "",
      Mymess: [],
      user_id: null,
      MyOrders: [],
    };
  }
  tableUnSubscribe = null;

  //获取我的订单列表
  getMyOrder = async (user, token) => {
    let res = await WooWorker.ordersByCustomerId(user.id, `40&token=${token}&timestamp=${Date.now()}`, 1)
    this.setState({ MyOrders: res })
  }

  componentDidMount() {
    this.props.navigation.setParams({ title: Languages.ShoppingCart });
    const { user, token } = this.props;
    this.tableUnSubscribe = this.props.navigation.addListener('focus', () => {
      this.getMyOrder(user.user, token)
    })
  }
  componentWillUnmount() {
    this.tableUnSubscribe && this.tableUnSubscribe()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // reset current index when update cart item
    if (this.props.cartItems && nextProps.cartItems) {
      if (nextProps.cartItems.length !== 0) {
        if (this.props.cartItems.length !== nextProps.cartItems.length) {
          this.updatePageIndex(0);
          this.onChangeTabIndex(0);
        }
      }
    }
  }

  checkUserLogin = () => {
    const { user } = this.props.user;

    // check anonymous checkout
    if (!Config.Login.AnonymousCheckout) {

      if (user === null) {

        this.props.onMustLogin();
        return false;
      }
    }

    return true;
  };

  onNext = () => {

    // check validate before moving next
    let valid = true;
    console.log(333333)
    // console.log(this.state.currentIndex)
    switch (this.state.currentIndex) {

      case 0:
        {
          if (Config.EnableOnePageCheckout) {


            const order = {
              line_items: Tools.getItemsToCheckout(this.props.cartItems),
              token:
                this.props.user && this.props.user.token
                  ? this.props.user.token
                  : null,
            };
            const params = base64.encode(
              encodeURIComponent(JSON.stringify(order))
            );
            CustomAPI.getCheckoutUrl({ order: params }, (checkOutUrl) => {
              this.setState({ checkOutUrl, openModal: true }, () => {
                this.checkoutModal.open();
              });
            });
            return;
          }

          valid = this.checkUserLogin();
        }
        break;
      default:
        break;
    }
    
    clearTimeout(this.timer)
    this.timer=setTimeout(() => {
      if (valid && typeof this.tabCartView !== "undefined") {
        console.log(455555)
        const nextPage = this.state.currentIndex + 1;
        // console.log(this.state)
        this.tabCartView.goToPage(nextPage);
      }
    }, 500);
    // 节流
    // if (this.timer) {
    //   return
    // }
    // this.timer = setTimeout(() => {
    //   if (valid && typeof this.tabCartView !== "undefined") {
    //     console.log(455555)
    //     const nextPage = this.state.currentIndex + 1;
    //     // console.log(this.state)
    //     this.tabCartView.goToPage(nextPage);
    //   }
    //  this.timer = null
    // }, 3000)

};


renderCheckOut = () => {
  const userAgentAndroid =
    "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30";
  return (
    <Modal
      ref={(modal) => (this.checkoutModal = modal)}
      coverScreen
      position="top"
      keyboardTopOffset={0}
      backdropPressToClose={false}
      backButtonClose
      transparent={false}
      backdropColor="black"
      swipeToClose={false}
      onClosed={this._onClosedModal}
      style={styles.modal}>
      <WebView
        startInLoadingState

        style={styles.webView}
        source={{ uri: this.state.checkOutUrl }}
        userAgent={userAgentAndroid}
        onNavigationStateChange={(status) =>
          this._onNavigationStateChange(status)
        }
        scalesPageToFit
      />
      <TouchableOpacity
        style={styles.iconZoom}
        onPress={() => {
          this.checkoutModal.close();
          this.setState({ openModal: false });
        }}>
        <Text style={styles.textClose}>{Languages.close}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

_onClosedModal = () => {
  // console.log(this.state.orderId);
  const { user, token } = this.props

  if (this.state.orderId != null) {
    this.setState({ openModal: false });
    this.checkoutModal.close();
    this.props.finishOrder();
     if (this.state.orderId && this.state.Mymess.length && this.getOrderState(this.state.orderId) !== "pending") {
    this.updateCouponState(this.state.Mymess, this.state.user_id, this.state.orderId)
  }
  this.setState({orderId:null});
    this.tabCartView.goToPage(3);
  } else {
    this.tabCartView.goToPage(0);
  }
  this.setState({ isLoading: false });
  this.getMyOrder(user.user, token);
};

_onNavigationStateChange = (status) => {
  const { url } = status;
  // console.log("=================================")
  console.log(status);
  console.log(url.indexOf(Config.WooCommerce.url));
  console.log(url.indexOf("order-received"));
  if (
    url.indexOf(Config.WooCommerce.url) === 0 &&
    url.indexOf("order-received") !== -1
  ) {
    var orderId = ((status.url.match(/(order-received\/\d+)+(\/|\?|$)/) || [
      "",
    ])[0].match(/\d+/) || [""])[0];
    console.log(orderId);
    if (orderId) {
      this.setState({ orderId });
      // params = params[1].split("&");
      // params.forEach((val) => {
      //   const now = val.split("=");
      //   if (now[0] == "key" && now["1"].indexOf("wc_order") == 0) {
      //     this.setState({ orderId: now["1"].indexOf("wc_order") });
      //   }
      // });
      this.getOrderState(orderId);
    }
  }

};

UpdateCouponMess = async (Mymess) => {
  console.log(Mymess)
}
//Paypal支持调用
onShowNativeOnePageCheckOut = async (order, Mymess) => {
  let { user } = this.props.user
  console.log('100101010101010');
  console.log('订单数据');
  this.setState({ Mymess: Mymess, user_id: user.id })
  const params = base64.encode(encodeURIComponent(JSON.stringify(order)));
  CustomAPI.getCheckoutUrl({ order: params }, { country: order.billing.country }, (checkOutUrl) => {
    this.setState({ checkOutUrl, openModal: true }, () => {
      this.checkoutModal.open();
    });
  });
};

onShowCheckOut = async (order) => {
  Reactotron.log("order", order);
  const params = base64.encode(encodeURIComponent(JSON.stringify(order)));
  const checkOutUrl = `${Config.WooCommerce.url}/${Constants.WordPress.checkout}/?order=${params}`;

  await this.setState({ order, openModal: true, checkOutUrl });
  this.checkoutModal.open();
};

onPrevious = () => {
  if (this.state.currentIndex === 0) {
    this.props.onBack();
    return;
  }
  this.tabCartView.goToPage(this.state.currentIndex - 1);
};

updatePageIndex = (page) => {
  this.setState({ currentIndex: isObject(page) ? page.i : page });
};

onChangeTabIndex = (page) => {
  if (this.tabCartView) {
    this.tabCartView.goToPage(page);
  }
};
//修改Coupon数据
updateCouponState = async (Mymess, id, order_id) => {
  //修改coupon数据
  for (let item of Mymess[0].Mycoupon.coupons) {
    if (item.id === Mymess[0].id) {
      item.pay_at = new Date();
      item.order_id = order_id
    }
  }
  //发送请求保存数据
  await WPUserAPI.UpdateUserCoupon(
    id, {
    "meta_data": [{ "key": "UserMeta", "value": JSON.stringify(Mymess[0].Mycoupon) }]
  }
  )
}
getOrderState = async (id) => {
  let { status } = await WPUserAPI.GetOrderState(id);
  // console.log("===============================")
  console.log(status);
  return status;
}

finishOrder = () => {
  const { onFinishOrder } = this.props;
  this.props.finishOrder();


 

  onFinishOrder();
  BlockTimer.execute(() => {
    this.tabCartView.goToPage(0);
  }, 1500);
};

render() {
  const { onViewProduct, navigation, cartItems, onViewHome } = this.props;
  const { currentIndex } = this.state;
  const {
    theme: {
      colors: { background },
    },
  } = this.props;

  const { openModal } = this.state;

  if (currentIndex === 0 && cartItems && cartItems.length === 0) {
    return <PaymentEmpty onViewHome={onViewHome} />;
  }
  const steps = [
    { label: Languages.MyCart, icon: Images.IconCart },
    { label: Languages.Delivery, icon: Images.IconPin },
    { label: Languages.Payment, icon: Images.IconMoney },
    { label: Languages.Order, icon: Images.IconFlag },
  ];
  return (
    <View style={[styles.fill, { backgroundColor: background }]}>
      {this.renderCheckOut()}
      <View style={styles.indicator}>
        <StepIndicator
          steps={steps}
          openModal={openModal}
          order={this.state.order}
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
          style={{ backgroundColor: background }}
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
            myOrders={this.state.MyOrders}
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
            isLoading={this.state.isLoading}
            onShowCheckOut={this.onShowCheckOut}
            onShowNativeOnePageCheckOut={this.onShowNativeOnePageCheckOut}
          />

          <FinishOrder key="finishOrder" finishOrder={this.finishOrder} />
        </ScrollableTabView>

        {currentIndex === 0 && (
          <Buttons onPrevious={this.onPrevious} onNext={this.onNext} />
        )}
      </View>
    </View>
  );
}
}

const mapStateToProps = ({ carts, user }) => ({
  cartItems: carts.cartItems,
  user,
  token: user.token,
  myOrders: carts.myOrders
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("@redux/CartRedux");

  return {
    ...ownProps,
    ...stateProps,
    emptyCart: () => CartRedux.actions.emptyCart(dispatch),
    finishOrder: () => CartRedux.actions.finishOrder(dispatch),
    fetchMyOrder: (user, token) => CartRedux.actions.fetchMyOrder(dispatch, user, token)
  };
}

export default withTheme(
  connect(mapStateToProps, undefined, mergeProps)(Cart)
)
