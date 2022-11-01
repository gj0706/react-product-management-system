import { useState, useEffect } from "react";
import Header from "../header/header";
import Homepage from "./homepage/homepage";
import Footer from "../footer/footer";
import "./home.css";
const Home = () => {
	const [user, setUser] = useState(null);
	const [isSignedIn, setSignedIn] = useState(false);
	const [products, setProducts] = useState({});
	const handleSignIn = () => {
		setSignedIn(true);
	};
	const handleSignOut = () => {
		setSignedIn(false);
		setUser(null);
	};

	// useEffect(() => {
	// 	const loggedInUser = localStorage.getItem("user");
	// 	if (loggedInUser) {
	// 		const foundUser = JSON.parse(loggedInUser);
	// 		setUser(foundUser);
	// 	}
	// }, []);

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
				user={user}
				setUser={setUser}
			/>

			<Homepage
				products={products}
				isSignedIn={isSignedIn}
				setSignedIn={setSignedIn}
				user={user}
			/>
			<Footer />
		</div>
	);
};

export default Home;
