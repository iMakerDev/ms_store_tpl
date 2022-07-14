/** @format */

import React from "react";
import { View, Text } from "react-native";

import { Languages, withTheme } from "@common";
import styles from "./style";
import Item from "../ChipItem";

class ProductTags extends React.Component {
  state = {
    selectedId: -1,
  };

  static defaultProps = {
    tags: [],
  };

  render() {
    const { tags } = this.props;
    const { selectedId } = this.state;
    const {
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Text style={[styles.text, { color: text }]}>
            {Languages.ProductTags}
          </Text>
        </View>
        <View style={styles.container}>
          {tags.map((item, index) => (
            <Item
              item={item}
              key={index}
              label={item.name}
              onPress={this.onPress}
              selected={selectedId == item.id}
            />
          ))}
        </View>
      </View>
    );
  }

  onPress = (item) => {
    this.setState({ selectedId: item.id });
    this.props.onSelectTag(item);
  };
}

export default withTheme(ProductTags);
