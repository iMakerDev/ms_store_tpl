/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import TimeAgo from "react-native-timeago";
import { WishListIcon, ImageCache, ProductPrice, Rating } from "@components";
import { Constants, withTheme } from "@common";
import css from "./style";

class ColumnLayout extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
  };

  render() {
    const { imageURL, post, type, title, date, viewPost } = this.props;
    const {
      theme: {
        colors: {
          background, text
        }
      },
      currency
    } = this.props

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelTwo}
        onPress={viewPost}>
        <ImageCache uri={imageURL} style={css.imagePanelTwo} />

        <Text style={[css.nameTwo, { color: text }]}>{title.replace(/<br>|<\/br>/g,"")}</Text>
        {typeof type !== "undefined" && (
          <Text style={[css.timeTwo, { alignSelf: "center" }]}>
            <TimeAgo time={date} />
          </Text>
        )}
        {typeof type === "undefined" && (
          <ProductPrice currency={currency} product={post} hideDisCount />
        )}
        {typeof type === "undefined" && (
          <WishListIcon
            product={post}
            style={Constants.RTL ? { left: 20 } : { right: 25 }}
          />
        )}
        {typeof type === "undefined" && <Rating rating={post.average_rating} />}
      </TouchableOpacity>
    );
  }
}

export default withTheme(ColumnLayout)
