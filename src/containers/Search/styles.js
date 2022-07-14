/** @format */

import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navi: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? 64 : 44,
    borderBottomWidth: 0.5,
    borderColor: "#cccccc",
    marginTop: 40,
  },
  btnClose: {
    marginTop: 18,
    height: 46,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderColor: "#cccccc",
  },
  inputSearch: {
    flex: 1,
    marginTop: 18,
    height: 46,
    marginLeft: 8,
    marginRight: 8,
  },
});
