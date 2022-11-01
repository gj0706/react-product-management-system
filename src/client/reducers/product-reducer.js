import { TYPES } from "../constants/types";

export const PRODUCTS_INITIAL_STATE = {
	products: {},
};

export const productsReducer = (
	state = PRODUCTS_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		case TYPES.SET_PRODUCTS:
			return { ...state, products: payload };
		default:
			return state;
	}
};
