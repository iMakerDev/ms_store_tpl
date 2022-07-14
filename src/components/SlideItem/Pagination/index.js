/** @format */

import React from "react";
import { View, Dimensions } from "react-native";
import Item from "./Item";
const { width } = Dimensions.get("window");


class Pagination extends React.PureComponent {
  render() {
    const { items, selectedIndex, onNext } = this.props;
    return (
      <View style={styles.container}>
        {items &&
          items.map((item, index) => (
            <Item
              key={index}
              totalItems={items.length}
              active={index == selectedIndex}
              isReset={selectedIndex == 0}
              onNext={onNext}
            />
          ))}
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
    left: width * 0.2,
    right: width * 0.2,
  },
};

export default Pagination;
