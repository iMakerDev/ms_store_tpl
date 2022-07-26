/** @format */

import React, { Component } from "react";

import { ProductList } from "@components";

// eslint-disable-next-line react/prefer-stateless-function
class ListAllScreen extends Component {
  render() {
    const { route, navigation } = this.props;
    const params = route.params;

    return (
      <ProductList
        headerImage={
          params.config.image && params.config.image.length > 0
            ? { uri: params.config.image }
            : null
        }
        config={params.config}
        page={1}
        navigation={navigation}
        index={params.index}
        onViewProductScreen={(item) =>
          navigation.navigate("DetailScreen", item)
        }
      />
    );
  }
}

export default ListAllScreen;
