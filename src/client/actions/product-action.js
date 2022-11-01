import { createAction } from "./creat-action-helper";
import ajaxConfigHelper from "../api/api";
import { TYPES } from "../constants/types";

export const setProducts = (products) =>
	createAction(TYPES.SET_PRODUCTS, products);

export const getProducts = (dispatch) => async () => {
	try {
		const response = await fetch("/getProducts");
		const result = await response.json();
		dispatch({
			type: "GET_ALL_PRODUCTS",
			payload: result,
		});
	} catch (error) {
		console.log(error);
	}
};

export const addProduct =
	(dispatch) =>
	async ({ id, name, price, quantity, imageUrl, description }) => {
		try {
			let response = await fetch(
				"/addProduct",
				ajaxConfigHelper({
					id: id,
					name: name,
					price: price,
					quantity: quantity,
					imageUrl: imageUrl,
					description: description,
				})
			);
			let result = await response.json();
			dispatch({
				type: TYPES.ADD_PRODUCT,
				payload: result,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const updateProduct =
	(dispatch) =>
	async ({ id, name, price, quantity, imageUrl, description }) => {
		try {
			let response = await fetch(
				"/updateProduct",
				ajaxConfigHelper(
					{
						id: id,
						name: name,
						price: price,
						quantity: quantity,
						imageUrl: imageUrl,
						description: description,
					},
					"PUT"
				)
			);
			let result = await response.json();
			dispatch({
				type: TYPES.UPDATE_PRODUCT,
				payload: result,
			});
		} catch (error) {
			console.log(error);
		}
	};
