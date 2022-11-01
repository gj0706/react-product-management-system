import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer } from "../reducers/user-reducer";
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}
	console.log("type", action.type);
	console.log("payload", action.payload);
	console.log("currentState: ", store.getState());

	next(action);

	console.log("next state: ", store.getState());
};

const middlewares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
//wrap all the components in the app in the store

// root-reducer
