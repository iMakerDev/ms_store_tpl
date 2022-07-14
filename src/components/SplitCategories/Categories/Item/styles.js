/** @format */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 12,
    color: "#fff",
    textTransform: 'uppercase'
  },
  selected: (background) => ({
    backgroundColor: background,
  }),
  selectedText: (text) => ({
    fontWeight: "bold",
    color: text,
  }),
});
