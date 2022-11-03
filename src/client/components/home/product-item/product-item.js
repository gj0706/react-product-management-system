import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../stores/user-selector";
import {
	removeItemFromCart,
	addItemToCart,
	clearItemFromCart,
} from "../../../actions/cart-action";
import { selectCartItems } from "../../../stores/cart-selector";

import { selectProducts } from "../../../stores/product-selector";
import SubmitButton from "../../submit-button/submit-button";
import CreateProductPage from "../create-product/create-product";
import "./product-item.css";
import ProductDetailPage from "../product-detail/product-detail";

const ProductItem = ({ product }) => {
	// const [currentItem, setCurrentItem] = useState({});
	const navigate = useNavigate();
	const currentUser = useSelector(selectCurrentUser);
	const cartItems = useSelector(selectCartItems);
	const { id, name, price, imageUrl } = product;
	const dispatch = useDispatch();

	const getCurrentItem = () => {
		for (let i = 0; i < cartItems.length; i++) {
			if (cartItems[i].id === id) {
				const newItem = cartItems[i];
				return newItem;
			}
		}
	};

	const currentItem = getCurrentItem();

	const addItemHandler = () => dispatch(addItemToCart(cartItems, product));

	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, product));

	const clearItemHandler = () => {
		dispatch(clearItemFromCart(cartItems, product));
		// setClicked(false);
	};
	return (
		<div className="item-container">
			<Link
				className="item-link"
				to={`/detail/${id}`}
				// state={{
				// 	from: {
				// 		id: product.id,
				// 		name: product.name,
				// 		price: product.price,
				// 		quantity: product.quantity,
				// 		description: product.description,
				// 		imageUrl: product.imageUrl,
				// 	},
				// }}
			>
				<img
					id={`${name}-${product.id}`}
					className="item-img"
					src={imageUrl}
					alt={name}
					// onClick={showProductDetail}
				/>
			</Link>

			<p id="item-name">{name}</p>
			<p id="item-price">${price}</p>
			<div className="item-btn-container">
				{currentItem ? (
					<div className="item-quantity">
						<span onClick={addItemHandler}>&#43;</span>
						<span>{currentItem.quantity}</span>
						<span onClick={removeItemHandler}>-</span>
					</div>
				) : (
					<SubmitButton className="add-item-btn" onClick={addItemHandler}>
						Add
					</SubmitButton>
				)}

				{currentUser && (
					<Link to={`/edit/${product.id}`}>
						<SubmitButton className="edit-btn">Edit</SubmitButton>
					</Link>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
