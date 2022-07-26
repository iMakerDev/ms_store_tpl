/** @format */

import { StyleSheet, I18nManager } from "react-native";
import { Constants, Color } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#d4dce1",
  },
  content: {
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoView: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: Constants.fontFamily,
    color: Color.Text,
  },
  priceContainer: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  price: {
    fontSize: 20,
    color: Color.Text,
    fontFamily: Constants.fontHeader,
  },
  productVariant: (textColor) => ({
    marginLeft: 10,
    fontSize: 11,
    color: textColor,
    fontFamily: Constants.fontHeader,
  }),
  quantity: {
    marginRight: 10,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    margin: 10,
  },
  btnTrash: {
    position: "absolute",
    right: 70,
    bottom: 10,
  },
});
