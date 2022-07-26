/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import { ImageCache } from "@components";
import TimeAgo from "react-native-timeago";
import css from "./style";

export default class DefaultLayout extends PureComponent {
  static propTypes = {
    imageURL: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
  };

  render() {
    const { imageURL, title, date, viewPost } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panel}
        onPress={viewPost}>
        <ImageCache uri={imageURL} style={css.imagePanel} />

        <Text style={css.name}>{title}</Text>
        <Text style={[css.time, { textAlign: "center" }]}>
          <TimeAgo time={date} hideAgo />
        </Text>
      </TouchableOpacity>
    );
  }
}
