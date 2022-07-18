import { CATEOGRY_ACTION_TYPES } from "./category.types";

const INITIAL_STATE = {
  categories: [],
};

export const categoryReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEOGRY_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
