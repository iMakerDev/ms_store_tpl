/* eslint-disable */
/** @format */

import * as React from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { AdMob } from "@components";
import CategoriesItem from "./CategoriesItem";
import styles from "./styles";
import { Config } from "@common";
const CategoriesList = React.memo(() => {
  //分类tab屏蔽掉配置的分类
  const categoryList = useSelector((state) =>
    {
      return state.categories.list?.filter((category) => category.parent === 0 && category.name !== Config.iMarkerConfig)
    }
  );
  // remove duplicate item
  const mainCategories = React.useMemo(
    () => [...new Map(categoryList.map((item) => [item.id, item])).values()],
    [categoryList]
  );
  return (
    <ScrollView
      scrollEventThrottle={1}
      contentContainerStyle={styles.scrollView}>
      {mainCategories?.map((category, index) => {
        return (
          <CategoriesItem
            key={index.toString()}
            index={index}
            category={category}
          />
        );
      })}

      <AdMob />
    </ScrollView>
  );
});

export default CategoriesList;
