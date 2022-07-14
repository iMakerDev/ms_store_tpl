/** @format */

const types = {
  LOGOUT: "LOGOUT",
  LOGIN: "LOGIN_SUCCESS",
  FINISH_INTRO: "FINISH_INTRO",
};

export const actions = {
  login: (user, token) => {
    console.log(user,token,'login 用户信息')
    return { type: types.LOGIN, user, token };
  },
  logout() {
    return { type: types.LOGOUT };
  },
  finishIntro() {
    return { type: types.FINISH_INTRO };
  },
};

const initialState = {
  user: null,
  token: null,
  finishIntro: null,
};

export const reducer = (state = initialState, action) => {
  const { type, user, token } = action;

  switch (type) {
    case types.LOGOUT:
      return { ...initialState };
    case types.LOGIN:
      return { ...state, user, token };
    case types.FINISH_INTRO:
      return { ...state, finishIntro: true };
    default:
      return state;
  }
};
