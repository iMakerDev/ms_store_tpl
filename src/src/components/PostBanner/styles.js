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
  bannerView: {
    width: width,
    height: Constants.Window.headerHeight,
    marginBottom: 8,
  },
  banner: {
    height: Constants.Window.headerHeight,
    width: width,
    backgroundColor: "#ccc",
  },
  paging: {
    top: (-height * 11) / 100,
    right: 10,
  },
  bannerImage: {
    resizeMode: "cover",
    width: width,
    height: Constants.Window.headerHeight,
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  bannerText: {
    position: "absolute",
    bottom: 0,
    height: Constants.Window.headerHeight / 2,
  },
  bannerGradient: {
    width: width,
    alignItems: "flex-start",
    height: Constants.Window.headerHeight / 2,
    justifyContent: "flex-end",
  },
  bannerTitle: {
    marginTop: 12,
    marginRight: 12,
    marginBottom: 4,
    marginLeft: 12,
    backgroundColor: "transparent",
    color: "white",
    fontSize: 20,
    textAlign: "left",
    fontFamily: Constants.fontHeader,
  },
  bannerDate: {
    backgroundColor: "transparent",
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width - vw * 5,
  },
  price: {
    color: "rgba(255,255,255, 0.7)",
  },
  sale_price: {
    color: "rgba(255,255,255, 0.7)",
    textDecorationLine: "line-through",
    fontSize: Styles.FontSize.tiny,
    lineHeight: 18,
  },
  time: {
    color: "rgba(255,255,255, 0.7)",
  },
});
