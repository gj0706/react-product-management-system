import { useState, useEffect } from "react";
import Header from "../header/header";
import Homepage from "./homepage/homepage";
import Footer from "../footer/footer";
import CreateProductPage from "./create-product/create-product";
import "./home.css";
const Home = () => {
	const [isSignedIn, setSignedIn] = useState(false);
	const [products, setProducts] = useState({});
	const [addClicked, setAddClicked] = useState(false);
	const [editClicked, setEditClicked] = useState(false);
	const [editedProduct, setEditedProduct] = useState({});
	const handleSignIn = () => {
		setSignedIn(true);
	};
	const handleSignOut = () => {
		setSignedIn(false);
	};

	useEffect(() => {
		const getProductData = async () => {
			try {
				const response = await fetch("/getProducts");
				const result = await response.json();
				setProducts(result);
			} catch (error) {
				console.log(error);
			}
		};
		getProductData();
	}, []);

	return (
		<div className="home-container">
			<Header
				isSignedIn={isSignedIn}
				setSignedIn={setSignedIn}
				handleSignIn={handleSignIn}
				handleSignOut={handleSignOut}
				setAddClicked={setAddClicked}
			/>

			<Homepage
				products={products}
				isSignedIn={isSignedIn}
				setSignedIn={setSignedIn}
				addClicked={addClicked}
				setAddClicked={setAddClicked}
				editClicked={editClicked}
				setEditClicked={setEditClicked}
				editedProduct={editedProduct}
				setEditedProduct={setEditedProduct}
			/>

			<Footer />
		</div>
	);
};

export default Home;
