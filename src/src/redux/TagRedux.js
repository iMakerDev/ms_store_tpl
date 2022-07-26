/** @format */

import { WooWorker } from "api-ecommerce";

const types = {
  FETCH_TAGS_PENDING: "FETCH_TAGS_PENDING",
  FETCH_TAGS_SUCCESS: "FETCH_TAGS_SUCCESS",
  FETCH_TAGS_FAILURE: "FETCH_TAGS_FAILURE",
};

export const actions = {
  fetchTags: async (dispatch) => {
    dispatch({ type: types.FETCH_TAGS_PENDING });
    const json = await WooWorker.getTags();

    if (json === undefined) {
      dispatch(actions.fetchTagsFailure("Can't get data from server"));
    } else if (json.code) {
      dispatch(actions.fetchTagsFailure(json.message));
    } else {
      dispatch(actions.fetchTagsSuccess(json));
    }
  },
  fetchTagsSuccess: (items) => {
    return { type: types.FETCH_TAGS_SUCCESS, items };
  },
  fetchTagsFailure: (error) => {
    return { type: types.FETCH_TAGS_FAILURE, error };
  },
};

const initialState = {
  isFetching: false,
  error: null,
  list: [],
};

export const reducer = (state = initialState, action) => {
  const { type, mode, error, items, category, value } = action;

  switch (type) {
    case types.FETCH_TAGS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case types.FETCH_TAGS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: items || [],
        error: null,
      };
    }
    case types.FETCH_TAGS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        list: [],
        error,
      };
    }

    default: {
      return state;
    }
  }
};
