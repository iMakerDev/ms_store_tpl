/** @format */

import { flatten } from "lodash";
import { WooWorker } from "api-ecommerce";

import { HorizonLayouts, Languages, Constants } from "@common";
import { getAppConfigJson } from "@app/services/Utils";

const types = {
  LAYOUT_FETCH_SUCCESS: "LAYOUT_FETCH_SUCCESS",
  LAYOUT_FETCH_MORE: "LAYOUT_FETCH_MORE",
  LAYOUT_FETCHING: "LAYOUT_FETCHING",
  LAYOUT_ALL_FETCHING: "LAYOUT_ALL_FETCHING",
  LAYOUT_ALL_FETCH_SUCCESS: "LAYOUT_ALL_FETCH_SUCCESS",
  LAYOUT_HOME_FETCHING: "LAYOUT_HOME_FETCHING",
  LAYOUT_HOME_SUCCESS: "LAYOUT_HOME_SUCCESS",
  LAYOUT_HOME_FAILURE: "LAYOUT_HOME_FAILURE",
};

export const actions = {
  fetchHomeLayouts: (url, enable) => {
    return async (dispatch) => {
      dispatch({ type: types.LAYOUT_HOME_FETCHING });

      const result = enable
        ? await getAppConfigJson(url)
        : { HorizonLayout: HorizonLayouts };

      if (result && result.HorizonLayout) {
        dispatch({
          type: types.LAYOUT_HOME_SUCCESS,
          data: result.HorizonLayout,
        });

        return;
      }

      dispatch({
        type: types.LAYOUT_HOME_FAILURE,
      });
    };
  },

  fetchAllProductsLayout: async (dispatch, layouts, page = 1) => {
    dispatch({ type: types.LAYOUT_ALL_FETCHING });
    const promises = layouts.map((layout, index) => {
      if (layout.layout !== Constants.Layout.circleCategory) {
        return dispatch(
          actions.fetchProductsLayout(
            dispatch,
            layout.category,
            layout.tag,
            page,
            index
          )
        );
      }
    });

    Promise.all(promises).then(() => {
      dispatch({ type: types.LAYOUT_ALL_FETCH_SUCCESS });
    });
  },

  fetchProductsLayout: (dispatch, categoryId = "", tagId = "", page, index) => {
    // eslint-disable-next-line no-shadow
    return (dispatch) => {
      dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });

      return WooWorker.productsByCategoryTag(
        categoryId,
        tagId,
        null,
        null,
        null,
        10,
        page
      ).then((json) => {
        if (json === undefined) {
          dispatch(actions.fetchProductsFailure(Languages.getDataError));
        } else if (json.code) {
          dispatch(actions.fetchProductsFailure(json.message));
        } else {
          for (let i = 0; i < json.length; i++) {
            json[i].name = json[i].name.replace(/^(<br>)+|(<br>)+$/g, "")
          }
          dispatch({
            type:
              page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
            payload: json,
            extra: { index },
            finish: json.length === 0,
          });
        }
      });
    };
  },

  fetchProductsLayoutTagId: async (
    dispatch,
    categoryId = "",
    tagId = "",
    page,
    index
  ) => {
    dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
    const json = await WooWorker.productsByCategoryTag(
      categoryId,
      tagId,
      null,
      null,
      null,
      10,
      page
    );
    if (json === undefined) {
      dispatch(actions.fetchProductsFailure(Languages.getDataError));
    } else if (json.code) {
      dispatch(actions.fetchProductsFailure(json.message));
    } else {
      for (let i = 0; i < json.length; i++) {
        json[i].name = json[i].name.replace(/^(<br>)+|(<br>)+$/g, "")
      }
      dispatch({
        type: page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
        payload: json,
        extra: { index },
        finish: json.length === 0,
      });
    }
  },

  fetchProductsFailure: (error) => ({
    type: types.FETCH_PRODUCTS_FAILURE,
    error,
  }),
};

const initialState = {
  layout: [],
  isFetching: false,
  initializing: true,
};

export const reducer = (state = initialState, action) => {
  const { extra, type, payload, finish } = action;

  switch (type) {
    case types.LAYOUT_ALL_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.LAYOUT_ALL_FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }

    case types.LAYOUT_FETCH_SUCCESS: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === extra.index) {
          layout.push({
            ...item,
            list: flatten(payload),
            isFetching: false,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.LAYOUT_FETCH_MORE: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === extra.index) {
          layout.push({
            ...item,
            list: item.list.concat(payload),
            isFetching: false,
            finish,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    case types.LAYOUT_FETCHING: {
      const layout = [];
      state.layout.map((item, index) => {
        if (index === extra.index) {
          layout.push({
            ...item,
            isFetching: true,
          });
        } else {
          layout.push(item);
        }
      });
      return {
        ...state,
        layout,
      };
    }

    // initialize json file
    case types.LAYOUT_HOME_FETCHING: {
      return {
        ...state,
        initializing: true,
      };
    }

    case types.LAYOUT_HOME_SUCCESS: {
      return {
        ...state,
        layout: action.data,
        initializing: false,
      };
    }

    case types.LAYOUT_HOME_FAILURE: {
      return {
        ...state,
        initializing: false,
      };
    }

    default:
      return state;
  }
};
