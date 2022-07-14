/** @format */

import React, { StyleSheet, Dimensions } from "react-native";
import { Color, Constants, Styles } from "@common";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  sliderContainer: {
    paddingVertical: 8,
    alignItems: "center",
  },

  imageTitle: {
    position: "absolute",
    bottom: -20,
    color: "#999",
    fontSize: 14,
    textAlign: "center",
  },

  sliderContainer: {
    alignItems: "center",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  linearGradient: {
    height: height * 0.3,
    zIndex: 3,
    width: width,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 0,
  },
  titleView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    zIndex: 9,
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    color: "#fff",
    fontFamily: Constants.fontHeader,
  },
  count: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    backgroundColor: "transparent",
    fontFamily: Constants.fontFamily,
  },
});
