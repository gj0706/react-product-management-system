import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import {
	removeItemFromCart,
	addItemToCart,
	clearItemFromCart,
} from "../../../actions/cart-action";
import { selectCurrentUser } from "../../../stores/user-selector";
import { selectCartItems } from "../../../stores/cart-selector";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SubmitButton from "../../submit-button/submit-button";
import "./product-detail.css";

const ProductDetailPage = () => {
	const products = useSelector(selectProducts);
	const cartItems = useSelector(selectCartItems);
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pId } = useParams();
	const product = products.filter((ele) => ele.id === pId)[0];

	const { id, name, price, quantity, imageUrl, description } = product;

	const getCurrentItem = () => {
		for (let i = 0; i < cartItems.length; i++) {
			if (cartItems[i].id === id) {
				const newItem = cartItems[i];
				return newItem;
			}
		}
	};

	const currentItem = getCurrentItem();

	const addItemHandler = () =>
		dispatch(
			addItemToCart(cartItems, product, currentUser.id, currentUser.accessToken)
		);

	const removeItemHandler = () =>
		dispatch(
			removeItemFromCart(
				cartItems,
				product,
				currentUser.id,
				currentUser.accessToken
			)
		);

	const clearItemHandler = () => {
		dispatch(
			clearItemFromCart(
				cartItems,
				product,
				currentUser.id,
				currentUser.accessToken
			)
		);
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<>
			<Header />
			<div className="product-detail-container">
				<h1 className="product-title">Product Detail</h1>
				<SubmitButton className="edit-btn" id="go-back-btn" onClick={goBack}>
					Go back
				</SubmitButton>
				<div className="detail-body">
					<div className="image-container">
						<img
							className="detail-image"
							href=""
							src={imageUrl}
							alt={name}
						></img>
					</div>
					<div className="product-info">
						<p>Caterogy 1</p>
						<h2>{name}</h2>
						<h1>{price}</h1>
						{product.quantity === "0" && (
							<div className="out-of-stock">Out of Stock</div>
						)}

						<p>{description}</p>
						<div className="add-edit-btns">
							{currentItem ? (
								<div className="item-quantity" id="item-quantity">
									<span onClick={addItemHandler}>&#43;</span>
									<span>{currentItem.quantity}</span>
									<span onClick={removeItemHandler}>-</span>
								</div>
							) : (
								<SubmitButton
									className="add-item-btn"
									id="add-item-btn"
									onClick={addItemHandler}
								>
									Add to cart
								</SubmitButton>
							)}
							{!(currentUser === null || currentUser.type === "USER") && (
								<Link className="link-to-detail" to={`/edit/${product.id}`}>
									<SubmitButton className="edit-btn" id="detail-btn">
										edit
									</SubmitButton>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default ProductDetailPage;
