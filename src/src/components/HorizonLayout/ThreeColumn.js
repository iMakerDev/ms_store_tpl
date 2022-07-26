/** @format */

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Images, withTheme } from "@common";
import { ProductPrice, ImageCache, WishListIcon } from "@components";
import { getProductImage } from "@app/Omni";
import css from "./style";

class ThreeColumn extends PureComponent {
  render() {
    const {
      viewPost,
      title,
      product,
      theme: {
        colors: { text },
      },
      currency
    } = this.props;
    const imageURI =
      typeof product.images[0] !== "undefined"
        ? getProductImage(product.images[0].src, 120)
        : Images.PlaceHolderURL;

    return (
      product ?
        (<TouchableOpacity
          activeOpacity={0.9}
          style={css.panelThree}
          onPress={viewPost}>
          <ImageCache uri={imageURI} style={css.imagePanelThree} />
          <Text numberOfLines={2} style={[css.nameThree, { color: text }]}>
            {title.replace(/<br>|<\/br>/g,"")}
          </Text>
          <ProductPrice currency={currency} product={product} hideDisCount />
          <WishListIcon product={product} />
        </TouchableOpacity>) : (<View />)
    );
  }
}

export default withTheme(ThreeColumn);
