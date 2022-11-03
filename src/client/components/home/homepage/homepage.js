import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../stores/user-selector";
import { selectProducts } from "../../../stores/product-selector";
import SubmitButton from "../../submit-button/submit-button";
import CreateProductPage from "../create-product/create-product";
import ProductList from "../product-list/product-list";
import "./homepage.css";
const Homepage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const products = useSelector(selectProducts);
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
							<SubmitButton className="add-product">Add Product</SubmitButton>
						</Link>
					) : (
						<></>
					)}
				</div>
			</div>
			<ProductList products={products} />
			{/* <div className="pagenation">
				<span>
					<i class="fa-solid fa-angles-right"></i>
				</span>
				<span>2</span>
				<span>1</span>
				<span>
					<i class="fa-solid fa-angles-left"></i>
				</span>
			</div> */}
		</>
	);
};

export default Homepage;
