/** @format */

import React, { PureComponent } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Images, Styles, Tools } from "@common";
import { ImageCache, WishListIcon } from "@components";
import { getProductImage } from "@app/Omni";
import { LinearGradient } from "@expo";
import css from "./style";

export default class BannerLarge extends PureComponent {
  render() {
    const { viewPost, title, product, currency } = this.props;
    const imageURI =
      typeof product.images[0] !== "undefined"
        ? getProductImage(product.images[0].src, Styles.width)
        : Images.PlaceHolderURL;
    const productPrice = `${Tools.getPriceIncludedTaxAmount(product, null, false, currency)} `;
    const regular_price = product["multi-currency-prices"] && product["multi-currency-prices"][currency.code] ? product["multi-currency-prices"][currency.code]["price"] : product.regular_price
    const productPriceSale = product.on_sale
      ? `${Tools.getCurrencyFormatted(regular_price, currency)} `
      : null;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelMini}
        onPress={viewPost}>
        <ImageCache uri={imageURI} style={css.imageMini} />

        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}
          style={css.bannerGradient}>
          <Text style={css.bannerTitle}>{title}</Text>
          <View style={css.priceView}>
            <Text style={[css.price]}>{productPrice}</Text>
            <Text style={[css.price, product.on_sale && css.sale_price]}>
              {productPriceSale}
            </Text>
          </View>
        </LinearGradient>
        <WishListIcon product={product} />
      </TouchableOpacity>
    );
  }
}
