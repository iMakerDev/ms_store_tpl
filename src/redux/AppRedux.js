/** @format */

import { createActions, handleActions } from "redux-actions";

import { Config } from "@common";

const types = {
  TOGGLE_DARK_THEME: "TOGGLE_DARK_THEME",
};

export const { toggleDarkTheme } = createActions(types.TOGGLE_DARK_THEME);

export const actions = {
  toggleDarkTheme,
};

const defaultState = {
    isDarkTheme: Config.Theme.isDark,
};

export const reducer = handleActions(
  {
    [toggleDarkTheme]: (state) => ({
      ...state,
      isDarkTheme: !state.isDarkTheme,
    }),
  },
  defaultState
);
