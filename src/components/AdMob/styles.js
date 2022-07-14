/** @format */

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  body: {
    width,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, 0)",
    zIndex: 9999,
  },
});
