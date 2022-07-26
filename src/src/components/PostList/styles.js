/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { Constants } from "@common";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  flatlist: {
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  more: {
    width,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  spinView: {
    width,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
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

  headerLabel: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 18,
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
  },
  tagHeader: {
    fontSize: 18,
    color: "#666",
    letterSpacing: 2,
    fontFamily: Constants.fontHeader,
  },
});
