import { createAction } from "../../utils/reducer/reducer.utils";

import { CATEOGRY_ACTION_TYPES } from "./category.types";

export const setCategories = (categoriesArray) =>
  createAction(CATEOGRY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
