/** @format */

import React, { PureComponent } from "react";
import { Search } from "@components";

export default class SearchScreen extends PureComponent {
  render() {
    const { navigation } = this.props;
    const { navigate, goBack } = navigation;

    return (
      <Search
        onBack={goBack}
        onViewProductScreen={(product) => navigate("DetailScreen", product)}
        navigation={navigation}
        onFilter={(onSearch) => navigate("FiltersScreen", { onSearch })}
      />
    );
  }
}
