import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./actions/user-action";
import { updateCurrentuserCart } from "./actions/cart-action";
// import { ErrorBoundary } from "reeact-error-boundary";
import { selectCartItems } from "./stores/cart-selector";
import {
	addItemToCart,
	emptyCart,
	setCurrentUserCart,
} from "./actions/cart-action";
import ajaxConfigHelper from "./api/api";
import CreateProductPage from "./components/home/create-product/create-product";
import ProductDetailPage from "./components/home/product-detail/product-detail";
import EditProductPage from "./components/home/edit-product/edit-product";
import Home from "./components/home/home";
import Errorpage from "./components/error-page/error-page";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const fetchCurrentUserCart = async (id) => {
		try {
			const response = await fetch(`/getCart/${id}`);
			const result = await response.json();
			dispatch(setCurrentUserCart(result));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			// dispatch(emptyCart());
			const foundUser = JSON.parse(loggedInUser);
			const currentUserId = foundUser.id;
			dispatch(setCurrentUser(foundUser));
			// fetchCurrentUserCart(currentUserId);
			updateCurrentuserCart(currentUserId, cartItems);
		}
		// dispatch(setCurrentUser(JSON.parse(loggedInUser)));
	}, [cartItems]);

	return (
		// <ErrorBoundary FallbackComponent={<Errorpage />}>
		<Routes>
			<Route path="/" element={<Home />} />
			{/* <Route path="home" element={<Homepage />} /> */}

			<Route path="/detail/:pId" element={<ProductDetailPage />} />
			<Route path="/create" element={<CreateProductPage />} />
			<Route path="/edit/:pId" element={<EditProductPage />} />
			<Route path="/*" element={<Errorpage />} />
		</Routes>
		// </ErrorBoundary>
	);
}

export default App;
