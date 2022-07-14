/** @format */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  menu: {
    ...StyleSheet.absoluteFillObject,
  },
  frontView: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});
