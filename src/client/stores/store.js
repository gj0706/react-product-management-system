import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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

// const persistConfig = {
// 	key: "root",
// 	storage,
// 	blacklist: ["user", "cart", "products"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

// export const persistor = persistStore(store);
//wrap all the components in the app in the store

// root-reducer
