/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, I18nManager, Text } from "react-native";
import { Styles, Color, Constants, Languages } from "@common";
import { Icon } from "@app/Omni";

class DrawerButton extends PureComponent {
  render() {
    const {
      text,
      onPress,
      icon,
      uppercase,
      // textStyle,
      isActive,
      colorText,
    } = this.props;
    const transText = text !== "" && Languages[text] ? Languages[text] : text;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.container,
          isActive && {
            borderLeftWidth: 1,
            borderColor: colorText,
          },
        ]}
        onPress={onPress}>
        <Icon name={icon} color={Color.blackTextPrimary} size={20} />
        <Text
          style={[
            styles.text,
            I18nManager.isRTL && { paddingRight: 20 },
            colorText && {
              color: colorText,
            },
          ]}>
          {uppercase ? transText.toUpperCase() : transText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Styles.Common.RowCenterLeft,
    paddingVertical: 10,
    paddingLeft: 30,
    paddingRight: 10,
    // flex: 1,
  },
  text: {
    padding: 4,
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.small,
    fontFamily: Constants.fontFamily,
  },
});

DrawerButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  uppercase: PropTypes.bool,
  isActive: PropTypes.bool,
  colorText: PropTypes.string,
};

DrawerButton.defaultProps = {
  uppercase: false,
  isActive: false,
  text: "Default button name",
  onPress: () => alert("Drawer button clicked"),
};

export default DrawerButton;
