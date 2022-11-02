import { useState, useEffect } from "react";
import { setProducts } from "../../actions/product-action";
import { useDispatch } from "react-redux";
import Header from "../header/header";
import Homepage from "./homepage/homepage";
import Footer from "../footer/footer";
import "./home.css";
import { Outlet } from "react-router-dom";
const Home = () => {
	// const [user, setUser] = useState(null);
	// const [isSignedIn, setSignedIn] = useState(false);
	// const [products, setProducts] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		const getProductData = async () => {
			try {
				const response = await fetch("/getProducts");
				const result = await response.json();
				dispatch(setProducts(result));
			} catch (error) {
				console.log(error);
			}
		};
		getProductData();
	}, []);

	return (
		<div className="home-container">
			<Header />
			<Homepage />
			<Footer />
		</div>
	);
};

export default Home;
