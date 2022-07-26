/** @format */

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  spinner: {
    width,
    alignItems: "center",
  },
});
