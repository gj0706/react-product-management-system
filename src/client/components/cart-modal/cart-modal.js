import CartItemList from "../cart-item-list/cart-item-list";
import SubmitButton from "../submit-button/submit-button";
import "./cart-modal.css";
const CartModal = ({ cartModalOn, setCartModalOn }) => {
	const closeModal = () => {
		setCartModalOn((cartModalOn = !cartModalOn));
	};
	return (
		<div
			className="cart-modal-container"
			style={{ display: cartModalOn ? "block" : "none" }}
		>
			<div className="cart-modal-content">
				<div className="cart-modal-title">
					<h2>
						Cart<span id="total-items">(3)</span>
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
								<td align="right">$499</td>
							</tr>
							<tr>
								<td>Tax</td>
								<td align="right">$49.9</td>
							</tr>
							<tr>
								<td>Discount</td>
								<td align="right">$410</td>
							</tr>
							<tr>
								<td>Estimated total</td>
								<td align="right">$429.10</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
export default CartModal;
