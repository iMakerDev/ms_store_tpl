/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import { WishListIcon, ImageCache, ProductPrice, Rating } from "@components";
import { Tools, Constants, withTheme } from "@common";
import css from "./style";

class TwoColumn extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    type: PropTypes.string,
    viewPost: PropTypes.func,
  };

  render() {
    const { post, type, viewPost } = this.props;
    const imageURL = Tools.getImage(post);
    const title = typeof post.title === "undefined" ? "" : post.title.rendered;
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
        style={css.smCardNews}
        onPress={viewPost}>
        <View style={css.cardView}>
          <ImageCache style={css.smImage} uri={imageURL} />
          <View style={css.smDescription}>
            <Text style={[css.smTitle, { color: text }]}>{Tools.getDescription(title)}</Text>
            {typeof type === "undefined" && (
              <ProductPrice currency={currency} product={post} hideDisCount />
            )}
          </View>
        </View>
        {typeof type === "undefined" && (
          <WishListIcon
            product={post}
            style={Constants.RTL ? { left: 10 } : { right: 25 }}
          />
        )}
        {typeof type === "undefined" && (
          <Rating rating={post.average_rating} />
        )}
      </TouchableOpacity>
    );
  }
}

export default withTheme(TwoColumn)
