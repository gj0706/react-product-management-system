import { useDispatch, useSelector } from "react-redux";
import {
	removeItemFromCart,
	addItemToCart,
	clearItemFromCart,
} from "../../actions/cart-action";
import { selectCartItems } from "../../../stores/cart-selector";



const ItemQuantity = ({cartItem}) => {
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem);

	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	const clearItemHandler = () => {
		dispatch(clearItemFromCart(cartItems, cartItem));


	return (
		<div className="item-quantity">
			<span onClick={addItemHandler}>&#43;</span>
			<span>{cartItem.quantity}</span>
			<span onClick={removeItemHandler}>-</span>
		</div>
	);
};

export default ItemQuantity;
