import { useState } from "react";
import CartModal from "../cart-modal/cart-modal";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../actions/cart-action";
import {
	selectIsCartOpen,
	selectCartCount,
	selectCartTotal,
} from "../../stores/cart-selector";
import "./cart.css";
const Cart = () => {
	const dispatch = useDispatch();
	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartTotal = useSelector(selectCartTotal);
	const subTotal = (cartTotal * 1.08).toFixed(2);
	const openModal = () => {
		dispatch(setIsCartOpen(true));
	};

	return (
		<>
			<div className="shopping-cart">
				<i
					className="fa-solid fa-cart-shopping"
					id="cart-icon"
					onClick={openModal}
				>
					{" "}
				</i>
				{cartCount !== 0 && <span className="cart-count">{cartCount}</span>}

				<span id="cart-text">${subTotal}</span>
			</div>
			{isCartOpen && <CartModal />}
		</>
	);
};

export default Cart;
