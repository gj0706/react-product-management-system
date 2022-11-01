import { TYPES } from "../constants/types";
import { createAction } from "./creat-action-helper";
import ajaxConfigHelper from "../api/api";

export const setCurrentUser = (user) =>
	createAction(TYPES.SET_CURRENT_USER, user);

export const signIn =
	(dispatch) =>
	async ({ email, password }) => {
		try {
			let response = await fetch(
				"/signIn",
				ajaxConfigHelper({ email: email, password: password })
			);
			let result = await response.json();
			dispatch({
				type: "SIGNIN",
				payload: {
					email,
					password,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

export const signUp =
	(dispatch) =>
	async ({ id, email, password, type }) => {
		try {
			let response = await fetch(
				"/signup",
				ajaxConfigHelper({
					id: email,
					email: email,
					password: password,
					type: "USER",
				})
			);
			let result = await response.json();
			dispatch({
				type: "SIGNUP",
				payload: {
					id,
					email,
					password,
					type,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

export const signOut =
	(dispatch) =>
	async ({ email, password }) => {
		try {
			const response = await fetch("/signout");
			const result = await response.json();
			dispatch({
				type: "SIGNOUT",
			});
		} catch (error) {
			console.log(error);
		}
	};
