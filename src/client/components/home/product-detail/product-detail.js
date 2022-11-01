import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import Header from "../../header/header";
import CreateProductPage from "../create-product/create-product";
import Footer from "../../footer/footer";
import SubmitButton from "../../submit-button/submit-button";
import "./product-detail.css";

const ProductDetailPage = () => {
	const products = useSelector(selectProducts);

	const location = useLocation();
	console.log(location.state.from);
	const { id, name, price, quantity, imageUrl, description } =
		location.state.from;
	// console.log(name);
	return (
		<>
			<Header />
			<h1 className="detail-title">Product Detail</h1>
			<div className="detail-body">
				<div className="detail-container">
					<img className="detail-image" href="" src={imageUrl} alt={name}></img>
				</div>
				<div className="product-info">
					<p>Caterogy 1</p>
					<h2>{name}</h2>
					<h1>{price}</h1>
					<p>{name}</p>
					<div className="add-cancel">
						<SubmitButton
							className="add"
							//  onClick={submitProduct}
						>
							Add to cart
						</SubmitButton>
						<Link
							to="/edit"
							state={{
								from: {
									id: id,
									name: name,
									price: price,
									quantity: quantity,
									description: description,
									imageUrl: imageUrl,
								},
							}}
						>
							<SubmitButton
								className="edit"
								// onClick={handleCancel}
							>
								edit
							</SubmitButton>
						</Link>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ProductDetailPage;
