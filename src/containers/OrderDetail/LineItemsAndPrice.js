/** @format */

import React from "react";
import { View, Text } from "react-native";
import { get } from "lodash";

import { Languages, Tools } from "@common";
import { ConfirmCheckout } from "@components";
import styles from "./styles";

export default class LineItemsAndPrice extends React.PureComponent {
  getSubTotal = () => {
    const { order } = this.props;
    const cartItems = get(order, "line_items");
    let price = 0;

    // eslint-disable-next-line no-unused-expressions
    cartItems &&
      cartItems.forEach((item) => {
        price += item.price * item.quantity;
      });

    return price;
  };

  render() {
    const {
      order,
      theme: {
        colors: { text, primary },
      },
    } = this.props;

    return (
      <View>
        <View style={[styles.header, {}]}>
          <Text style={styles.label(text)}>
            {Languages.OrderId}: #{order.id}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          {order.line_items.map((o, i) => {
            return (
              <View key={i.toString()} style={styles.lineItem}>
                <Text
                  style={styles.name(text)}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {o.name.replace(/<\/?[span|br][^>]*>/g,"")}
                </Text>
                <Text style={styles.text(text)}>{`x${o.quantity}`}</Text>
                <Text style={styles.text(text)}>
                  {Tools.getCurrencyFormatted(o.total)}
                </Text>
              </View>
            );
          })}
        </View>
        <ConfirmCheckout
          shippingPrice={order.shipping_total}
          subTotal={this.getSubTotal()}
          totalPrice={order.total}
          taxPrice={order.total_tax}
          style={{ margin: 0 }}
          totalStyle={{ color: primary, fontWeight: "bold" }}
          labelStyle={{ color: text, fontWeight: "bold" }}
        />
      </View>
    );
  }
}
