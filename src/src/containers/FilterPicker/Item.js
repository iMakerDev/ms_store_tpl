/** @format */

import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Styles, Color, Icons, withTheme } from "@common";
import { Icon } from "@app/Omni";

class Item extends React.PureComponent {
  render() {
    const { onPress, item, isSelect, isFirst, isSecond } = this.props;
    const {
      theme: {
        colors: { text },
      },
    } = this.props;

    if (!item) return null;

    return (
      <View style={[styles.container, isFirst ? { borderTopWidth: 0 } : {}]}>
        <TouchableOpacity style={styles.subContainer} onPress={onPress}>
          <View style={[styles.checkboxWrap, { borderColor: text }]}>
            {isSelect ? (
              <Icon
                name={Icons.MaterialCommunityIcons.CheckMark}
                size={12}
                color={text}
              />
            ) : null}
          </View>
          <Text style={[styles.text, { color: text }]}>
            {(isFirst ? "" : isSecond ? " -- " : "") +
              item.name +
              " (" +
              item.count +
              ")"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    ...Styles.Common.RowCenterLeft,
    padding: 10,
    paddingLeft: 30,
  },
  checkboxWrap: {
    height: 15,
    opacity: 0.3,
    width: 15,
    borderColor: Color.blackTextSecondary,
    borderWidth: 1,
    borderRadius: 2,
    ...Styles.Common.ColumnCenter,
  },
  text: {
    marginLeft: 10,
    color: Color.blackTextPrimary,
  },
});

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  isSelect: PropTypes.bool,
  isFirst: PropTypes.bool,
};

export default withTheme(Item);
