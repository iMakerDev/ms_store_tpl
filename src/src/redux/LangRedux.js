/** @format */

import { Constants } from "@common";
// import { warn, log } from '@app/Omni'

const types = {
  SWITCH_LANGUAGE: "SWITCH_LANGUAGE",
  SWITCH_RTL: "SWITCH_RTL",
};

export const actions = {
  switchLanguage: (dispatch, language) => {
    dispatch({ type: types.SWITCH_LANGUAGE, ...language });
  },
  switchRtl: (dispatch, rtl) => {
    dispatch({ type: types.SWITCH_RTL, rtl });
  },
};

const initialState = {
  lang: Constants.Language,
  rtl: Constants.RTL,
};

export const reducer = (state = initialState, action) => {
  const { lang, rtl } = action;
  switch (action.type) {
    case types.SWITCH_LANGUAGE:
      return Object.assign({}, state, {
        lang,
        rtl,
      });
    case types.SWITCH_RTL:
      return Object.assign({}, state, { rtl });

    default:
      return state;
  }
};
