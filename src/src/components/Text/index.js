/** @format */

import React from "react";
import { StyleSheet, Text, I18nManager } from "react-native";
import { Color, Styles } from "@common";

const StandardText = (props) => (
  <Text
    style={[styles.standardText, props.style]}
    ellipsizeMode={I18nManager.isRTL ? "head" : "tail"}
    numberOfLines={props.numberOfLines || 1}
    allowFontScaling={props.allowFontScaling || false}
    {...props}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  standardText: {
    fontWeight: "600",
    color: Color.blackTextPrimary,
    backgroundColor: "transparent",
    fontSize: Styles.FontSize.big,
    textAlign: "left",
    width: null,
  },
});

export default StandardText;
