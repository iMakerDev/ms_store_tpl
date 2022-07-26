/** @format */

import React, { Component } from "react";
import { View } from "react-native";

import { PostDetail } from "@containers";

// eslint-disable-next-line react/prefer-stateless-function
class NewsDetailScreen extends Component {
  render() {
    const { route } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {typeof route.params !== "undefined" && (
          <PostDetail post={route.params.post} />
        )}
      </View>
    );
  }
}

export default NewsDetailScreen;
