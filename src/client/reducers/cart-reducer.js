import { TYPES } from "../constants/types";

export const CART_INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload,
			};
		case TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		case TYPES.RESET_CART:
			return CART_INITIAL_STATE;
		default:
			return state;
	}
};
