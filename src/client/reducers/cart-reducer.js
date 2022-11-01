import { remove } from "fs-extra";

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	caretCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;
	// const payload ={
	//   cartItems,
	//   cartCount,
	//   cartTotal,
	// }

	switch (type) {
		default:
			throw new Error(`unhandled type of ${type} in cartReducer`);
	}
};

const updateCartItemsReducer = (newCartItems) => {
	/*
  generate newCartTotal
  generate newCartCount
  dispatch new action with payload = {
    newCartItem,
    newCartTotal,
    newCartCount,
  }
  */
};

const addItemToCart = (productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	updateCartItemsReducer(newCartItems);
};

const removeItemToCart = (cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	updateCartItemsReducer(newCartItems);
};

const clearItemFromCart = (cartItemToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	updateCartItemsReducer(newCartItems);
};
