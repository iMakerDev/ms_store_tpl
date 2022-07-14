/** @format */

import * as React from "react";

import { Home } from "@containers";

const HomeScreen = ({ navigation }) => {
  return (
    <Home
      onShowAll={(config, index) => {
        navigation.navigate("ListAllScreen", { config, index });
      }}
      showCategoriesScreen={() => navigation.navigate("CategoriesScreen")}
      onViewProductScreen={(item) => {
        navigation.navigate("DetailScreen", item);
      }}
    />
  );
};

export default HomeScreen;
