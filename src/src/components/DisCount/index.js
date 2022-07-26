/** @format */

import React, { Component } from "react";
import { View, Easing, Text, Animated } from "react-native";
import styles from "./styles";

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.animationPriceSale = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animationPriceSale.setValue(0);
    Animated.timing(this.animationPriceSale, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => this.animate());
  }

  getDisCountPercent = () => {
    const { product } = this.props;
    return (
      product.regular_price &&
      `${(
        (1 - Number(product.price) / Number(product.regular_price)) *
        100
      ).toFixed(0)}`
    );
  };

  render() {
    const opacity = this.animationPriceSale.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });
    discount = this.getDisCountPercent();

    if (!discount || discount == 0) {
      return <View />;
    }

    return (
      <Animated.View style={[styles.percentPrice, { opacity }]}>
        <Text style={[styles.colorPercentText]}>{discount + "% OFF"}</Text>
      </Animated.View>
    );
  }
}

export default CountDown;
