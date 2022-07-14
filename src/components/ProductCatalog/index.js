/** @format */

import React from "react";
import { View, Text } from "react-native";

import { Languages, withTheme } from "@common";
import styles from "./style";
import Item from "../ChipItem";

class ProductCatalog extends React.PureComponent {
  state = {
    selectedId: -1,
  };

  static defaultProps = {
    categories: [],
  };

  render() {
    const { categories } = this.props;
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
            {Languages.ProductCatalog}
          </Text>
        </View>

        <View style={styles.container}>
          {categories.map((item, index) => (
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
    this.props.onSelectCategory(item);
  };
}

export default withTheme(ProductCatalog);
