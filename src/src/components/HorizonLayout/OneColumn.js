/** @format */

import React, { PureComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ProductPrice, ImageCache, WishListIcon, Rating } from "@components";
import { Images, Styles, withTheme } from "@common";
import { getProductImage } from "@app/Omni";
import css from "./style";

class OneColumn extends PureComponent {
  render() {
    const {
      product,
      title,
      viewPost,
      theme: {
        colors: { text },
      },
      currency
    } = this.props;

    const imageURI =
      typeof product.images[0] !== "undefined"
        ? getProductImage(product.images[0].src, 180)
        : Images.PlaceHolderURL;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelTwoHigh}
        onPress={viewPost}>
        <ImageCache uri={imageURI} style={css.imagePanelTwoHigh} />
        <Text numberOfLines={2} style={[css.nameTwo, { color: text }]}>
          {title}
        </Text>
        <ProductPrice currency={currency} product={product} hideDisCount />
        <WishListIcon product={product} />
        <Rating rating={product.average_rating} />
      </TouchableOpacity>
    );
  }
}

export default withTheme(OneColumn);
