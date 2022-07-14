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
    imageButton: {
      width: 15,
      height: 15,
    },
    percentPrice: {
      position: "absolute",
      right: 5,
      top: 4,
      zIndex: 9999,
    },
    colorPercentText: {
      color: Color.attributes.red,
      fontSize: 10,
      fontWeight: "bold"
    }
  });
  