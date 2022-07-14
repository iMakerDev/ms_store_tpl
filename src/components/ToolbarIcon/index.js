/** @format */

import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Color, Styles } from "@common";
import { Icon } from "@app/Omni";

const ToolbarIcon = ({ name, onPress, color, number }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconWrap}>
      <Icon name={name && name} size={Styles.IconSize.ToolBar} color={color} />
      {!number ? null : (
        <View style={styles.numberWrap}>
          <Text style={styles.number}>{number}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    ...Styles.Common.ColumnCenter,
    height: Styles.headerHeight,
    width: Styles.headerHeight,
  },
  numberWrap: {
    ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: 5,
    right: 5,
    height: 16,
    minWidth: 16,
    backgroundColor: Color.error,
    borderRadius: 8,
    padding: 3,
  },
  number: {
    color: "white",
  },
});

ToolbarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.any,
  number: PropTypes.number,
};

ToolbarIcon.defaultProps = {
  color: Color.category.navigationBarIcon,
  onPress: () => alert("Toolbar button clicked!"),
  number: 0,
};

export default ToolbarIcon;
