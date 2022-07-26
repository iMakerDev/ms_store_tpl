/** @format */

import React from "react";
import { View } from "react-native";

import { withTheme } from "@common";
import LanguagePicker from "./LanguagePicker";
import styles from "./styles";

class Setting extends React.PureComponent {
  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    return (
      <View style={styles.settingContainer(background)}>
        <LanguagePicker />
      </View>
    );
  }
}

export default withTheme(Setting);
