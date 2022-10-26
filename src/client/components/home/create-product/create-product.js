import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SubmitButton from "../../submit-button/submit-button";
import "./create-product.css";

const initialState = {
	name: "",
	price: "",
	imageUrl: "",
	description: "",
	quantity: "",
};

const CreateProductPage = (setAddClicked) => {
	const [product, setProduct] = useState(initialState);
	const resetForm = () => setProduct(initialState);
	const changeHandler = (event) => {
		const newProduct = {
			...product,
			[event.target.name]: event.target.value,
		};
		setProduct(newProduct);
		// console.log(product);
	};

	const id = uuidv4();
	console.log(id);
	const newProduct = { ...product, id: id };
	// const newFields = changeHandler();

	const addProduct = async () => {
		try {
			let response = await fetch("/addProduct", {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify(newProduct),
			});
			let result = await response.json();
			console.log(result);
			if (response.status === 200) {
				resetForm();

				// console.log("Signed in successfully");
			} else {
				console.log("Some error occured");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const submitProduct = (e) => {
		e.preventDefault();
		addProduct();
	};
	// async () => {
	// 	const response = await fetch("/addProduct", {});
	// };
	const handleCancel = (e) => {
		e.preventDefault();
		setAddClicked(false);
	};

	return (
		<>
			<h1 className="create-product-title">Create Product</h1>
			<div className="form-container">
				<form className="create-product-form">
					<label>Product name</label>
					<input
						name="name"
						type="text"
						className="product-name"
						onChange={changeHandler}
						value={product.name}
						required
					/>
					<label>Product Description</label>
					<textarea
						className="textarea"
						name="description"
						onChange={changeHandler}
						value={product.description}
						required
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
								required
							/>
						</div>
					</div>

					<div className="instock-upload">
						<div className="instock">
							<label>In Stock Quantity</label>
							<input
								type="text"
								required
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
								required
							/>

							<input id="upload" type="submit" />
						</div>
					</div>
					<div className="img-preview">
						<img id="prevImage" src="#" alt="your image" />
					</div>
					<div className="add-cancel">
						<SubmitButton className="add" onClick={submitProduct}>
							Add
						</SubmitButton>
						<SubmitButton className="cancel" onClick={handleCancel}>
							Cancel
						</SubmitButton>
					</div>
				</form>
			</div>
		</>

		// </div>
	);
};

export default CreateProductPage;
