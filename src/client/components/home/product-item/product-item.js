import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
	console.log(description);
	return (
		<div className="item-container">
			<Link
				className="item-link"
				to={"detail"}
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
				<img
					id={`${name}-${id}`}
					className="item-img"
					src={imageUrl}
					alt={name}
					// onClick={showProductDetail}
				/>
			</Link>

			<p id="item-name">{name}</p>
			<p id="item-price">{price}</p>
			<div className="item-btn-container">
				<SubmitButton className="add-item-btn" onClick={addProductToCart}>
					Add
				</SubmitButton>
				{isSignedIn && (
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
							className="edit-btn"
							id={id}
							//  onClick={handleOnclick}
						>
							Edit
						</SubmitButton>
					</Link>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
