/** @format */

import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { withTheme } from "@common";
import styles from "./style";

class Item extends React.PureComponent {
  static defaultProps = {
    label: "Restaurants",
  };

  render() {
    const { item, label, onPress, selected } = this.props;
    const {
      theme: { dark },
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[styles.container(dark), selected && styles.selected(dark)]}>
        <Text style={styles.text(dark)}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

export default withTheme(Item);
