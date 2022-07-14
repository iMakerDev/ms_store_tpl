/** @format */

import * as React from "react";
import { useEffect, useCallback } from "react";
import { Animated, FlatList, RefreshControl ,Text} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Config, withTheme } from "@common";
import * as LayoutRedux from "@redux/LayoutRedux";

import Header from "./Header";
import ListItem from "./ListItem";
import styles from "./styles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HorizonList = React.memo(
  ({
    theme: { colors: text },
    showCategoriesScreen,
    onViewProductScreen,
    onShowAll,
    language,
  }) => {
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const scrollAnimation = new Animated.Value(0);

    const initializing = useSelector((state) => state.layouts.initializing);
    const layout = useSelector((state) => state.layouts.layout);
    const isFetching = useSelector((state) => state.layouts.isFetching);

    const isConnected = useSelector((state) => state.netInfo.isConnected);
    const fetchAllProductsLayout = useCallback(() => {
      LayoutRedux.actions.fetchAllProductsLayout(dispatch, layout);
    }, [dispatch, layout]);

    useEffect(() => {
      if (!initializing) {
        fetchAll();
      }
    }, [fetchAll, initializing]);

    const fetchAll = useCallback(() => {
      if (isConnected) {
        fetchAllProductsLayout();
      }
    }, [fetchAllProductsLayout, isConnected]);

    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <AnimatedFlatList
        data={layout}
        keyExtractor={(item, index) => `h_${index}`}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              key={`hList-${index}`}
              item={item}
              index={index}
              language={language}
              showCategoriesScreen={showCategoriesScreen}
              onViewProductScreen={onViewProductScreen}
              onShowAll={onShowAll}
            />
          );
        }}
        ListHeaderComponent={() => {
          if (!Config.Layout.HideHomeLogo) {
            return <Header />;
          }
          return null;
        }}
        scrollEventThrottle={1}
        refreshing={isFetching}
        contentContainerStyle={styles.mainList}
        {...{ onScroll }}
        refreshControl={
          <RefreshControl
            tintColor={text}
            refreshing={isFetching}
            progressViewOffset={30}
            onRefresh={fetchAll}
          />
        }
      />
    );
  }
);

export default withTheme(HorizonList);
