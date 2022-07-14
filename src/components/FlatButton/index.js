/** @format */

"use strict";

import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default class FlatButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.load} style={styles.button}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
