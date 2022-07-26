/** @format */

import * as React from "react";

import { Categories } from "@containers";

const CategoriesScreen = ({ navigation }) => {
  return (
    <Categories
      onViewProductScreen={(item) => navigation.navigate("DetailScreen", item)}
      onViewCategory={(item) => {
        navigation.navigate("CategoryScreen", item);
      }}
    />
  );
};

export default CategoriesScreen;
