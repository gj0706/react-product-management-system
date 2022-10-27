import { useState, useEffect, useCallback } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";
import { ContextExclusionPlugin } from "webpack";
import SubmitButton from "../../submit-button/submit-button";
import CreateProductPage from "../create-product/create-product";
import "./product-item.css";
import ProductDetailPage from "../product-detail/product-detail";
const ProductItem = ({
	id,
	name,
	price,
	description,
	quantity,
	products,
	imageUrl,
	isSignedIn,
	setAddClicked,
	setEditClicked,
	clickEditProduct,
	editedProduct,
	setEditedProduct,
}) => {
	const navigate = useNavigate();
	const addProductToCart = () => {};
	const showProductDetail = useCallback(
		() => navigate("/sample", { replace: true }),
		[navigate]
	);

	const editProduct = (e) => {
		e.preventDefault();

		const productToBeEdited = products[e.currentTarget.id];

		console.log(productToBeEdited);

		setEditedProduct((prev) => {
			return { ...prev, ...productToBeEdited };
		});
		// console.log(editedProduct);
		clickEditProduct();
	};

	return (
		<div className="item-container">
			<img
				id={`${name}-${id}`}
				className="item-img"
				src={imageUrl}
				alt={name}
				onClick={showProductDetail}
			/>
			<p id="item-name">{name}</p>
			<p id="item-price">{price}</p>
			<div className="item-btn-container">
				<SubmitButton className="add-item-btn" onClick={addProductToCart}>
					Add
				</SubmitButton>
				{isSignedIn && (
					<SubmitButton className="edit-btn" onClick={editProduct} id={id}>
						Edit
					</SubmitButton>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
