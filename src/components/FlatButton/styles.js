/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Color, Constants } from "@common";

const { width, height, scale } = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingTop: 10,
    paddingRight: 28,
    paddingBottom: 8,
    paddingLeft: 28,
    borderRadius: 40,
  },
  icon: {
    marginTop: 2,
  },
  text: {
    marginBottom: 2,
    fontWeight: "600",
    color: "#666",
    fontSize: 12,
    fontFamily:
      Platform.OS != "android"
        ? Constants.fontHeader
        : Constants.fontHeaderAndroid,
  },
});
