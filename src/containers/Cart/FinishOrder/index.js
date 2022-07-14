/** @format */

import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "@components";
import { Languages, Color, withTheme, Config } from "@common";
import styles from "./styles";

class FinishOrder extends PureComponent {
  render() {
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-checkmark-circle"
            size={80}
            color={Color.accent}
          />
        </View>

        <Text style={[styles.title, { color: text }]}>
          {Languages.ThankYou}
        </Text>
        <Text style={[styles.message, { color: text }]}>
          {Languages.FinishOrder}
        </Text>

        {!Config.Login.AnonymousCheckout && (
          <View style={styles.btnNextContainer}>
            <Button
              text={Languages.ViewMyOrders}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={this.props.finishOrder}
            />
          </View>
        )}
      </View>
    );
  }
}

export default withTheme(FinishOrder);
