/** @format */

import React from "react";
import { View, Text } from "react-native";

// import { log } from "@app/Omni";
import { Languages } from "@common";
import styles from "./styles";

export default class ShippingAddress extends React.PureComponent {
  render() {
    const {
      billing,
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.label(text)}>{Languages.ShippingAddress}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text
            style={styles.name(text)}
            numberOfLines={2}
            ellipsizeMode="tail">
            {billing.addree_1}
          </Text>
          <Text style={styles.name(text)}>
            {`${billing.city}, ${billing.state}, ${billing.postcode}, ${
              billing.country
            }`}
          </Text>
        </View>
      </View>
    );
  }
}
