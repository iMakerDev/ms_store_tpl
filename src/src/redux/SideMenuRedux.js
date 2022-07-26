/** @format */

import { Constants } from "@common";

export const actions = {
  openSideMenu: () => {
    return { type: Constants.EmitCode.SideMenuOpen };
  },
  closeSideMenu: () => {
    return { type: Constants.EmitCode.SideMenuClose };
  },
  toggleMenu: (isOpen) => {
    return { type: Constants.EmitCode.SideMenuToggle, isOpen };
  },
};

const initialState = {
  isOpen: false,
};

export const reducer = (state = initialState, action) => {
  const { type, isOpen } = action;

  switch (type) {
    case Constants.EmitCode.SideMenuOpen:
      return {
        ...state,
        isOpen: true,
      };

    case Constants.EmitCode.SideMenuClose:
      return {
        ...state,
        isOpen: false,
      };
    case Constants.EmitCode.SideMenuToggle:
      if (typeof isOpen === "undefined") {
        return {
          ...state,
          isOpen: !state.isOpen,
        };
      }
      return {
        ...state,
        isOpen,
      };

    default:
      return state;
  }
};
