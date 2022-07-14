/** @format */

import * as React from "react";
import { useEffect, useMemo, useCallback } from "react";
import { View} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";

import { Constants, withTheme } from "@common";
import { HorizonList, ModalLayout, PostList } from "@components";
import * as CountryRedux from "@redux/CountryRedux";
import * as CategoryRedux from "@redux/CategoryRedux";

import styles from "./styles";

const Home = React.memo(
  ({ theme,background, onViewProductScreen, showCategoriesScreen, onShowAll }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // console.log(theme,'themethemetheme')
    const isConnected = useSelector((state) => state.netInfo.isConnected);
    const countryList = useSelector((state) => state.countries.list);
    const layoutHome = useSelector((state) => state.products.layoutHome);
    const language = useSelector((state) => state.language);



    const fetchCategories = useCallback(() => {
      CategoryRedux.actions.fetchCategories(dispatch);
    }, [dispatch]);

    const fetchAllCountries = useCallback(() => {
      CountryRedux.actions.fetchAllCountries(dispatch);
    }, [dispatch]);

    const isHorizontal = useMemo(
      () => layoutHome === Constants.Layout.horizon || layoutHome === 7,
      [layoutHome]
    );

    useEffect(() => {
      if (isConnected) {
        if (!countryList || isEmpty(countryList)) {
          console.log('Redux:get Categories')
          fetchCategories();
          console.log('Redux:get Countries')
          fetchAllCountries();
        }else{
          console.log('使用缓存的国家区域列表')
        }
      }else{
        console.log('网络链接失败')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, countryList]);
    return (
      <View style={[styles.container, { backgroundColor: theme.dark?'#222229':'#fff' }]}>
        {isHorizontal && (
          <HorizonList
            navigation={navigation}
            language={language}
            onShowAll={onShowAll}
            onViewProductScreen={onViewProductScreen}
            showCategoriesScreen={showCategoriesScreen}
          />
        )}

        {!isHorizontal && (
          <PostList
            navigation={navigation}
            parentLayout={layoutHome}
            onViewProductScreen={onViewProductScreen}
          />
        )}
        <ModalLayout />
      </View>
    );
  }
);

export default withTheme(Home);
