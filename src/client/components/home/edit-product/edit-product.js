import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import ProductForm from "../../product-form/product-form";
import SubmitButton from "../../submit-button/submit-button";
import ajaxConfigHelper from "../../../api/api";
import "./edit-product.css";
import { selectCurrentUser } from "../../../stores/user-selector";

const initialState = {
	id: "",
	name: "",
	price: "",
	imageUrl: "",
	description: "",
	quantity: "",
};

const EditProductPage = () => {
	const products = useSelector(selectProducts);
	const [newProduct, setNewProduct] = useState(initialState);
	const [showImage, setShowImage] = useState(false);
	const currentUser = useSelector(selectCurrentUser);
	const token = currentUser.accessToken;
	const location = useLocation();
	const navigate = useNavigate();
	const { pId } = useParams();
	// const oldProduct = location.state.from;
	const oldProduct = products.filter((ele) => ele.id === pId)[0];
	const { id, name, price, quantity, imageUrl, description } = oldProduct;

	// const resetForm = () => setNewProduct(initialState);

	const changeHandler = (event) => {
		const product = {
			...oldProduct,
			[event.target.name]: event.target.value,
		};
		console.log(event.target.value);

		setNewProduct(product);
	};

	console.log(newProduct);

	const goBack = () => {
		navigate(-1);
	};

	const updateProduct = async () => {
		try {
			let response = await fetch(
				"/updateProduct",
				ajaxConfigHelper(
					{
						id: id,
						name: newProduct.name,
						price: newProduct.price,
						quantity: newProduct.quantity,
						imageUrl: newProduct.imageUrl,
						description: newProduct.description,
					},
					"PUT",
					new Headers({
						token: `Bearer ${token}`,
						"content-type": "application/json",
					})
				)
			);
			let result = await response.json();
			console.log(result);
			if (response.status === 200) {
				console.log("Successfully updated product info");
				goBack();
			} else if (response.status === 400) {
				console.log("Some error occured");
			}
		} catch (err) {
			console.log(err);
		}
	};
	const addImage = (e) => {
		e.preventDefault();
		setShowImage(true);
	};
	const submitUpdate = (e) => {
		e.preventDefault();
		updateProduct();
	};

	return (
		<>
			<Header />
			<h1 className="product-title">Edit Product</h1>
			<div className="form-container">
				<form className="create-product-form" onSubmit={submitUpdate}>
					<label>Product name</label>
					<input
						name="name"
						type="text"
						className="product-name"
						onChange={changeHandler}
						defaultValue={oldProduct.name}
					/>
					<label>Product Description</label>
					<textarea
						className="textarea"
						name="description"
						onChange={changeHandler}
						defaultValue={oldProduct.description}
					/>
					<div className="category-price">
						<div className="category">
							<label>Category</label>
							<select className="select-category">
								<option>Category1</option>
							</select>
						</div>
						<div className="price">
							<label>Price</label>
							<input
								type="text"
								name="price"
								defaultValue={oldProduct.price}
								onChange={changeHandler}
							/>
						</div>
					</div>

					<div className="instock-upload">
						<div className="instock">
							<label>In Stock Quantity</label>
							<input
								type="text"
								name="quantity"
								defaultValue={oldProduct.quantity}
								onChange={changeHandler}
							/>
						</div>

						<div className="upload">
							<label>Add image Link</label>
							<input
								id="img-url"
								type="text"
								accept="image/*"
								placeholder="http://"
								name="imageUrl"
								defaultValue={oldProduct.imageUrl}
								onChange={changeHandler}
							/>

							<button id="upload" onClick={addImage}>
								upload
							</button>
						</div>
					</div>
					<div className="img-preview">
						{showImage ? (
							<img id="prevImage" src={oldProduct.imageUrl} alt="your image" />
						) : (
							<div></div>
						)}
					</div>
					<div className="add-cancel">
						<SubmitButton className="add" type="submit">
							Submit
						</SubmitButton>
						{/* <Link to={"/"}> */}
						<SubmitButton
							type="button"
							className="edit-btn"
							id="edit-cancel"
							onClick={goBack}
						>
							Cancel
						</SubmitButton>
						{/* </Link> */}
					</div>
				</form>
			</div>
			<Footer />
		</>

		// </div>
	);
};

export default EditProductPage;
