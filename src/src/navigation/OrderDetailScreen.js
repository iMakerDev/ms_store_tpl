/** @format */

import React, { PureComponent } from "react";

import { OrderDetail } from "@containers";

class OrderDetailScreen extends PureComponent {
  render() {
    const { navigation, route } = this.props;
    const id = route?.params?.id;

    if (!id) return null;

    return <OrderDetail navigation={navigation} id={id} />;
  }
}

export default OrderDetailScreen;
