import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import SubmitButton from "../../submit-button/submit-button";
import "./create-product.css";
import ajaxConfigHelper from "../../../api/api";
import { selectCurrentUser } from "../../../stores/user-selector";

const initialState = {
	name: "",
	price: "",
	imageUrl: "",
	description: "",
	quantity: "",
};

const CreateProductPage = () => {
	const [product, setProduct] = useState(initialState);
	const resetForm = () => setProduct(initialState);
	const [showImage, setShowImage] = useState(false);
	const currentUser = useSelector(selectCurrentUser);
	const token = currentUser.accessToken;
	const navigate = useNavigate();

	// const { id, name, price, quantity, imageUrl, description } = editedProduct;
	const changeHandler = (event) => {
		const newProduct = {
			...product,
			[event.target.name]: event.target.value,
		};
		setProduct(newProduct);
		// console.log(product);
	};
	const uniqId = uuidv4();
	const newProduct = { ...product, id: uniqId };
	// const newFields = changeHandler();

	const addProduct = async () => {
		try {
			let response = await fetch(
				"/addProduct",
				ajaxConfigHelper(
					newProduct,
					"POST",
					new Headers({
						token: `Bearer ${token}`,
						"content-type": "application/json",
					})
				)
			);
			let result = await response.json();
			console.log(result);
			if (response.status === 200) {
				resetForm();
				navigate("/");

				console.log("Product created successfully");
			} else if (response.status === 400) {
				navigate("/*");
				console.log("Some error occured");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const submitProduct = (e) => {
		e.preventDefault();
		addProduct();
		resetForm();
	};

	const addImage = (e) => {
		e.preventDefault();
		setShowImage(true);
	};

	return (
		<>
			<Header />
			<div className="edit-product-container">
				<h1 className="product-title">Create Product</h1>
				<div className="form-container">
					<form className="create-product-form">
						<label>Product name</label>
						<input
							name="name"
							type="text"
							className="product-name"
							onChange={changeHandler}
							value={product.name}
							// required
						/>
						<label>Product Description</label>
						<textarea
							className="textarea"
							name="description"
							onChange={changeHandler}
							value={product.description}
							// required
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
									value={product.price}
									onChange={changeHandler}
									// required
								/>
							</div>
						</div>

						<div className="instock-upload">
							<div className="instock">
								<label>In Stock Quantity</label>
								<input
									type="text"
									// required
									name="quantity"
									value={product.quantity}
									onChange={changeHandler}
								/>
							</div>

							<div className="upload">
								<label>Add image Link</label>
								<input
									id="img-url"
									type="text"
									value={product.imageUrl}
									accept="image/*"
									placeholder="http://"
									name="imageUrl"
									onChange={changeHandler}
									// required
								/>
								<button id="upload" onClick={addImage}>
									upload
								</button>
							</div>
						</div>
						<div className="img-preview">
							{showImage ? (
								<img id="prevImage" src={product.imageUrl} alt="your image" />
							) : (
								<div></div>
							)}
						</div>
						<div className="add-cancel">
							<SubmitButton className="add" onClick={submitProduct}>
								Add
							</SubmitButton>
							<Link to="/">
								<SubmitButton className="edit-btn" id="create-cancel">
									Cancel
								</SubmitButton>
							</Link>
						</div>
					</form>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default CreateProductPage;
