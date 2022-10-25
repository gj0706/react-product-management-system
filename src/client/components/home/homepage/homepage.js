import SubmitButton from "../../submit-button/submit-button";
import ProductList from "../product-list/product-list";
import "./homepage.css";
const Homepage = ({ products, isSignedIn }) => {
	const addProduct = () => {};
	return (
		<div className="homepage-container">
			<div className="product-title">
				<h1>Products</h1>
				<div className="title-right">
					<select className="drop-down">
						<option>Last added</option>
						<option>Price: low to high</option>
						<option>Price: high to low</option>
					</select>
					<SubmitButton className="add-product" onClick={addProduct}>
						Add Product
					</SubmitButton>
				</div>
			</div>

			<ProductList products={products} />

			<div className="pagenation"></div>
		</div>
	);
};

export default Homepage;
