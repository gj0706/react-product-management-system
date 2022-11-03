import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removeItemFromCart,
	addItemToCart,
	clearItemFromCart,
} from "../../actions/cart-action";
import { selectCartItems } from "../../stores/cart-selector";
import "./cart-item.css";

const CartItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));

	return (
		<div className="cart-item-container">
			<img className="cart-img" src={cartItem.imageUrl} alt={cartItem.name} />
			<div className="item-details">
				<div className="name-price">
					<span>{cartItem.name}</span>
					<span>{cartItem.price}</span>
				</div>
				<div className="quantity-remove">
					<div className="item-quantity">
						<span onClick={addItemHandler}>&#43;</span>
						<span>{cartItem.quantity}</span>
						<span onClick={removeItemHandler}>-</span>
					</div>
					<div className="item-remove">
						<p onClick={clearItemHandler}>Remove</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
