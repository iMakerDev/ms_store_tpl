/** @format */

import React, { Component } from "react";

import { News } from "@containers";

// eslint-disable-next-line react/prefer-stateless-function
class NewsScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <News
        onViewNewsScreen={(post) =>
          navigation.navigate("NewsDetailScreen", post)
        }
      />
    );
  }
}

export default NewsScreen;
