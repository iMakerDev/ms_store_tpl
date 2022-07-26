/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, I18nManager } from "react-native";
import TimeAgo from "@custom/react-native-timeago";
import { WishListIcon, ImageCache, ProductPrice, Rating } from "@components";
import css from "./style";
import { withTheme } from "@common";

class ThreeColumn extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
  };

  render() {
    const { viewPost, title, post, type, imageURL, date } = this.props;
    const {
      theme: {
        colors: { text },
      },
      currency
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelThree}
        onPress={viewPost}>
        <ImageCache uri={imageURL} style={css.imagePanelThree} />

        <Text style={[css.nameThree, { color: text }]}>{title}</Text>
        {typeof type !== "undefined" && (
          <Text style={css.timeThree}>
            <TimeAgo time={date} />{" "}
          </Text>
        )}
        {typeof type === "undefined" && (
          <ProductPrice currency={currency} product={post} hideDisCount />
        )}
        {typeof type === "undefined" && (
          <WishListIcon
            product={post}
            style={I18nManager.isRTL ? { left: 10 } : { right: 20 }}
          />
        )}
        {typeof type === "undefined" && <Rating rating={post.average_rating} />}
      </TouchableOpacity>
    );
  }
}

export default withTheme(ThreeColumn);
