/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";

import { withTheme } from "@common";
import Footer from "./Footer";
import ShippingAddress from "./ShippingAddress";
import LineItemsAndPrice from "./LineItemsAndPrice";
import OrderStatus from "./OrderStatus";
import OrderNotes from "./OrderNotes";
import styles from "./styles";
import AddCredit from "./AddCredit";

class OrderDetail extends React.PureComponent {
  componentDidMount() {
    this.props.getOrderNotes(this.props.order.id);
  }

  render() {
    const { order, theme, orderNotes } = this.props;
    console.log(order);
    return (
      <ScrollView
        style={styles.container(theme.colors.background)}
        contentContainerStyle={styles.contentContainer}>
        <LineItemsAndPrice order={order} theme={theme} />
        <OrderStatus order={order} theme={theme} />
        <ShippingAddress billing={order.billing} theme={theme} />
        <OrderNotes orderNotes={orderNotes} theme={theme} />
        {
          ['completed','cancelled','refunded'].includes(order.status) ? null:<Footer order={order} />
        }
        {/* { order.status === "pending" || order.status === "processing" &&(
          <Footer order={order} />
        )} */}
        {
          order.status === "completed" && 
          <AddCredit order={order} />
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ carts }, ownProps) => {
  const order = carts.myOrders.find((o, i) => o.id === ownProps.id);

  return { carts, order, orderNotes: carts.orderNotes };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CartRedux");
  return {
    ...ownProps,
    ...stateProps,
    getOrderNotes: (orderId) => {
      actions.getOrderNotes(dispatch, orderId);
    },
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(withTheme(OrderDetail));
