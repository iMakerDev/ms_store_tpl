/** @format */

import React, { PureComponent } from "react";
import { Text, View } from "react-native";

import { Languages, withTheme, Tools } from "@common";
import styles from "./styles";

class ConfirmCheckout extends PureComponent {
  render() {
    const {
      discountType,
      couponAmount,
      shippingPrice,
      subTotal,
      totalPrice,
      totalStyle,
      labelStyle,
      style,
      currency,
      taxPrice,
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.row}>
          <Text style={[styles.label, labelStyle]}>{Languages.Subtotal}</Text>
          <Text style={[styles.value, { color: text }]}>
            {Tools.getCurrencyFormatted(subTotal, currency)}
          </Text>
        </View>

        {couponAmount > 0 && (
          <View style={styles.row}>
            <Text style={[styles.label, labelStyle]}>{Languages.Discount}</Text>
            <Text style={[styles.value, { color: text }]}>
              {discountType === "percent"
                ? `${parseFloat(couponAmount)}%`
                : Tools.getCurrencyFormatted(couponAmount, currency)}
            </Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={[styles.label, labelStyle]}>{Languages.Shipping}</Text>
          <Text style={[styles.value, { color: text }]}>
            {Tools.getCurrencyFormatted(shippingPrice, currency)}
          </Text>
        </View>

        {taxPrice ? (
          <View style={styles.row}>
            <Text style={[styles.label, labelStyle]}>{Languages.Taxes}</Text>
            <Text style={[styles.value, { color: text }]}>
              {Tools.getCurrencyFormatted(taxPrice, currency)}
            </Text>
          </View>
        ) : null}

        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={[styles.label, labelStyle]}>{Languages.Total}</Text>
          <Text style={[styles.value, { color: text }, totalStyle]}>
            {Tools.getCurrencyFormatted(totalPrice, currency)}
          </Text>
        </View>
      </View>
    );
  }
}

export default withTheme(ConfirmCheckout);
