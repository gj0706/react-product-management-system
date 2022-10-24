import { useState, useEffect } from "react";
import Header from "../header/header";
import Homepage from "./homepage/homepage";
import Body from "../body/body";
import Footer from "../footer/footer";

const Home = () => {
	const [isSignedIn, setSignedin] = useState(false);

	return (
		<div className="home-container">
			<Header />
			{/* {isSignedIn ? <AdminPage /> : */}
			<Homepage />
			{/* } */}
			<Footer />
		</div>
	);
};

export default Home;
