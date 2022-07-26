/** @format */

import React, { Component } from "react";

import { MyOrders } from "@containers";

export default class MyOrdersScreen extends Component {
  static navigationOptions = () => ({});

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <MyOrders
        navigate={navigation}
        onViewHomeScreen={() => navigate("Default")}
        onViewOrderDetail={(id) => navigate("OrderDetailScreen", { id })}
      />
    );
  }
}
