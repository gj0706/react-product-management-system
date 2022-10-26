import { useState } from "react";
import { ContextExclusionPlugin } from "webpack";
import SubmitButton from "../../submit-button/submit-button";
import CreateProductPage from "../create-product/create-product";
import "./product-item.css";
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
	const addProductToCart = () => {};

	const editProduct = (e) => {
		const productToBeEdited = products[e.currentTarget.id];

		clickEditProduct();
		console.log(productToBeEdited);
		setEditedProduct(productToBeEdited);
		console.log(editedProduct);
	};

	return (
		<div className="item-container">
			<img className="item-img" src={imageUrl} alt={`${name}`} />
			{/* <div className="item-info"> */}
			<p id="item-name">{name}</p>
			<p id="item-price">{price}</p>
			{/* </div> */}
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
