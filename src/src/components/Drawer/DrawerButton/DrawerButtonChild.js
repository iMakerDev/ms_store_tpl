/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, I18nManager, Text } from "react-native";
import { Styles, Color, Constants, Languages } from "@common";
import { Icon, IconIO } from "@app/Omni";

class DrawerButtonChild extends PureComponent {
  render() {
    const { icon, onPress, text, iconRight, uppercase, colorText } = this.props;
    const transText = text !== "" && Languages[text] ? Languages[text] : text;
    return (
      <View style={[styles.container]}>
        {/* {icon && <Icon name={icon} color={Color.lightTextPrimary} size={20} />} */}
        <Text
          style={[
            styles.text,
            I18nManager.isRTL && { paddingRight: 20 },
            colorText && {
              color: colorText,
            },
          ]}>
          {uppercase
            ? transText.replace(/&amp;/g, "&").toUpperCase()
            : transText.replace(/&amp;/g, "&")}
        </Text>
        {iconRight && <IconIO name={iconRight} color={colorText} size={24} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Styles.Common.RowCenterBetween,
    paddingLeft: 40,
    paddingRight: 10,
    paddingVertical: 10,
    flex: 1,
  },
  text: {
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.tiny,
    fontFamily: Constants.fontFamily,
  },
});

DrawerButtonChild.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  iconRight: PropTypes.string,
  uppercase: PropTypes.bool,
  colorText: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

DrawerButtonChild.defaultProps = {
  text: "Default button name",
  uppercase: false,
  colorText: Color.blackTextPrimary,
  onPress: () => console.log("Pressed"),
};

export default DrawerButtonChild;
