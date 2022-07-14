/** @format */

const types = {
  TOTAL_POINTS: "TOTAL_POINTS",
  USED_POINTS: "USED_POINTS",
};

export const actions = {
  getTotalPoints: (totalPoints) => {
    return { type: types.TOTAL_POINTS, totalPoints };
  },
  getUsedPoints: (usedPoints) => {
    return { type: types.USED_POINTS, usedPoints };
  },

};

const initialState = {
  totalPoints: 0,
  usedPoints: 0
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.TOTAL_POINTS:
      return { ...state, totalPoints: action.totalPoints };
    case types.USED_POINTS:
      return { usedPoints, usedPoints: action.usedPoints };
    default:
      return state;
  }
};
