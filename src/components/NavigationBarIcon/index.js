/** @format */

import React, { PureComponent } from "react";
import {
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { Color, withTheme, Styles } from "@common";

class NavigationBarIcon extends PureComponent {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      typeof this.props.number !== "undefined" &&
      this.refs.menu &&
      this.props.number != nextProps.number
    ) {
      this.refs.menu.fadeInDown(600);
    }
  }

  render() {
    const {
      onPress,
      number,
      icon,
      color,
      size,
      theme: { dark },
    } = this.props;
    const iconColor = color || (dark ? "#fff" : "#333");

    return (
      <TouchableOpacity onPress={onPress} style={styles.iconWrap}>
        <Image
          source={icon}
          style={[
            styles.icon,
            { tintColor: iconColor },
            {
              width: size || Styles.IconSize.ToolBar,
              height: size || Styles.IconSize.ToolBar,
            },
          ]}
          resizeMode="contain"
        />
        {!number ? null : (
          <Animatable.View ref="menu" style={styles.numberWrap}>
            <Text style={styles.number}>{number}</Text>
          </Animatable.View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconWrap: {
    ...Styles.Common.ColumnCenter,
    width: Styles.headerHeight,
    height: Styles.headerHeight,
  },
  numberWrap: {
    ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: Platform.OS === "ios" ? 3 : 10,
    right: Platform.OS === "ios" ? 3 : 10,
    height: 18,
    minWidth: 18,
    backgroundColor: Color.error,
    borderRadius: 9,
  },
  number: {
    color: "white",
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
  icon: {
    opacity: 0.8,
  },
});

NavigationBarIcon.defaultProps = {
  number: 0,
};

export default withTheme(NavigationBarIcon);
