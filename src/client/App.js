import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./actions/user-action";
import { setCurrentUserCart } from "./actions/cart-action";
import CreateProductPage from "./components/home/create-product/create-product";
import ProductDetailPage from "./components/home/product-detail/product-detail";
import EditProductPage from "./components/home/edit-product/edit-product";
import Home from "./components/home/home";
import Errorpage from "./components/error-page/error-page";
import "./App.css";

function App() {
	const dispatch = useDispatch();

	const fetchCurrentUserCart = async (id, token) => {
		try {
			const response = await fetch(`/getCart/${id}`, {
				method: "GET",
				headers: new Headers({
					token: `Bearer ${token}`,
					"content-type": "application/json",
				}),
			});
			const result = await response.json();
			dispatch(setCurrentUserCart(result));
			console.log("current user cart: ", result);
			return result;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			const currentUserId = foundUser.id;
			dispatch(setCurrentUser(foundUser));
			fetchCurrentUserCart(currentUserId, foundUser.accessToken);
		}
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/detail/:pId" element={<ProductDetailPage />} />
			<Route path="/create" element={<CreateProductPage />} />
			<Route path="/edit/:pId" element={<EditProductPage />} />
			<Route path="/*" element={<Errorpage />} />
		</Routes>
	);
}

export default App;
