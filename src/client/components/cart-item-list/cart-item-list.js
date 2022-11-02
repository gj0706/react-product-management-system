import { useSelector } from "react-redux";
import { selectCartItems } from "../../stores/cart-selector";
import CartItem from "../cart-item/cart-item";

const CartItemList = () => {
	const cartItems = useSelector(selectCartItems);
	return (
		<>
			{cartItems.length ? (
				cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
			) : (
				<h2>Your cart is empty</h2>
			)}
		</>
	);
};

export default CartItemList;
