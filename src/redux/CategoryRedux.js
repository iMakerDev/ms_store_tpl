/** @format */

import { Config } from "@common";
// import { warn } from '@app/Omni'
import { WooWorker } from "api-ecommerce";




const types = {
  FETCH_CATEGORIES_PENDING: "FETCH_CATEGORIES_PENDING",
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILURE: "FETCH_CATEGORIES_FAILURE",

  SWITCH_DISPLAY_MODE: "SWITCH_DISPLAY_MODE",
  SET_SELECTED_CATEGORY: "SET_SELECTED_CATEGORY",
  CATEGORY_SELECT_LAYOUT: "CATEGORY_SELECT_LAYOUT",
};

export const DisplayMode = {
  ListMode: "ListMode",
  GridMode: "GridMode",
  CardMode: "CardMode",
};

export const actions = {
  fetchCategories: async (dispatch) => {

    console.log('开始获取分类数据...')
    dispatch({ type: types.FETCH_CATEGORIES_PENDING });
    const json = await WooWorker.getCategories();
    if (json instanceof Error) {
      console.error('分类获取失败:网络链接失败');
      console.error(json);
      dispatch(actions.fetchCategoriesFailure("Can't get data from server"));
    } else if (json.code) {
      console.error('分类获取失败:接口返回异常！');
      console.error(json)
      dispatch(actions.fetchCategoriesFailure(json.message));
    } else if(Array.isArray(json)) {
      console.log('分类获取Ok');
      dispatch(actions.fetchCategoriesSuccess(json));

    }else{

      dispatch(actions.fetchCategoriesFailure(json.message));
    }
  },
  fetchCategoriesSuccess: (items) => {

    return { type: types.FETCH_CATEGORIES_SUCCESS, items };
  },
  fetchCategoriesFailure: (error) => {
    return { type: types.FETCH_CATEGORIES_FAILURE, error };
  },
  switchDisplayMode: (mode) => {
    return { type: types.SWITCH_DISPLAY_MODE, mode };
  },
  setSelectedCategory: (category) => {
    return { type: types.SET_SELECTED_CATEGORY, category };
  },
  setActiveLayout: (value) => {
    return { type: types.CATEGORY_SELECT_LAYOUT, value };
  },
};

const initialState = {
  isFetching: false,
  error: null,
  displayMode: DisplayMode.GridMode,
  list: [],
  selectedCategory: null,
  selectedLayout: Config.CategoryListView,
};

export const reducer = (state = initialState, action) => {
  const { type, mode, error, items, category, value } = action;

  switch (type) {
    case types.FETCH_CATEGORIES_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: items,
        error: null,
      };
    }
    case types.FETCH_CATEGORIES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        list: [],
        error,
      };
    }
    case types.SWITCH_DISPLAY_MODE: {
      return {
        ...state,
        displayMode: mode,
      };
    }
    case types.SET_SELECTED_CATEGORY: {
      return {
        ...state,
        selectedCategory: category,
      };
    }
    case types.CATEGORY_SELECT_LAYOUT:
      return {
        ...state,
        isFetching: false,
        selectedLayout: value || false,
      };

    default: {
      return state;
    }
  }
};
