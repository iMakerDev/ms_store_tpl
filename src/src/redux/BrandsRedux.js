/** @format */

import { createActions, handleActions } from "redux-actions";
import { WooWorker } from "api-ecommerce";

const types = {
  BRANDS_FETCHING: "BRANDS_FETCHING",
  BRANDS_SUCCESS: "BRANDS_SUCCESS",
  BRANDS_FAILURE: "BRANDS_FAILURE",
};

export const { brandsFetching, brandsSuccess, brandsFailure } = createActions(
  types.BRANDS_FETCHING,
  types.BRANDS_SUCCESS,
  types.BRANDS_FAILURE
);

export const actions = {
  fetchBrands: () => async (dispatch) => {
    dispatch(brandsFetching());
    const json = await WooWorker.getBrands();

    if (json === undefined) {
      dispatch(brandsFailure("Can't get data from server"));
    } else if (json.code) {
      dispatch(brandsFailure(json.message));
    } else {
      dispatch(brandsSuccess(json));
    }
  },
};

const defaultState = { list: [], isFetching: false, error: null };

export const reducer = handleActions(
  {
    [brandsFetching]: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    [brandsSuccess]: (state, { payload }) => ({
      ...state,
      list: payload,
      isFetching: false,
      error: null,
    }),
    [brandsFailure]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      error: payload,
    }),
  },
  defaultState
);
