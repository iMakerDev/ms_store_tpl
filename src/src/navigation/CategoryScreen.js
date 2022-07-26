/** @format */

import * as React from "react";

import { Category } from "@containers";

const CategoryScreen = ({ navigation }) => {
  return (
    <Category
      onViewProductScreen={(item) => {
        navigation.navigate("DetailScreen", item);
      }}
    />
  );
};

export default CategoryScreen;
