import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./components/home/home";
import "./App.css";
import CreateProductPage from "./components/home/create-product/create-product";
import ProductDetailPage from "./components/home/product-detail/product-detail";
import EditProductPage from "./components/home/edit-product/edit-product";
import Header from "./components/header/header";
import Homepage from "./components/home/homepage/homepage";
import Footer from "./components/footer/footer";
import { setCurrentUser } from "./actions/user-action";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		// if (loggedInUser) {
		// 	const foundUser = JSON.parse(loggedInUser);
		// 	dispatch(setCurrentUser(foundUser));
		// }
		dispatch(setCurrentUser(JSON.parse(loggedInUser)));
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<Home />}>
				<Route path="/home" element={<Homepage />} />
			</Route>
			<Route path="/detail" element={<ProductDetailPage />} />
			<Route path="/create" element={<CreateProductPage />} />
			<Route path="/edit" element={<EditProductPage />} />
		</Routes>
	);
}

export default App;
