import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./actions/user-action";

import CreateProductPage from "./components/home/create-product/create-product";
import ProductDetailPage from "./components/home/product-detail/product-detail";
import EditProductPage from "./components/home/edit-product/edit-product";
import Home from "./components/home/home";
import Errorpage from "./components/error-page/error-page";

import "./App.css";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			dispatch(setCurrentUser(foundUser));
		}
		// dispatch(setCurrentUser(JSON.parse(loggedInUser)));
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{/* <Route path="home" element={<Homepage />} /> */}

			<Route path="/detail/:pId" element={<ProductDetailPage />} />
			<Route path="/create" element={<CreateProductPage />} />
			<Route path="/edit/:pId" element={<EditProductPage />} />
			<Route path="/*" element={<Errorpage />} />
		</Routes>
	);
}

export default App;
