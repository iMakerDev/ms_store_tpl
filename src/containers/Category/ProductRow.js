/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import { Styles, Color, withTheme, Tools, Images } from "@common";
import { getProductImage } from "@app/Omni";
import { Rating, ImageCache, Text } from "@components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DisplayMode } from "@redux/CategoryRedux";
import styles from "./styles";

class ProductRow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInWishList: false,
    };
  }

  componentDidMount() {
    const { product, wishListItems } = this.props;
    const isInWishList =
      wishListItems.find((item) => item.product.id == product.id) != undefined;
    this.setState({ isInWishList });
  }

  render() {
    const { product, onPress, displayMode } = this.props;
    const { isInWishList } = this.state;
    const {
      theme: {
        colors: { background, text },
        dark: isDark,
      },
      currency,
    } = this.props;

    const isListMode =
      displayMode === DisplayMode.ListMode ||
      displayMode === DisplayMode.CardMode;
    const isCardMode = displayMode === DisplayMode.CardMode;

    const textStyle = isListMode ? styles.text_list : styles.text_grid;
    const imageStyle = isListMode ? styles.image_list : styles.image_grid;
    const image_width = isListMode
      ? Styles.width * 0.9 - 2
      : Styles.width * 0.45 - 2;

    const productPrice = `${Tools.getPriceIncludedTaxAmount(
      product,
      null,
      false,
      currency
    )} `;
    const regular_price =
      product["multi-currency-prices"] &&
        product["multi-currency-prices"][currency.code]
        ? product["multi-currency-prices"][currency.code]["price"]
        : product.regular_price;
    const productPriceSale = product.on_sale
      ? `${Tools.getCurrencyFormatted(regular_price, currency)} `
      : null;
    const image =
      product.images && product.images.length
        ? product.images[0].src
        : Images.PlaceHolderURL;
    //商品名称
    const productName = product.name.replace(/<br>|<br\/>/g, "");
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          styles.container_product,
          isListMode ? styles.container_list : styles.container_grid,
          { backgroundColor: background },
        ]}>
        <ImageCache
          uri={getProductImage(image, image_width)}
          style={[styles.image, imageStyle]}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={[textStyle, isCardMode && styles.cardText, { color: text }]}>
            {productName}
          </Text>

          <View
            style={{
              flexDirection: isCardMode ? "column" : "row",
              justifyContent:
                displayMode === DisplayMode.ListMode
                  ? "space-between"
                  : "center",
              alignItems: isCardMode ? "center" : "flex-start",
              marginTop: 16,
            }}>
            <View
              style={[styles.price_wrapper, !isListMode && { marginTop: 0 }]}>
              <Text
                style={[
                  textStyle,
                  styles.price,
                  isCardMode && styles.cardPrice,
                  !isListMode && { color: Color.blackTextSecondary },
                  isDark && { color: "rgba(255,255,255,0.8)" },
                ]}>
                {productPrice}
              </Text>

              <Text
                style={[
                  textStyle,
                  styles.sale_price,
                  isCardMode && styles.cardPriceSale,
                  isDark && { color: "rgba(255,255,255,0.6)" },
                ]}>
                {productPriceSale}
              </Text>

              {product.on_sale && product.regular_price > 0 && (
                <View style={styles.saleWrap}>
                  <Text style={[textStyle, styles.sale_off]}>
                    {`-${(
                      (1 -
                        Number(product.price) / Number(product.regular_price)) *
                      100
                    ).toFixed(0)}%`}
                  </Text>
                </View>
              )}
            </View>

            {isListMode && (
              <View style={styles.price_wrapper}>
                <Rating
                  rating={Number(product.average_rating)}
                  size={
                    (isListMode
                      ? Styles.FontSize.medium
                      : Styles.FontSize.small) + 5
                  }
                />
                <Text style={[textStyle, styles.textRating, { color: text }]}>
                  {`(${product.rating_count})`}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/** ** add wish list *** */}
        <TouchableOpacity
          style={styles.btnWishList}
          onPress={() => {
            !isInWishList
              ? this.setState({ isInWishList: !isInWishList }, () =>
                this.props.addToWishList(product)
              )
              : this.setState({ isInWishList: !isInWishList }, () =>
                this.props.removeWishListItem(product)
              );
          }}>
          {isInWishList && <FontAwesome name="heart" size={20} color="red" />}
          {!isInWishList && (
            <FontAwesome name="heart-o" size={20} color="#b5b8c1" />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ProductRow.propTypes = {
  product: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  displayMode: PropTypes.string,
};

export default withTheme(ProductRow);
