import { TYPES } from "../constants/types";
import { createAction } from "./creat-action-helper";
import ajaxConfigHelper from "../api/api";

export const setCurrentUser = (user) =>
	createAction(TYPES.SET_CURRENT_USER, user);
