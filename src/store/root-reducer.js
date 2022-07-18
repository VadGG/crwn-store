import { combineReducers } from "redux";


import { userRedcuer } from "./user/user.reducer";
import { categoryReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
    user: userRedcuer,
    categories: categoryReducer,
    cart: cartReducer,
});