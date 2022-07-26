/** @format */

import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Constants, Color } from "@common";

class ChangeQuantity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== "undefined") {
      this.setState({ quantity: nextProps.quantity });
    }
  }

  increase = () => {
    const {quantity} = this.props;
    if (this.state.quantity < Constants.LimitAddToCart) {
      let newQuantity = this.state.quantity + 1;
      // newQuantity = newQuantity > quantity ? quantity : newQuantity;
      this.props.onChangeQuantity(newQuantity);
      this.setState({ quantity: newQuantity });
    }
  };

  reduced = () => {
    if (this.state.quantity > 1) {
      this.props.onChangeQuantity(this.state.quantity - 1);
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  render() {
    const hitSlop = { top: 20, right: 10, bottom: 20, left: 10 };
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          style={styles.btnUp}
          hitSlop={hitSlop}
          onPress={this.increase}>
          <FontAwesome name="sort-up" size={20} color="#b7c4cb" />
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.quantity}</Text>
        <TouchableOpacity
          style={styles.btnDown}
          hitSlop={hitSlop}
          onPress={this.reduced}>
          <FontAwesome name="sort-down" size={20} color="#b7c4cb" />
        </TouchableOpacity>
      </View>
    );
  }
}
ChangeQuantity.defaultProps = {
  quantity: 1,
  onChangeQuantity: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d4dce1",
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    fontFamily: Constants.fontFamily,
    color: Color.blackTextPrimary,
  },
  btnUp: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDown: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChangeQuantity;
