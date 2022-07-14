/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, Image } from "react-native";
import TimeAgo from "react-native-timeago";
import { Images } from "@common";
import css from "./style";

export default class ReadMoreLayout extends PureComponent {
  static propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.any,
    imageURL: PropTypes.string,
    date: PropTypes.any,
    viewPost: PropTypes.func,
    viewCategory: PropTypes.func,
  };

  render() {
    const {
      imageURL,
      title,
      description,
      date,
      viewPost,
      category,
      viewCategory,
    } = this.props;

    return (
      <View style={css.panelList}>
        <TouchableOpacity onPress={viewPost}>
          <Image
            defaultSource={Images.PlaceHolder}
            source={{ uri: imageURL }}
            style={css.imageList}
          />
        </TouchableOpacity>
        <TouchableOpacity style={css.titleList}>
          <Text style={css.nameList}>{title}</Text>
          {description && (
            <Text style={css.descriptionList}>{description}</Text>
          )}

          <View style={{ flexDirection: "row" }}>
            <TimeAgo style={css.timeList} time={date} hideAgo />

            {category && (
              <TouchableOpacity onPress={viewCategory}>
                <Text style={css.category}>- {category}</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
