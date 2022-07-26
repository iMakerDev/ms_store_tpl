/** @format */

import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const hitSlop = { top: 2, right: 20, bottom: 2, left: 20 };

const ProductColor = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      hitSlop={hitSlop}
      style={styles.productView}
      onPress={() => props.onPress()}>
      <View
        style={[
          styles.productColor,
          { backgroundColor: props.color },
          
          props.selected && [
            styles.productColorSelected,
            { borderColor: props.color },
          ],
          props.style,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productView: {
    margin: 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 30,
  },
  productColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  productColorSelected: {
    backgroundColor: "white",
    width: 24,
    height: 24,
    borderRadius: 30,
    borderWidth: 8,
  },
});

export default ProductColor;
