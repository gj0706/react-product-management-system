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
	const [selected, setSelected] = useState("");
	const currentUser = useSelector(selectCurrentUser);
	const products = useSelector(selectProducts);
	const options = [
		{ value: "lastAdded", text: "Last added" },
		{ value: "lowToHigh", text: "Price: low to high" },
		{ value: "highToLow", text: "Price: high to low" },
	];

	const handleChange = (event) => {
		setSelected(event.target.value);
	};

	return (
		<>
			<div className="home-page-container">
				<div className="product-title">
					<h1>Products</h1>
					<div className="title-right">
						<select
							className="drop-down"
							value={selected}
							onChange={handleChange}
						>
							{options.map((option) => (
								<option key={option.value} value={option.value}>
									{option.text}
								</option>
							))}
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
				<ProductList products={products} selected={selected} />
			</div>
		</>
	);
};

export default Homepage;
