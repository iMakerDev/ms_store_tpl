/** @format */

import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { makeGetCollections } from "@selectors/LayoutSelector";
import * as LayoutRedux from "@redux/LayoutRedux";
import * as NewsRedux from "@redux/NewsRedux";
import * as CategoryRedux from "@redux/CategoryRedux";

import HList from "./HList";

const ListItem = React.memo(
  ({
    item,
    index,
    language,
    showCategoriesScreen,
    onViewProductScreen,
    onShowAll,
  }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const getCollections = makeGetCollections();

    const list = useSelector((state) => state.categories.list); //类别
    const news = useSelector((state) => state.news.list);
    const currency = useSelector((state) => state.currency); //货币
    const layout = useSelector((state) => state.layouts.layout);
    const collections = useSelector((state) => getCollections(state));
    const setSelectedCategory = React.useCallback(
      (cate) => {
        dispatch(CategoryRedux.actions.setSelectedCategory(cate));
      },
      [dispatch]
    );

    const fetchProductsByCollections = useCallback(
      (categoryId, tagId, page = 1, idx) => {
        LayoutRedux.actions.fetchProductsLayoutTagId(
          dispatch,
          categoryId,
          tagId,
          page,
          idx
        );
      },
      [dispatch]
    );

    const fetchNews = useCallback(
      (per_page, page) => {
        NewsRedux.actions.fetchNews(dispatch, per_page, page);
      },
      [dispatch]
    );

    const _fetchPost = useCallback(
      ({ config, idx, page }) => {
        fetchProductsByCollections(config.category, config.tag, page, idx);
      },
      [fetchProductsByCollections]
    );

    return (
      <HList
        horizontal
        onViewProductScreen={onViewProductScreen}
        onShowAll={onShowAll}
        config={item}
        index={index}
        collection={collections[index]}
        list={list}
        news={news}
        fetchPost={_fetchPost}
        fetchNews={fetchNews}
        navigation={navigation}
        fetchProductsByCollections={fetchProductsByCollections}
        setSelectedCategory={setSelectedCategory}
        showCategoriesScreen={showCategoriesScreen}
        currency={currency}
        layouts={layout}
        language={language}
      />
    );
  }
);

export default ListItem;
