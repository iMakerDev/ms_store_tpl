/** @format */

import { WooWorker } from "api-ecommerce";

const types = {
  PAYMENT_FETCH_SUCCESS: "PAYMENT_FETCH_SUCCESS",
  PAYMENT_FETCHING: "PAYMENT_FETCHING",
  PAYMENT_FETCH_FAILURE: "PAYMENT_FETCH_FAILURE",
};

export const actions = {
  fetchPayments: async (dispatch) => {
    dispatch({ type: types.PAYMENT_FETCHING });

    const json = await WooWorker.getPayments();

    if (json === undefined) {
      dispatch({ type: types.PAYMENT_FETCH_FAILURE });
    } else if (json.code) {
      dispatch({ type: types.PAYMENT_FETCH_FAILURE });
    } else {
      dispatch({
        type: types.PAYMENT_FETCH_SUCCESS,
        payload: json,
        finish: true,
      });
    }
  },
};

const initialState = {
  list: [],
  isFetching: false,
};

export const reducer = (state = initialState, action) => {
  const { extra, type, payload, finish } = action;

  switch (type) {
    case types.PAYMENT_FETCH_SUCCESS:
      return {
        ...state,
        list: payload.filter((payment) => payment.enabled === true),
        isFetching: false,
      };

    case types.PAYMENT_FETCH_FAILURE:
      return {
        ...state,
        finish: true,
        isFetching: false,
      };

    case types.PAYMENT_FETCHING:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
};
