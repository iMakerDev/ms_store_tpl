/** @format */

import React, { PureComponent } from "react";
import { TouchableOpacity, Text } from "react-native";

import { withTheme } from "@common";
import styles from "./styles";

class Item extends PureComponent {
  static defaultProps = {
    selected: false,
  };

  render() {
    const {
      item,
      selected,
      onPress,
      theme: {
        colors: { background, text },
      },
    } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}>
        <Text style={[styles.text(text), selected && styles.selectedText(text)]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withTheme(Item);
