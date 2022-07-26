/** @format */

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { WooWorker } from "api-ecommerce";
import { connect } from "react-redux";

import { withTheme, Languages } from "@common";
import { Button } from "@components";
import styles from "./styles";
import { toast } from "@app/Omni";

export const OrderStatus = {
  cancelled: "cancelled",
  refunded: "refunded",
};

class Footer extends React.PureComponent {
  state = { [OrderStatus.cancelled]: false, [OrderStatus.refunded]: false };

  _onPress = async (order, status, user,token) => {
    this.setState({ [status]: true });
    const json = await WooWorker.updateOrder({ ...{ ...order, coupon_lines: [] }, status, }, order.id);
    // const json = await WooWorker.updateOrder({ ...order, status }, order.id);
    console.log(json);
    // fetch my order when update success
   


    try {
      if (json instanceof Error || json.message) toast(json.message);
      if (json.data && json.data.status == "400") {
        toast('修改失败')
      } else {
        toast('修改成功');
        if (json.hasOwnProperty("id")) {
          if (typeof user === "undefined" || user === null) return;
          this.props.fetchMyOrder(user,token);
        }
      }
    } catch (e) {
      toast('修改失败')
    }

    this.setState({ [status]: false });
  };

  render() {
    const {
      order,
      user,
      token
    } = this.props;
    const { cancelled, refunded } = this.state;
    // console.log(user);
    // 填充没有parent_name的属性
    for (let i = 0; i < order.line_items.length; i++) {
      if (order.line_items[i].parent_name === null) {
        order.line_items[i].parent_name = order.line_items[i].name;
      }
    }
    return (
      <View style={styles.footer}>
        <Button
          text={Languages.Cancel}
          style={[styles.button, { backgroundColor: "#ff1744" }]}
          textStyle={styles.buttonText}
          onPress={() => this._onPress(order, OrderStatus.cancelled, user,token)}
          isLoading={cancelled}
        />
        <Button
          text={Languages.Refund}
          style={[styles.button]}
          textStyle={styles.buttonText}
          onPress={() => this._onPress(order, OrderStatus.refunded, user,token)}
          isLoading={refunded}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({  user,token:user.token, });

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CartRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchMyOrder: (user) => {
      actions.fetchMyOrder(dispatch, user);
    },
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(withTheme(Footer));
