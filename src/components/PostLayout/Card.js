/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, I18nManager } from "react-native";
import TimeAgo from "react-native-timeago";
import { WishListIcon, ImageCache, ProductPrice, Rating } from "@components";
import css from "./style";
import { withTheme } from '@common'

@withTheme
export default class CardLayout extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
  };

  render() {
    const { post, title, type, imageURL, date, viewPost } = this.props;
    const {
      theme: {
        colors: {
          background, text
        }
      },
      currency
    } = this.props

    const wishIcon = {
      top: 17,
      right: 30,
    };
    const wishIconRTL = {
      top: 17,
      left: 17,
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelOne}
        onPress={viewPost}>
        <ImageCache uri={imageURL} style={css.imagePanelOne} />
        <Text style={[css.nameOne, { color: text }]}>{title}</Text>

        {typeof type !== "undefined" && (
          <Text style={[css.timeOne, { textAlign: "center" }]}>
            <TimeAgo time={date} />
          </Text>
        )}
        {typeof type === "undefined" && (
          <ProductPrice currency={currency} product={post} hideDisCount />
        )}
        {typeof type === "undefined" && (
          <WishListIcon
            product={post}
            style={I18nManager.isRTL ? wishIconRTL : wishIcon}
          />
        )}
        {typeof type === "undefined" && <Rating rating={post.average_rating} />}
      </TouchableOpacity>
    );
  }
}
