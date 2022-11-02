import CartItemList from "../cart-item-list/cart-item-list";
import SubmitButton from "../submit-button/submit-button";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../actions/cart-action";
import {
	selectIsCartOpen,
	selectCartTotal,
	selectCartCount,
} from "../../stores/cart-selector";
import "./cart-modal.css";
const CartModal = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartTotal = useSelector(selectCartTotal);
	const cartCount = useSelector(selectCartCount);

	const tax = parseInt(cartTotal * 0.08).toFixed(2);
	const estimatedTotal = (cartTotal + parseInt(tax)).toFixed(2);
	const closeModal = () => {
		dispatch(setIsCartOpen(false));
	};
	return (
		<div
			className="cart-modal-container"
			style={{ display: isCartOpen ? "block" : "none" }}
		>
			<div className="cart-modal-content">
				<div className="cart-modal-title">
					<h2>
						Cart<span id="total-items">({cartCount})</span>
					</h2>
					<span className="cart-close" onClick={closeModal}>
						&times;
					</span>
				</div>
				<CartItemList />
				<div className="coupon-input">
					<input name="coupon" />
					<SubmitButton id="apply-coupon">Apply</SubmitButton>
				</div>
				<hr />
				<div className="price-table">
					<table>
						<tbody>
							<tr>
								<td>Subtotal</td>
								<td align="right">${cartTotal.toFixed(2)}</td>
							</tr>
							<tr>
								<td>Tax</td>
								<td align="right">${tax}</td>
							</tr>
							<tr>
								<td>Discount</td>
								<td align="right">$0</td>
							</tr>
							<tr>
								<td>Estimated total</td>
								<td align="right">${estimatedTotal}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="check-out-btn">
					<SubmitButton id="check-out">Continue to check out</SubmitButton>
				</div>
			</div>
		</div>
	);
};
export default CartModal;
