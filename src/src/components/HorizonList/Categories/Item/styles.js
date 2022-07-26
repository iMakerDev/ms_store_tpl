/** @format */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 6,
    width: 90,
    marginTop: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    alignItems: "center"

  },
  title: {
    marginTop: 6,
    fontSize: 11,
    // fontFamily: Constants.fontHeader,
    opacity: 0.9,
    textAlign: "center",
  },

  iconView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 18,
  },

  background: {
    backgroundColor: "#8e2a2a",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
