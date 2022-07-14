/** @format */

import React from "react";
import { View, Text } from "react-native";

import { withTheme } from "@common";
import styles from "./styles";

const Contactus = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.Address}>
        < Text  > 地址：新界屯門良田村54號地下 (新墟輕鐵站行走3分鐘可到達)
        </Text >
      </View>
      <View style={styles.content} >
        < Text > 电话：(852) 6740 3519</Text ></View>
      <View style={styles.content}>
        < Text  > 邮箱：mr.magicdave0525@gmail.com</Text >
      </View>
      <View style={styles.content}>
        < Text  > 特别说明：(暫不設門市，此地址只供客人預約試身)</Text >
      </View>
    </View >
  )
}

export default withTheme(Contactus);
