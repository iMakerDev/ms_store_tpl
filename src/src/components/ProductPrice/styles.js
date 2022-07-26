/** @format */

import { StyleSheet } from "react-native";
import { Color, Styles } from "@common";

export default StyleSheet.create({
  text_list: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
  },
  text_grid: {
    color: Color.black,
    fontSize: Styles.FontSize.small,
  },
  price_wrapper: {
    alignItems: "center",
  },
  sale_price: {
    textDecorationLine: "line-through",
    color: Color.blackTextDisable,
    marginLeft: 0,
    marginRight: 0,
    fontSize: Styles.FontSize.tiny,
  },
  price: {
    color: Color.black,
    fontSize: Styles.FontSize.tiny,
  },
  saleWrap: {
    borderRadius: 5,
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 5,
  },
  sale_off: {
    color: Color.lightTextPrimary,
    fontSize: Styles.FontSize.small,
  },
});
