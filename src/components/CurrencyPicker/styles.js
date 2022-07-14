/** @format */

import { StyleSheet } from "react-native";
import { Color, Constants } from "@common";

export default StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: Color.primary,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Constants.fontHeader,
  },
  icon: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  title: (text) => ({
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontWeight: "600",
    textAlign: "left",
    color: text,
  }),
  text: (text) => ({
    fontWeight: "bold",
    marginLeft: 10,
    color: text,
  }),
});
