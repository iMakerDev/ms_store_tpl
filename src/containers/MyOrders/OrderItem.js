/** @format */

import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import { Constants, Languages } from "@common";
import styles from "./styles";

const cardMargin = Constants.Dimension.ScreenWidth(0.05);

export default class OrderItem extends React.PureComponent {
  _renderAttribute = (label, context, _style) => {
    const {
      theme: {
        colors: { text },
      },
    } = this.props;
    return (
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: text }]}>{label}</Text>
        <Text style={[styles.rowLabel, { color: text }, _style]}>
          {context}
        </Text>
      </View>
    );
  };

  _getDateFormat = (date) => {
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    const day = date.substr(8, 2);
    return `${day}/${month}/${year}`;
  };

  render() {
    const {
      item,
      theme: {
        colors: { primary },
      },
    } = this.props;

    const order = item;

    if (typeof order.line_items === "undefined") {
      return this.renderError(Languages.NoOrder);
    }

    return (
      <View style={{ margin: cardMargin, marginBottom: 0 }}>
        <View style={styles.labelView}>
          <Text style={styles.label}>#{order.number}</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.onViewOrderDetail(order.id);
            }}>
            <Text style={styles.orderDetailLabel(primary)}>
              {Languages.OrderDetails}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5 }}>
          {this._renderAttribute(
            Languages.OrderDate,
            this._getDateFormat(order.date_created)
          )}
          {this._renderAttribute(
            Languages.OrderStatus,
            order.status.toUpperCase()
          )}
          {this._renderAttribute(
            Languages.OrderPayment,
            order.payment_method_title
          )}
          {this._renderAttribute(
            Languages.OrderTotal,
            `${order.total} ${order.currency}`,
            {
              fontWeight: "bold",
              fontSize: 16,
              fontFamily: Constants.fontHeader,
            }
          )}
        </View>
      </View>
    );
  }
}
