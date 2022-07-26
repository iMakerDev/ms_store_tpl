/** @format */

import wp from "@services/PostAPI";
import { Constants } from "@common";
import { flatten } from "lodash";

const types = {
  FETCH_NEWS_PENDING: "FETCH_NEWS_PENDING",
  FETCH_NEWS_SUCCESS: "FETCH_NEWS_SUCCESS",
  FETCH_NEWS_FAILURE: "FETCH_NEWS_FAILURE",

  FETCH_NEWS_STICKY_PENDING: "FETCH_NEWS_STICKY_PENDING",
  FETCH_NEWS_STICKY_SUCCESS: "FETCH_NEWS_STICKY_SUCCESS",
  FETCH_NEWS_STICKY_FAILURE: "FETCH_NEWS_STICKY_FAILURE",
  FETCH_NEWS_MORE: "FETCH_NEWS_MORE",
  INIT_NEWS: "INIT_NEWS",
};

export const actions = {
  fetchProductsSuccess: (items) => {
    return { type: types.FETCH_NEWS_SUCCESS, items, finish: true };
  },
  fetchProductsFailure: (error) => {
    return { type: types.FETCH_NEWS_FAILURE, error };
  },
  clearNews: () => {
    return { type: types.CLEAR_NEWS };
  },
  initNews: () => ({ type: types.INIT_NEWS }),
  fetchStickyNews: (dispatch, per_page = 8, page = 1) => {
    dispatch({ type: types.FETCH_NEWS_STICKY_PENDING });
    wp.posts()
      .perPage(per_page)
      .page(page)
      .sticky(Constants.stickyPost)
      .get((err, res) => {
        if (err) {
          dispatch({ type: types.FETCH_NEWS_STICKY_FAILURE, message: err });
        } else {
          dispatch({ type: types.FETCH_NEWS_STICKY_SUCCESS, sticky: res });
        }
      });
  },
  fetchNews: (dispatch, per_page = 8, page = 1) => {
    dispatch({ type: types.FETCH_NEWS_PENDING });
    wp.posts()
      .perPage(per_page)
      .page(page)
      .get((err, res) => {
        if (err) {
          dispatch({ type: types.FETCH_NEWS_FAILURE, message: err });
        } else {
          dispatch({ type: types.FETCH_NEWS_SUCCESS, items: res });
        }
      });
  },
};

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  stillFetch: true,
  isPostFinish: false,
  sticky: [],
};

export const reducer = (state = initialState, action) => {
  const { type, error, items } = action;
  switch (type) {
    case types.INIT_NEWS: {
      return { ...initialState };
    }
    case types.FETCH_NEWS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_NEWS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.concat(flatten(items)),
        stillFetch: items.length !== 0,
        error: null,
      };
    }
    case types.FETCH_NEWS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isPostFinish: true,
        error,
      };
    }

    case types.CLEAR_NEWS: {
      return { ...initialState };
    }

    case types.FETCH_NEWS_STICKY_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.FETCH_NEWS_STICKY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        sticky: flatten(action.sticky),
      };
    }
    case types.FETCH_NEWS_STICKY_FAILURE: {
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    }

    default: {
      return state;
    }
  }
};
