/** @format */

import React, { PureComponent } from "react";

import { WishList } from "@containers";

export default class WishListScreen extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <WishList
        onViewProduct={(product) =>
          navigation.navigate("DetailScreen", product)
        }
        onViewHome={() => navigation.navigate("Default")}
      />
    );
  }
}
