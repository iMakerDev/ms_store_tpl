/** @format */

import CountryWorker from "../services/CountryWorker";
// import { flatten } from 'lodash'
// import { warn } from '@app/Omni'

const types = {
  COUNTRY_FETCH_SUCCESS: "COUNTRY_FETCH_SUCCESS",
  COUNTRY_FETCHING: "COUNTRY_FETCHING",
  COUNTRY_FETCH_FAILURE: "COUNTRY_FETCH_FAILURE",
};

export const actions = {
  fetchAllCountries: async (dispatch) => {
    dispatch({ type: types.COUNTRY_FETCHING });

    const json = await CountryWorker.getAllCountries();
    // console.log(json)
    if (json === undefined) {
      dispatch({ type: types.COUNTRY_FETCH_FAILURE });
    } else if (json.code) {
      dispatch({ type: types.COUNTRY_FETCH_FAILURE });
    } else {
      dispatch({
        type: types.COUNTRY_FETCH_SUCCESS,
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
    case types.COUNTRY_FETCH_SUCCESS:
      return {
        ...state,
        list: payload,
        isFetching: false,
      };

    case types.COUNTRY_FETCH_FAILURE:
      return {
        ...state,
        finish: true,
        isFetching: false,
      };

    case types.COUNTRY_FETCHING:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
};
