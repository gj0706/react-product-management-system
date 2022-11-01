import "./cart-item.css";

const CartItem = () => {
	// const { name, imageUrl, price, quantity } = cartItem;
	return (
		<div className="cart-item-container">
			<img
				src="https://c1.neweggimages.com/ProductImageCompressAll300/34-155-806-01.jpg"
				alt="img"
			/>
			<div className="item-details">
				<div className="name-price">
					<span>product</span>
					<span>$999</span>
				</div>
				<div className="quantity-remove">
					<div className="item-quantity">
						<span>+</span>
						<span>1</span>
						<span>-</span>
					</div>
					<div className="item-remove">
						<p>Remove</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
