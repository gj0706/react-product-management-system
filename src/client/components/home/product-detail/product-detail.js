import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import {
	removeItemFromCart,
	addItemToCart,
	clearItemFromCart,
} from "../../../actions/cart-action";
import { selectCartItems } from "../../../stores/cart-selector";
import Header from "../../header/header";
import CreateProductPage from "../create-product/create-product";
import Footer from "../../footer/footer";
import SubmitButton from "../../submit-button/submit-button";
import "./product-detail.css";

const ProductDetailPage = () => {
	const products = useSelector(selectProducts);
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();
	const location = useLocation();
	const product = location.state.from;

	const { id, name, price, quantity, imageUrl, description } =
		location.state.from;

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
					<div className="add-edit-btns">
						{currentItem ? (
							<div className="item-quantity" id="item-quantity">
								<span onClick={addItemHandler}>&#43;</span>
								<span>{currentItem.quantity}</span>
								<span onClick={removeItemHandler}>-</span>
							</div>
						) : (
							<SubmitButton className="add-item-btn" onClick={addItemHandler}>
								Add to cart
							</SubmitButton>
						)}
						<Link
							className="link-to-detail"
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
								id="detail-btn"
								// className="edit"
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
