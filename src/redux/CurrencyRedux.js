/** @format */

import { Config } from "@common";
// import { warn, log } from '@app/Omni'
// import CurrencyWorker from '@services/CurrencyWorker'

const types = {
  CHANGE_CURRENCY: "CHANGE_CURRENCY",
};

export const actions = {
  changeCurrency: (dispatch, currency) => {
    dispatch({ type: types.CHANGE_CURRENCY, currency });
  },
};

const initialState = {
  symbol: Config.DefaultCurrency.symbol,
  name: Config.DefaultCurrency.name,
  symbol_native: Config.DefaultCurrency.symbol,
  decimal_digits: Config.DefaultCurrency.precision,
  rounding: 0,
  code: Config.DefaultCurrency.code,
  name_plural: Config.DefaultCurrency.name_plural,
};

export const reducer = (state = initialState, action) => {
  const { currency } = action;
  switch (action.type) {
    case types.CHANGE_CURRENCY:
      return Object.assign({}, state, { ...currency });
    default:
      return state;
  }
};
