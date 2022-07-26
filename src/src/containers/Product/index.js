/** @format */

import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper";

import { Languages, Styles, Color, Constants, Tools } from "@common";
import { getProductImage, Icon } from "@app/Omni";
import { Rating, Button } from "@components";
import HTML from "react-native-render-html";

import ReviewTab from "./ReviewTab";
import VariationsForm from "./VariationsForm";

class ProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSwiper(product) {
    return (
      <Swiper
        width={Styles.width}
        height={Styles.width * Styles.thumbnailRatio}>
        {product.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: getProductImage(image.src, Styles.width) }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </Swiper>
    );
  }

  renderTopInfo(_product) {
    const styles = {
      container_row: {
        flexDirection: "row",
      },
      name: {
        color: Color.product.TextDark,
        fontSize: 26,
        margin: 5,
        marginBottom: 0,
        textAlign: "center",
      },
      price: {
        color: Color.ProductPrice,
        fontSize: 18,
        fontWeight: "bold",
        margin: 5,
        marginRight: 0,
      },
      sale_price: {
        textDecorationLine: "line-through",
        color: Color.product.TextLight,
        fontWeight: "normal",
      },
      sale_off: {
        color: Color.product.TextLight,
        fontWeight: "normal",
      },
    };
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{_product.name}</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.price}>
              {Tools.getPriceIncludedTaxAmount(_product)}
            </Text>
            <Text style={[styles.price, styles.sale_price]}>
              {_product.on_sale
                ? Tools.getCurrencyFormatted(_product.regular_price)
                : ""}
            </Text>
            {!_product.on_sale ? (
              <View />
            ) : (
              <Text style={[styles.price, styles.sale_off]}>
                {`(${(
                  (1 -
                    Number(_product.price) / Number(_product.regular_price)) *
                  100
                ).toFixed(0)}% off)`}
              </Text>
            )}
          </View>
          <View style={styles.container_row}>
            <Text style={{ marginLeft: 10 }} />
            <Rating rating={Number(_product.average_rating)} size={25} />
            <Text
              style={{
                color: Color.product.ViewBorder,
                fontSize: 18,
                marginLeft: 5,
              }}>
              {`(${_product.rating_count})`}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderVariation(_product) {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>{Languages.ProductVariations}</Text>

        <VariationsForm
          ref="form"
          attributes={_product.attributes}
          variations={_product.variations}
          updateVariation={(variation) =>
            this.setState({ currentVariation: variation })
          }
          defaultVariation={
            _product.default_attributes.length == 1
              ? _product.default_attributes[0]
              : {}
          }
        />
      </View>
    );
  }

  renderDescription(_product) {
    const styles = {
      card: {
        backgroundColor: "white",
        marginBottom: 8,
        padding: Constants.Dimension.ScreenWidth(0.05),
      },
      text: {
        color: Color.product.TextDark,
        fontSize: 14,
      },
      attribute_container: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: Color.product.ViewBorder,
      },
      attribute_left: {
        flex: 3,
        borderRightWidth: 1,
        borderColor: Color.product.ViewBorder,
        backgroundColor: "#F8F8F8",
      },
      attribute_right: {
        flex: 7,
      },
      attribute_name: {
        color: Color.product.TextDark,
        fontSize: 14,
        fontWeight: "bold",
        margin: 10,
      },
      attribute_options: {
        fontSize: 14,
        margin: 10,
      },
    };
    return (
      <View style={styles.card}>
        <Text style={[styles.label, { marginBottom: -10 }]}>
          {Languages.AdditionalInformation}
        </Text>
        {_product.description == "" ? (
          <Text style={styles.text}>{Languages.NoProductDescription}</Text>
        ) : (
          <View style={{ margin: 10 }}>
            <HTML html={_product.description} />
          </View>
        )}
      </View>
    );
  }

  renderReviews(_product) {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>
          {`${Languages.ProductReviews} (${_product.rating_count})`}
        </Text>
        <ReviewTab product={_product} />
      </View>
    );
  }

  renderButtonGroup() {
    const noMargin = {
      margin: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
    };
    const opAddToCart = (go = false) => {
      // if (this.inCartTotal < 5) {
      const _product = this.props.product;
      const _variation = this.state.currentVariation;

      // if product have variations and if current variation is not found
      if (_product.variations.length > 0) {
        this.refs.form.onPress();
        if (!_variation) return;
      }
      // this.props.addCartItem(_product, _variation)
      // } else
      //   alert(Languages.ProductLimitWaring)

      // if (go) Actions.cart();
    };

    const opAddToWishlist = () => {
      const _product = this.props.product;
      const _variation = this.state.currentVariation;

      // if product have variations and if current variation is not found
      if (_product.variations.length > 0) {
        this.refs.form.onPress();
        if (!_variation) return;
      }
      if (this.isInWishList) {
        this.props.removeWishListItem(_product, _variation);
      } else this.props.addWishListItem(_product, _variation);
    };
    return (
      <View style={{ flexDirection: "row" }}>
        <Button
          autoWidth={false}
          onPress={() => opAddToCart(true)}
          borderLess
          style={[noMargin, { flex: 4 }]}>
          {Languages.BUYNOW}
        </Button>
        <Button
          autoWidth={false}
          onPress={() => opAddToCart()}
          borderLess
          overlayColor={Color.product.BuyNowButton}
          iconName={
            this.inCartTotal == 0 ? Icon.ShoppingCartEmpty : Icon.AddToCart
          }
          style={[noMargin, { flex: 1 }]}
        />
        <Button
          autoWidth={false}
          onPress={() => opAddToWishlist()}
          borderLess
          overlayColor={Color.product.BuyNowButton}
          iconName={this.isInWishList ? Icon.Wishlist : Icon.WishlistEmpty}
          style={[noMargin, { flex: 1 }]}
        />
      </View>
    );
  }

  render() {
    // const {} = this.state;
    const product = this.props.product;

    return (
      <View>
        <ScrollView style={styles.container}>
          {this.renderSwiper(product)}
          <View style={styles.container}>
            {this.renderTopInfo(product)}
            {this.renderVariation(product)}
            {this.renderDescription(product)}
            {this.renderReviews(product)}
          </View>
        </ScrollView>
        {this.renderButtonGroup()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.background,
  },
  image: {
    width: Styles.width,
    height: Styles.width * Styles.thumbnailRatio,
  },
  topWrap: {
    ...Styles.Common.ColumnCenter,
    padding: 10,
  },
  name: {
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.large + 4,
    marginBottom: 10,
  },
  sale_price: {
    fontSize: Styles.FontSize.big,
    color: Color.blackTextDisable,
    textDecorationLine: "line-through",
  },
  price: {
    fontSize: Styles.FontSize.big,
    color: Color.accent,
    fontWeight: "bold",
  },
  saleWrap: {
    borderRadius: 5,
    backgroundColor: Color.primary,
    paddingHorizontal: 5,
    // paddingVertical: 2,
    marginHorizontal: 5,
  },
  sale_off: {
    color: Color.lightTextPrimary,
    fontSize: Styles.FontSize.big,
  },
  descWrap: {
    padding: 10,
  },
  label: {
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.big,
    fontWeight: "bold",
  },
  separator: {
    height: 10,
    backgroundColor: Color.blackDivide,
  },
});

ProductScreen.propTypes = {
  // product: PropTypes.object.isRequired,
};
// ProductScreen.defaultProps = {
//    title: 'This is a title'
// };

export default ProductScreen;
