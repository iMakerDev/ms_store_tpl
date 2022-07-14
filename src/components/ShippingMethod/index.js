/** @format */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "@expo";

import { Config, Color, withTheme } from "@common";

class ShippingMethod extends React.Component {
  static default = {
    selected: false,
    onPress: () => {},
  };

  render() {
    const {
      selected,
      onPress,
      item,
      theme: { dark: isDark },
      currency
    } = this.props;
    const shippingTime = Config.shipping.time;

    const costValue =
      typeof item.settings.cost !== "undefined" ? item.settings.cost.value : 0;

    let colors = ["white", "#fefefe", "white"];
    if (selected) {
      colors = [Color.blue2, Color.blue1, Color.blue];
    }

    let money = "";
    let type = "";
    const time = shippingTime[item.method_id];

    if (item.method_id === "free_shipping") {
      money = `${currency.symbol} 0`;
      type = item.title;
    } else {
      money = `${currency.symbol} ${costValue}`;
      type = item.title;
    }

    // this method id is not in the config
    if (typeof time === "undefined") {
      return <View />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8}>
          <LinearGradient
            colors={colors}
            style={[
              styles.content,
              !selected &&
                !isDark && {
                  borderWidth: 1,
                  borderColor: Color.lightBlue,
                },
              selected && styles.shadow,
            ]}>
            <Text style={[styles.money, selected && { color: "white" }]}>
              {money}
            </Text>
            <Text style={[styles.type, selected && { color: "white" }]}>
              {type}
            </Text>
            {/* <Text style={[styles.time, selected && { color: "white" }]}>
              {time}
            </Text> */}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  content: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "white"
  },
  selected: {
    alignItems: "center",
    height: 20,
    marginBottom: 5,
  },
  money: {
    color: Color.blue,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  type: {
    color: Color.blue,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 3,
    marginTop: 8,
    backgroundColor: "transparent",
  },
  time: {
    color: Color.blue,
    fontSize: 13,
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, .6)",
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default withTheme(ShippingMethod);
