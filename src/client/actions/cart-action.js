import { TYPES } from "../constants/types";
import { createAction } from "./creat-action-helper";
import ajaxConfigHelper from "../api/api";

export const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
	// find the cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	// check if quantity is equal to 1, if it is remove that item from the cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	// return back cartitems with matching cart item with reduced quantity
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return createAction(TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) =>
	createAction(TYPES.SET_IS_CART_OPEN, boolean);

export const getCurrentUserCart = async () => {
	try {
		const response = await fetch("/getCart");
		const result = await response.json();
		console.log(result);
		createAction(TYPES.GET_CURRENT_USER_CART, result);
	} catch (error) {
		console.log(error);
	}
};

const updateCurrentUserCartStart = () =>
	createAction(TYPES.UPDATE_CURRENT_USER_CART_START);

const updateCurrentUserCartSuccess = () =>
	createAction(TYPES.UPDATE_CURRENT_USER_CART_SUCCESS);

const updateCurrentUserCartFailed = (error) =>
	createAction(TYPES.UPDATE_CURRENT_USER_CART_FAILED, error);

export const updateCurrentUserCartStartAsync = (cartItems) => {
	return async (dispatch) => {
		dispatch(updateCurrentUserCartStart());
		try {
			const response = await fetch(
				"/updateCart",
				ajaxConfigHelper(cartItems, "PUT")
			);
			const result = await response.json();
			console.log(result);
			dispatch(updateCurrentUserCartSuccess());
		} catch (error) {
			console.log(error);
		}
	};
};

export const fetchCurrentUserCartStart = () =>
	createAction(TYPES.FETCH__CURRENT_USER_CART_START);

export const fetchCurrentUserCartSuccess = (cartItems) =>
	createAction(TYPES.FETCH__CURRENT_USER_CART_SUCCESS, cartItems);

export const fetchCurrentUserCartFailure = (error) =>
	createAction(TYPES.FETCH__CURRENT_USER_CART_FAILED, error);

export const fetchCurrentUserCartStartAsync = () => {
	return async (dispatch) => {
		dispatch(fetchCurrentUserCartStart());
		try {
			const response = await fetch("/getCart");
			const cartItems = await response.json();
			console.log(cartItems);
			dispatch(fetchCurrentUserCartSuccess(cartItems));
		} catch (error) {
			dispatch(fetchCurrentUserCartFailure(error));
		}
	};
};
