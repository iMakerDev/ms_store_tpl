/** @format */

import * as React from "react";
import { useCallback, useEffect,useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "@react-native-firebase/database";

import { Config, Constants, withTheme, Languages } from "@common";
import { BlockTimer, toast } from "@app/Omni";
import {
  Empty,
  LogoSpinner,
  SplitCategories,
  SubCategories,
  ColumnCategories,
} from "@components";

import * as CategoryRedux from "@redux/CategoryRedux";

import CategoriesList from "./CategoriesList";

const CategoriesScreen = React.memo(
  ({ onViewProductScreen, theme, onViewCategory }) => {
    const dispatch = useDispatch();

    const isConnected = useSelector((state) => state.netInfo.isConnected);
    const error = useSelector((state) => state.categories.error);
    const isFetching = useSelector( ( state ) => state.categories.isFetching );

    const fetchCategories = useCallback(() => {
      CategoryRedux.actions.fetchCategories(dispatch);
    }, [dispatch]);

    const setSelectedCategory = React.useCallback(
      (cate) => {
        dispatch(CategoryRedux.actions.setSelectedCategory(cate));
      },
      [dispatch]
    );

    const onRowClickHandle = React.useCallback(
      (category) => {
        BlockTimer.execute(() => {
          setSelectedCategory({
            ...category,
            mainCategory: category,
          });

          onViewCategory({ mainCategory: category });
        }, 500);
      },
      [onViewCategory, setSelectedCategory]
    );

    useEffect(() => {
      if (error) {
        toast(error);
      }
    }, [error]);

    useEffect(() => {
      if (!isConnected) {
        toast(Languages.noConnection);
      }
    }, [isConnected]);

    if (error) {
      return <Empty text={error} />;
    }

    if (isFetching) {
      return <LogoSpinner fullStretch />;
    }

    if (Config.CategoriesLayout === Constants.CategoriesLayout.sideMenu) {
      return (
        <SplitCategories
          onViewPost={(product) => onViewProductScreen({ product })}
        />
      );
    }

    if (Config.CategoriesLayout === Constants.CategoriesLayout.column) {
      return <ColumnCategories onViewCategory={onRowClickHandle} />;
    }

    if (Config.CategoriesLayout === Constants.CategoriesLayout.topMenu) {
      return (
        <SubCategories
          onViewPost={(product) => onViewProductScreen({ product })}
        />
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <CategoriesList />
      </View>
    );
  }
);

export default withTheme(CategoriesScreen);
