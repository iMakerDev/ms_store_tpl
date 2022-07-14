/** @format */

import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Constants } from "@common";

const ProductSize = (props) => (
  <TouchableOpacity
    onPress={() => props.onPress()}
    style={[
      props.text.length > 2 ? styles.containerLong : styles.container,
      props.style,
      props.selected && styles.active,
    ]}
    activeOpacity={0.8}
    underlayColor="#C6D8E4">
    <Text style={[styles.text, props.selected && { color: "white" }]}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  active: {
    backgroundColor: "rgba(51, 63, 70, 1)",
  },
  container: {
    width: 34,
    height: 34,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#C6D8E4",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
  },
  containerLong: {
    height: 34,
    borderRadius: 30,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: "#C6D8E4",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
  },
  text: {
    color: "#C6D8E4",
    fontSize: 16,
    fontFamily: Constants.fontHeader,
  },
});

export default ProductSize;
