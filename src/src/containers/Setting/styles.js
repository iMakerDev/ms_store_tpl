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
  settingContainer: (backgroundColor) => ({
    flex: 1,
    backgroundColor,
    paddingTop: 40,
  }),
});
