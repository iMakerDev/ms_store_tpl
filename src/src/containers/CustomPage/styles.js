/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Color, Constants, Styles } from "@common";

const { width, height, scale } = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  html: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  body: {
    paddingTop: Platform.OS == "android" ? 0 : 30,
    backgroundColor: "#eee",
    flex: 1,
  },
});
