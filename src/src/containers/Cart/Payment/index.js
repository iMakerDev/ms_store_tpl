/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { WooWorker } from "api-ecommerce";
import HTML from "react-native-render-html";
import Reactotron from "reactotron-react-native";
import { isArray } from "lodash";
import WPUserAPI from '../../../services/WPUserAPI'
import { toast, warn } from "@app/Omni";
import { Button, ConfirmCheckout } from "@components";
import { Config, Images, Languages, Tools, withTheme } from "@common";
import Buttons from "@cart/Buttons";
import css from "@cart/styles";

import styles from "./styles";

const { width } = Dimensions.get("window");
class PaymentOptions extends PureComponent {
  // eslint-disable-next-line react/static-property-placement

  static propTypes = {
    fetchPayments: PropTypes.func,
    message: PropTypes.array,
    type: PropTypes.string,
    cleanOldCoupon: PropTypes.func,
    onNext: PropTypes.func,
    user: PropTypes.object,
    userInfo: PropTypes.object,
    currency: PropTypes.any,
    payments: PropTypes.object,
    isLoading: PropTypes.bool,
    cartItems: PropTypes.any,
    onShowCheckOut: PropTypes.func,
    emptyCart: PropTypes.func,
    couponCode: PropTypes.any,
    couponId: PropTypes.any,
    couponAmount: PropTypes.any,
    shippingMethod: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // token: null,
      selectedIndex: 0,
      // accountNumber: '',
      // holderName: '',
      // expirationDate: '',
      // securityCode: '',
      // paymentState: '',
      // createdOrder: {},
      Integral: 0,
      Coupons_list: [],
      Integral_records: [],
    };
  }

  componentDidMount() {
    console.log(666666)
    // console.log(this.props)
    this.props.fetchPayments();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message.length > 0) {
      // Alert.alert(Languages.Error, nextProps.carts.message)
      toast(nextProps.message);
    }

    if (
      nextProps.type !== this.props.type &&
      nextProps.type === "CREATE_NEW_ORDER_SUCCESS"
    ) {
      warn(nextProps);
      this.props.cleanOldCoupon();
      this.props.onNext();
    }
  }

  nextStep = () => {
    const {
      userInfo,
      currency,
      payments: { list },
      user: { user, token },
    } = this.props;
    const { selectedIndex } = this.state;
    const coupon = this.getMyNInfor();

    if (!list || (list && !list[selectedIndex])) {
      return;
    }

    // Billing First name is a required field.
    // Billing Last name is a required field.
    // Billing Country is a required field.
    // Billing Street address is a required field.
    // Billing Town / City is a required field.

    const payload = {
      token,
      customer_id: user ? user.id : 0, // using for anonymous
      set_paid: false,
      payment_method: list[selectedIndex].id,
      payment_method_title: list[selectedIndex].title,
      billing: {
        ...(user ? user.billing : null),
        email: userInfo.email,
        phone: userInfo.phone,
        first_name:
          user && user.billing.first_name.length === 0
            ? userInfo.first_name
            : user
              ? user.billing.first_name
              : userInfo.first_name,
        last_name:
          user && user.billing.last_name.length === 0
            ? userInfo.last_name
            : user
              ? user.billing.last_name
              : userInfo.last_name,
        address_1:
          user && user.billing.address_1.length === 0
            ? userInfo.address_1
            : user
              ? user.billing.address_1
              : userInfo.address_1,
        city:
          user && user.billing.city.length === 0
            ? userInfo.city
            : user
              ? user.billing.city
              : userInfo.city,
        state:
          user && user.billing.state.length === 0
            ? userInfo.state
            : user
              ? user.billing.state
              : userInfo.state,
        country:
          user && user.billing.country.length === 0
            ? userInfo.country
            : user
              ? user.billing.country
              : userInfo.country,
        postcode:
          user && user.billing.postcode.length === 0
            ? userInfo.postcode
            : user
              ? user.billing.postcode
              : userInfo.postcode,
      },
      shipping: {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        address_1: userInfo.address_1,
        city: userInfo.city,
        state: userInfo.state,
        country: userInfo.country,
        postcode: userInfo.postcode,
      },
      line_items: Tools.getItemsToCheckout(this.props.cartItems),
      customer_note: typeof userInfo.note !== "undefined" ? userInfo.note : "",
      currency: currency.code,
    };

    // check the shipping info
    if (Config.shipping.visible) {
      payload.shipping_lines = this.getShippingMethod();
    }

    // check the coupon
    if (coupon.length !== 0) {
      payload.coupon_lines = this.getCouponInfo();
    }

    this.setState({ loading: this.props.isLoading });

    // warn([userInfo, payload]);

    if (list[selectedIndex].id === "cod") {
      //走woo货到付款
      this.setState({ loading: true });
      // console.log("进来了货到付款")
      WooWorker.createNewOrder(
        payload,
        async (res) => {
          this.setState({ loading: false });
          this.props.emptyCart();
          this.props.onNext();
          console.log("-----------------------------------------------")
          // console.log(coupon[0].id);
          if(coupon[0].id){
            console.log("======================================")
            for (let item of coupon[0].Mycoupon.coupons) {
              if (item.id === coupon[0].id) {
                item.pay_at = new Date();
                // item.order_id=res.id
              }
            }
            await WPUserAPI.UpdateUserCoupon(
              user.id, {
              "meta_data": [{ "key":"UserMeta","value":JSON.stringify(coupon[0].Mycoupon)}]
            }
            )
          }
          console.log("*****************************************")
        },
        (rej) => {
          warn("failure");
          // console.log(coupon[0].Mycoupon)
          toast("Something was wrong! Could not checkout.");

          this.setState({ loading: false });
        }
      );

    } else if (Config.NativeOnePageCheckout) {
      //走一键支付
      // other kind of payment
      console.log('一键支付')
      Reactotron.log("payload", payload);
      // payload.billing_city = payload.city;
    
      this.props.onShowNativeOnePageCheckOut(payload,coupon);
      
    } else {
      console.log("进来了支票")
      Reactotron.log("payload", payload);
      this.props.onShowCheckOut(payload);
    }
    // console.log("没进去")
     this.props.cleanOldCoupon();

  };

  getMyNInfor=()=>{
    const { couponCode, couponAmount, couponId, Mycoupon } = this.props;
    if (
      typeof couponCode !== "undefined" &&
      typeof couponAmount !== "undefined" &&
      couponAmount > 0
    ) {
      return [
        {
          id: couponId,
          code: couponCode,
          discount: `${couponAmount}`,
          Mycoupon
        },
      ];
    }
    return [];
  }

  getCouponInfo = () => {
    // console.log(this.props.id)
    const { couponCode, couponAmount } = this.props;
    if (
      typeof couponCode !== "undefined" &&
      typeof couponAmount !== "undefined" &&
      couponAmount > 0
    ) {
      return [
        {     
          code: couponCode,
          discount: `${couponAmount}`,
        },
      ];
    }
    return [];
  };

  getShippingMethod = () => {
    const { shippingMethod } = this.props;

    if (typeof shippingMethod !== "undefined") {
      return [
        {
          method_id: `${shippingMethod.method_id}:${shippingMethod.id}`,
          method_title: shippingMethod.title,
          total:
            shippingMethod.id === "free_shipping" ||
              shippingMethod.method_id === "free_shipping"
              ? "0"
              : shippingMethod.settings.cost.value,
        },
      ];
    }
    // return the free class as default
    return [
      {
        method_id: "free_shipping",
        total: "0",
      },
    ];
  };

  renderDesLayout = (item) => {
    if (typeof item === "undefined") {
      return <View />;
    }
    if (item.description === null || item.description === "") return <View />;

    const tagsStyles = {
      p: {
        color: "#666",
        flex: 1,
        textAlign: "center",
        width,
        // paddingLeft: 20,
      },
    };
    return (
      <View style={styles.descriptionView}>
        <HTML tagsStyles={tagsStyles} html={`<p>${item.description}</p>`} />
      </View>
    );
  };

  render() {
    const { list } = this.props.payments;
    const {
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={css.rowEmpty}>
            <Text style={[styles.label, { color: text }]}>
              {Languages.SelectPayment}
              :
            </Text>
          </View>

          <View style={styles.paymentOption}>
            {list.map((item, index) => {
              if (!item.enabled) return null;

              const image =
                typeof Config.Payments[item.id] !== "undefined" &&
                Config.Payments[item.id];
              if (!image) return null;

              return (
                <View style={styles.optionContainer} key={index.toString()}>
                  <Button
                    type="image"
                    source={image}
                    defaultSource={Images.defaultPayment}
                    onPress={() => this.setState({ selectedIndex: index })}
                    buttonStyle={[
                      styles.btnOption,
                      this.state.selectedIndex == index &&
                      styles.selectedBtnOption,
                    ]}
                    imageStyle={styles.imgOption}
                  />
                </View>
              );
            })}
          </View>
          {this.renderDesLayout(list[this.state.selectedIndex])}

          <ConfirmCheckout
            couponAmount={this.props.couponAmount}
            discountType={this.props.discountType}
            shippingPrice={this.getShippingPrice()}
            totalPrice={this.getTotalPrice()}
            subTotal={this.getSubTotal()}
            currency={this.props.currency}
          />
        </ScrollView>

        <Buttons
          isAbsolute
          onPrevious={this.props.onPrevious}
          isLoading={this.state.loading}
          nextText={Languages.ConfirmOrder}
          onNext={this.nextStep}
        />
      </View>
    );
  }

  getExistCoupon = () => {
    const { couponAmount, discountType } = this.props;
    if (discountType === "percent") {
      return couponAmount / 100.0;
    }
    return couponAmount;
  };

  getShippingPrice = () => {
    const shippingMethod = this.getShippingMethod();

    return shippingMethod && isArray(shippingMethod)
      ? shippingMethod[0].total
      : shippingMethod;
  };

  getSubTotal = () => {
    const { cartItems, currency } = this.props;
    let price = 0;

    cartItems.forEach((cart) => {
      const product =
        cart.variation && cart.variation.price !== ""
          ? cart.variation
          : cart.product;

      const productPrice = Tools.getMultiCurrenciesPrice(product, currency);

      price += productPrice * cart.quantity;
    });

    return price;
  };

  getTotalPrice = () => {
    const { discountType } = this.props;
    const totalPrice = this.getSubTotal();
    const shippingPrice = this.getShippingPrice();

    const discount =
      discountType === "percent"
        ? this.getExistCoupon() * totalPrice
        : this.getExistCoupon();

    return (
      parseFloat(totalPrice) +
      parseFloat(shippingPrice) -
      parseFloat(discount || 0)
    );
  };
}

const mapStateToProps = ({ payments, carts, user, products, currency }) => {
  return {
    payments,
    user,
    type: carts.type,
    cartItems: carts.cartItems,
    totalPrice: carts.totalPrice,
    message: carts.message,
    customerInfo: carts.customerInfo,

    couponCode: products.coupon && products.coupon.code,
    couponAmount: products.coupon && products.coupon.amount,
    discountType: products.coupon && products.coupon.type,
    couponId: products.coupon && products.coupon.id,
    Mycoupon: products.Mycoupon,

    shippingMethod: carts.shippingMethod,

    currency,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("@redux/CartRedux");
  const productActions = require("@redux/ProductRedux").actions;
  const paymentActions = require("@redux/PaymentRedux").actions;
  return {
    ...ownProps,
    ...stateProps,
    emptyCart: () => CartRedux.actions.emptyCart(dispatch),
    createNewOrder: (payload) => {
      CartRedux.actions.createNewOrder(dispatch, payload);
    },
    cleanOldCoupon: () => {
      productActions.cleanOldCoupon(dispatch);
    },
    fetchPayments: () => {
      paymentActions.fetchPayments(dispatch);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(PaymentOptions));
