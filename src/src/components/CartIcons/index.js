/** @format */

import React, { Component } from "react";
import { View } from "react-native";
import { Styles, Constants, Images, Config } from "@common";
import { connect } from "react-redux";
import { NavigationBarIcon } from "@components";

class CartIcons extends Component {
  render() {
    const { carts, wishList, navigation } = this.props;
    // const totalCart = carts.cartItems.length;
    const totalCart = carts.total;
    const wishListTotal = wishList.wishListItems.length;

    return (
      <View
        style={[
          Styles.Common.Row,
          Constants.RTL ? { left: -10 } : { right: 5 },
        ]}>
        <NavigationBarIcon
          icon={Images.IconWishList}
          number={wishListTotal}
          onPress={() => navigation.navigate("WishListScreen")}
        />
        {!Config.Affiliate.enable && (
          <NavigationBarIcon
            icon={Images.IconCart}
            number={totalCart}
            onPress={() => navigation.navigate("CartScreen")}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ carts, wishList }) => ({ carts, wishList });
export default connect(mapStateToProps)(CartIcons);
