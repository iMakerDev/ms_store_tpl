/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
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
    backgroundColor: Color.product.BuyNowButton,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Constants.fontHeader,
  },
});
