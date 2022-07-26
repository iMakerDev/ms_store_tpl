/** @format */

import React, { Component } from "react";
import {
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
} from "react-native";
import TimeAgo from "@custom/react-native-timeago";
import { Tools, Constants, Images } from "@common";
import { WishListIcon } from "@components";
import { getProductImage } from "@app/Omni";
import { connect } from "react-redux";
import { LinearGradient } from "@expo";

import styles from "./styles";

const { width } = Dimensions.get("window");

class PostBanner extends Component {
  constructor(props) {
    super(props);
    this.limit = 4;
    this.page = 1;
    this.isProductList = props.type === undefined;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list.length != this.props.list.length;
  }

  componentDidMount() {
    const { type } = this.props;
    if (typeof type !== "undefined") {
      this.props.fetchStickyNews(this.limit, this.page);
    } else {
      this.props.fetchStickyProducts(this.limit, this.page);
    }
  }

  onRowClickHandle(item) {
    if (this.isProductList) {
      this.props.onViewProductScreen({ product: item });
    } else {
      this.props.onViewNewsScreen({ post: item });
    }
  }

  render() {
    const { list, type, onViewItem } = this.props;

    const price = { top: 10, right: 15 };
    const priceRTL = { top: 10, left: 10 };

    const renderBanner = (post, i = 0) => {
      let imageUrl =
        typeof post.images !== "undefined"
          ? getProductImage(post.images[0].src, width)
          : Images.PlaceHolder;

      let postName =
        typeof post.name !== "undefined"
          ? Tools.getDescription(post.name, 300)
          : "";
      let postPrice = `${Tools.getPriceIncludedTaxAmount(post)} `;
      let postPriceSale = post.on_sale
        ? `${Tools.getCurrencyFormatted(post.price)} `
        : null;

      if (typeof type !== "undefined") {
        imageUrl = Tools.getImage(post, Constants.PostImage.medium_large);
        postName =
          typeof post.title !== "undefined"
            ? Tools.getDescription(post.title.rendered, 300)
            : "";
        postPrice = "";
        postPriceSale = "";
      }

      return (
        <Animated.View style={styles.bannerView} key={`sticky${i}`}>
          {typeof type === "undefined" && (
            <WishListIcon
              product={post}
              style={Constants.RTL ? priceRTL : price}
            />
          )}
          <Image
            style={styles.bannerImage}
            defaultSource={Images.PlaceHolder}
            source={{ uri: imageUrl }}
          />

          <TouchableOpacity
            onPress={() => onViewItem(post)}
            activeOpacity={1}
            style={styles.bannerText}>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}
              style={styles.bannerGradient}>
              <Animated.Text
                style={[
                  styles.bannerTitle,
                  { opacity: this.props.animateOpacity },
                  { transform: [{ translateY: this.props.animate }] },
                ]}>
                {postName}
              </Animated.Text>

              <Animated.View
                style={[
                  styles.bannerDate,
                  { opacity: this.props.animateOpacity },
                  { transform: [{ translateY: this.props.animate }] },
                ]}>
                {typeof type === "undefined" ? (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.price]}>{postPrice}</Text>
                    <Text
                      style={[post.on_sale && styles.sale_price, styles.price]}>
                      {postPriceSale}
                    </Text>
                  </View>
                ) : (
                  <TimeAgo style={styles.time} time={post.date} />
                )}
              </Animated.View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      );
    };

    if (list === null) {
      return (
        <View style={{ height: 200 }}>
          <Image
            style={styles.bannerImage}
            source={require("@images/placeholderImage.png")}
          />
        </View>
      );
    }

    return (
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal>
        {list.map((post, i) => renderBanner(post, i))}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ products, news }, ownProps) => {
  const list =
    ownProps.type === undefined ? products.productSticky : news.sticky;
  return { list };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const Product = require("@redux/ProductRedux");
  const News = require("@redux/NewsRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchStickyProducts: (per_page, page) => {
      Product.actions.fetchStickyProducts(dispatch, per_page, page);
    },
    fetchStickyNews: (per_page, page) => {
      News.actions.fetchStickyNews(dispatch, per_page, page);
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(PostBanner);
