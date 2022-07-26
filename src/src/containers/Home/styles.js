/** @format */

import { Platform, StyleSheet, Dimensions } from "react-native";
import { Constants } from "@common";

const { width } = Dimensions.get("window");
const vw = width / 100;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  toolbarIcon: {
    width: 17,
    height: 17,
    resizeMode: "contain",
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    opacity: 0.8,
  },
  fill: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "hidden",
    height: Constants.Window.headerHeight,
  },
  logo: {
    width: vw * 30,
    resizeMode: "contain",
  },
  backgroundImage: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    width: null,
    height:
      Platform.OS === "ios"
        ? Constants.Window.headerHeight
        : Constants.Window.headerHeight + 100,
  },
  toolbar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 12 : 28,
    height: 32,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 7,
    right: 7,
    flexDirection: "row",
  },
  scrollViewContent: {
    marginTop: Constants.Window.headerHeight,
    position: "relative",
    marginBottom: 100,
  },
  columnStyle: {
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  more: {
    width,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
});
