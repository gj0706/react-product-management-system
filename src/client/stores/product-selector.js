import { createSelector } from "reselect";

const selectProductReducer = (state) => state.products;

export const selectProducts = createSelector(
	[selectProductReducer],
	(productsSlice) => productsSlice.products
);

// export const selectProducts = (state) => state.products.products;
