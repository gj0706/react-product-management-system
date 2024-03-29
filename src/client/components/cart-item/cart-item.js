import { useDispatch, useSelector } from "react-redux";
import {
	removeItemFromCart,
	addItemToCart,
	clearItemFromCart,
	addItemToCartAsync,
	removeItemFromCartAsync,
	clearItemFromCartAsync,
} from "../../actions/cart-action";
import { selectCartItems } from "../../stores/cart-selector";
import { selectCurrentUser } from "../../stores/user-selector";
import "./cart-item.css";

const CartItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const currentUser = useSelector(selectCurrentUser);

	const addItemHandler = () => {
		if (currentUser) {
			dispatch(
				addItemToCartAsync(
					cartItems,
					cartItem,
					currentUser.id,
					currentUser.accessToken
				)
			);
		} else {
			dispatch(addItemToCart(cartItems, cartItem));
		}
	};

	const removeItemHandler = () => {
		if (currentUser) {
			dispatch(
				removeItemFromCartAsync(
					cartItems,
					cartItem,
					currentUser.id,
					currentUser.accessToken
				)
			);
		} else {
			dispatch(removeItemFromCart(cartItems, cartItem));
		}
	};
	const clearItemHandler = () => {
		if (currentUser) {
			dispatch(
				clearItemFromCartAsync(
					cartItems,
					cartItem,
					currentUser.id,
					currentUser.accessToken
				)
			);
		} else {
			dispatch(clearItemFromCart(cartItems, cartItem));
		}
	};

	return (
		<div className="cart-item-container">
			<img className="cart-img" src={cartItem.imageUrl} alt={cartItem.name} />
			<div className="item-details">
				<div className="name-price">
					<span>{cartItem.name}</span>
					<span>${cartItem.price}</span>
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
