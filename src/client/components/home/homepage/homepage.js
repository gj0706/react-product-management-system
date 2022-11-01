import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../stores/user.selector";
import SubmitButton from "../../submit-button/submit-button";
import CreateProductPage from "../create-product/create-product";
import ProductList from "../product-list/product-list";
import "./homepage.css";
const Homepage = ({ products, isSignedIn, user }) => {
	const currentUser = useSelector(selectCurrentUser);

	return (
		<>
			<div className="product-title">
				<h1>Products</h1>
				<div className="title-right">
					<select className="drop-down">
						<option>Last added</option>
						<option>Price: low to high</option>
						<option>Price: high to low</option>
					</select>
					{currentUser ? (
						<Link to="/create">
							<SubmitButton
								className="add-product"
								// onClick={clickAddProduct}
							>
								Add Product
							</SubmitButton>
						</Link>
					) : (
						<></>
					)}
				</div>
			</div>
			<ProductList products={products} isSignedIn={isSignedIn} user={user} />
			<div className="pagenation"></div>
		</>
	);
};

export default Homepage;
