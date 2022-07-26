/** @format */

import { StyleSheet } from "react-native";
import { Color, Constants } from "@common";

export default StyleSheet.create({
  container: {
    height: 74,
    //backgroundColor: "#fff",
    paddingBottom: 6,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: Color.blackTextDisable,
    fontSize: 12,
    textAlign: "center",
    fontFamily: Constants.fontHeader,
  },
  labelActive: {
    color: Color.Text,
    fontFamily: Constants.fontHeader,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
});
