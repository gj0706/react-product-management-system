import { useState, useEffect } from "react";
import Header from "../header/header";
import Homepage from "./homepage/homepage";
import Footer from "../footer/footer";

const Home = () => {
	const [isSignedIn, setSignedin] = useState(false);
	const [products, setProducts] = useState({});

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
			<Header isSignedIn={isSignedIn} />
			{/* {isSignedIn ? <AdminPage /> : */}
			<Homepage products={products} />
			{/* } */}
			<Footer />
		</div>
	);
};

export default Home;
