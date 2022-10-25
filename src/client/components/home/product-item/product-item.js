import SubmitButton from "../../submit-button/submit-button";
import "./product-item.css";
const ProductItem = ({ name, price, imageUrl, isSignedIn }) => {
	const addProductToCart = () => {};
	const editProduct = () => {};
	return (
		<div className="item-container">
			<img className="item-img" src={imageUrl} alt={`${name}`} />
			{/* <div className="item-info"> */}
			<p id="item-name">{name}</p>
			<p id="item-price">{price}</p>
			{/* </div> */}
			<div className="item-btn-container">
				<SubmitButton className="add-item-btn" onClick={addProductToCart}>
					Add
				</SubmitButton>
				{isSignedIn && (
					<SubmitButton className="edit-btn" onClick={editProduct}>
						Edit
					</SubmitButton>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
