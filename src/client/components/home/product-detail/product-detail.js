import { useState, useEffect } from "react";
import Header from "../../header/header";
import CreateProductPage from "../create-product/create-product";
import Footer from "../../footer/footer";
import SubmitButton from "../../submit-button/submit-button";
import "./product-detail.css";

const ProductDetailPage = () => {
	return (
		<>
			<h1 className="detail-title">Products Detail</h1>
			<div className="detail-body">
				<div className="detail-container">
					<img
						href=""
						src="https://c1.neweggimages.com/ProductImage/A9CRS201110Gh7aF.jpg"
						alt="mac"
					></img>
				</div>
				<div className="product-info">
					<p>Caterogy 1</p>
					<h2>Apple MacBook Pro 15.4" Retina True Tone Laptop</h2>
					<h1>$299</h1>
					<p>
						Apple MacBook Pro 15.4" Retina True Tone Laptop (Touch Bar, 8th Gen
						6-Core Intel Core i7 2.60GHz, 16GB RAM, 1TB Flash, AMD Radeon Pro
						560X 4GB) Silver- A1990 (2018)
					</p>
					<div className="add-cancel">
						<SubmitButton
							className="add"
							//  onClick={submitProduct}
						>
							Add to cart
						</SubmitButton>
						<SubmitButton
							className="cancel"
							// onClick={handleCancel}
						>
							edit
						</SubmitButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetailPage;
