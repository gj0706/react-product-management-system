import { combineReducers } from "redux";
import { userReducer } from "../reducers/user-reducer";
import { productsReducer } from "../reducers/product-reducer";
export const rootReducer = combineReducers({
	user: userReducer,
	products: productsReducer,
});
