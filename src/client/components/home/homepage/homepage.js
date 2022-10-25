import SubmitButton from "../../submit-button/submit-button";
import CreateProductPage from "../create-product/create-product";
import ProductList from "../product-list/product-list";
import "./homepage.css";
const Homepage = ({ products, isSignedIn, addClicked, setAddClicked }) => {
	const addProduct = () => {
		setAddClicked(true);
	};
	return (
		<>
			{addClicked ? (
				<CreateProductPage setAddClicked={setAddClicked} />
			) : (
				<div className="homepage-container">
					<div className="product-title">
						<h1>Products</h1>
						<div className="title-right">
							<select className="drop-down">
								<option>Last added</option>
								<option>Price: low to high</option>
								<option>Price: high to low</option>
							</select>
							{isSignedIn && (
								<SubmitButton className="add-product" onClick={addProduct}>
									Add Product
								</SubmitButton>
							)}
						</div>
					</div>
					<ProductList products={products} isSignedIn={isSignedIn} />
					<div className="pagenation"></div>
				</div>
			)}
		</>
	);
};

export default Homepage;
