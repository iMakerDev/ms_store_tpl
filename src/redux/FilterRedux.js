/** @format */

import { createActions, handleActions } from "redux-actions";

const types = {
  UPDATE_FILTER: "UPDATE_FILTER",
};

export const { updateFilter } = createActions(types.UPDATE_FILTER);

export const actions = {
  updateFilter,
};

const defaultState = {
  category: null,
  brand: null,
  tag: null,
  price: 2000,
};

export const reducer = handleActions(
  {
    [updateFilter]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  defaultState
);
