/** @format */

import * as React from "react";

import { Detail } from "@containers";
import { SafeAreaView } from "@components";

const DetailScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView>
      {typeof route.params !== "undefined" && (
        <Detail
          product={route.params.product}
          onViewCart={() => navigation.navigate("CartScreen")}
          onViewProductScreen={(product) => {
            navigation.setParams(product);
          }}
          navigation={navigation}
          route={route}
          onLogin={() => navigation.navigate("LoginScreen")}
          onOpenWebsite={(url) =>
            navigation.navigate("CustomPage", { url, isBack: true })
          }
        />
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;
