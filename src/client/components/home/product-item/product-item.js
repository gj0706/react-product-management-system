import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../stores/user-selector";
import {
	removeItemFromCart,
	addItemToCart,
} from "../../../actions/cart-action";
import { selectCartItems } from "../../../stores/cart-selector";
import SubmitButton from "../../submit-button/submit-button";
import "./product-item.css";

const ProductItem = ({ product }) => {
	const currentUser = useSelector(selectCurrentUser);
	const cartItems = useSelector(selectCartItems);
	const { id, name, price, imageUrl } = product;
	const dispatch = useDispatch();
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === product.id
	);

	const addItemHandler = () => {
		dispatch(
			addItemToCart(cartItems, product, currentUser.id, currentUser.accessToken)
		);
	};

	const removeItemHandler = () =>
		dispatch(
			removeItemFromCart(
				cartItems,
				product,
				currentUser.id,
				currentUser.accessToken
			)
		);

	return (
		<div className="item-container">
			<Link className="item-link" to={`/detail/${id}`}>
				<img
					id={`${name}-${product.id}`}
					className="item-img"
					src={imageUrl}
					alt={name}
				/>
			</Link>

			<p id="item-name">{name}</p>
			<p id="item-price">${price}</p>
			<div className="item-btn-container">
				{existingCartItem ? (
					<div className="item-quantity">
						<span onClick={addItemHandler}>&#43;</span>
						<span>{existingCartItem.quantity}</span>
						<span onClick={removeItemHandler}>-</span>
					</div>
				) : (
					<SubmitButton className="add-item-btn" onClick={addItemHandler}>
						Add
					</SubmitButton>
				)}

				{!(currentUser === null || currentUser.type === "USER") && (
					<Link to={`/edit/${product.id}`}>
						<SubmitButton className="edit-btn">Edit</SubmitButton>
					</Link>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
