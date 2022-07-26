/** @format */

import React from "react";
import { View, Text } from "react-native";

// import { log } from "@app/Omni";
import { Languages } from "@common";
import styles from "./styles";

export default class OrderStatus extends React.PureComponent {
  render() {
    const {
      order,
      theme: {
        colors: { text, primary },
      },
    } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.label(text)}>{Languages.OrderStatus}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text
            style={styles.title(primary)}
            numberOfLines={2}
            ellipsizeMode="tail">
            {order.status}
          </Text>
        </View>
      </View>
    );
  }
}
