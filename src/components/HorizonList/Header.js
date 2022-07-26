/** @format */

import * as React from "react";
import { View, Image, Text } from "react-native";
import moment from "moment";

import { Config, withTheme } from "@common";

import styles from "./styles";

const Header = React.memo(({ theme: { colors: text } }) => {
  const currentDate = moment().format("dddd DD MMM");

  return (
    <View style={{...styles.headerLogo}}>
      <Image source={Config.LogoImage} style={styles.logo} />
      <Text style={[styles.headerDate, { color: text.text }]}>
        {currentDate.toUpperCase()}
      </Text>


    </View>
  );
});

export default withTheme(Header);
