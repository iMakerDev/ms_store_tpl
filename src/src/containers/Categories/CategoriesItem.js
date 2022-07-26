/** @format */

import * as React from "react";
import { View, Text, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { TouchableScale } from "@components";
import { Images } from "@common";
import { BlockTimer } from "@app/Omni";
import * as CategoryRedux from "@redux/CategoryRedux";

import styles from "./styles";

const CategoriesItem = React.memo(({ category, index }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const textStyle =
    index % 2 === 0
      ? { marginRight: 30, textAlign: "right" }
      : { marginLeft: 30, textAlign: "left" };

  const imageCategory = React.useMemo(() => {
    return category?.image
      ? { uri: category?.image.src }
      : Images.categoryPlaceholder;
  }, [category?.image]);

  const setSelectedCategory = React.useCallback(
    (cate) => {
      dispatch(CategoryRedux.actions.setSelectedCategory(cate));
    },
    [dispatch]
  );

  const onRowClickHandle = React.useCallback(() => {
    BlockTimer.execute(() => {
      setSelectedCategory({
        ...category,
        mainCategory: category,
      });

      navigate("CategoryScreen", { mainCategory: category });
    }, 500);
  }, [category, navigate, setSelectedCategory]);

  if (!category) return null;

  return (
    <View style={styles.containerStyle}>
      <TouchableScale style={styles.imageView} onPress={onRowClickHandle}>
        <Image style={styles.image} source={imageCategory} />

        <View
          style={[
            styles.overlay,
            index % 2 === 0 && { alignItems: "flex-end" },
            index % 2 !== 0 && { alignItems: "flex-start" },
          ]}>
          <Text style={[styles.mainCategoryText, { ...textStyle }]}>
            {category.name.replace(/&amp;/g, "&")}
          </Text>
          <Text style={[styles.numberOfProductsText, { ...textStyle }]}>
            {`${category.count} products`}
          </Text>
        </View>
      </TouchableScale>
    </View>
  );
});

export default CategoriesItem;
