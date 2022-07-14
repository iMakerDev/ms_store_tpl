/** @format */

import { StyleSheet } from "react-native";

import { Constants, Color } from "@common";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: (text) => ({
    fontSize: 20,
    fontWeight: "100",
    color: text,
    opacity: 0.4,
    fontFamily: Constants.fontFamily,
  }),
  selectedText: () => ({
    fontWeight: "bold",
    color: Color.primary,
    opacity: 1,
  }),
});
