/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Image } from "react-native";
import { Styles, Color } from "@common";
import { connect } from "react-redux";

class TabBarIcon extends PureComponent {
  static propTypes = {
    icon: PropTypes.any,
    tintColor: PropTypes.string,
    css: PropTypes.any,
    carts: PropTypes.object,
    cartIcon: PropTypes.any,
    wishList: PropTypes.any,
    wishlistIcon: PropTypes.any,
  };

  render() {
    const {
      icon,
      tintColor,
      css,
      carts,
      cartIcon,
      wishList,
      wishlistIcon,
      app
    } = this.props;

    const numberWrap = (number = 0) => (
      <View style={styles.numberWrap}>
        <Text style={styles.number}>{number}</Text>
      </View>
    );
    return (
      <View style={{ justifyContent: "center" }}>
        <Image
          ref={(comp) => (this._image = comp)}
          source={icon}
          style={[styles.icon, { tintColor:app.isDarkTheme?"#fff":"#000" }, css]}
        />
        {wishlistIcon && wishList.total > 0 && numberWrap(wishList.total || 0)}
        {cartIcon && carts.total > 0 && numberWrap(carts.total || 0)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  numberWrap: {
    ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: -10,
    right: -10,
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
});

const mapStateToProps = ({ carts, wishList,app }) => ({ carts, wishList,app });
export default connect(
  mapStateToProps,
  null,
  null
)(TabBarIcon);
