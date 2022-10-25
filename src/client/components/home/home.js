import { useState, useEffect } from "react";
import Header from "../header/header";
import Homepage from "./homepage/homepage";
import Footer from "../footer/footer";

const Home = () => {
	const [isSignedIn, setSignedIn] = useState(false);
	const [products, setProducts] = useState({});

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
				console.log(result);
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
			/>
			{/* {isSignedIn ? (
				<AdminPage products={products} />
			) : ( */}
			<Homepage
				products={products}
				isSignedIn={isSignedIn}
				setSignedIn={setSignedIn}
			/>
			{/* )} */}

			<Footer />
		</div>
	);
};

export default Home;
