/** @format */

"use strict";
import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button } from "@components";
import { Languages } from "@common";

export default class ShopButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          text={this.props.text ? this.props.text : Languages.ShopNow}
          style={[styles.button, this.props.css]}
          textStyle={styles.buttonText}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}
