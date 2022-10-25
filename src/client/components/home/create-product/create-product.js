import { useState } from "react";
import SubmitButton from "../../submit-button/submit-button";
import "./create-product.css";
const CreateProductPage = (setAddClicked) => {
	const handleCancel = () => {
		setAddClicked(false);
	};
	return (
		// <div className="create-product-container">
		<>
			<h1 className="create-product-title">Create Product</h1>
			<div className="form-container">
				<form className="create-product-form">
					<label>Product name</label>
					<input type="text" className="product-name" />
					<label>Product Description</label>
					<textarea className="textarea" />
					<div className="category-price">
						<div className="category">
							<label>Category</label>
							<select className="select-category">
								<option>Category1</option>
							</select>
						</div>
						<div className="price">
							<label>Price</label>
							<input type="text" />
						</div>
					</div>

					<div className="instock-upload">
						<div className="instock">
							<label>In Stock Quantity</label>
							<input type="text" />
						</div>

						<div className="upload">
							<label>Add image Link</label>
							<input
								id="img-url"
								type="text"
								accept="image/*"
								placeholder="htp://"
							/>
							{/* <span>
									<SubmitButton className="upload-btn">Upload</SubmitButton>
								</span> */}
							<input id="upload" type="submit" value="upload" />
						</div>
					</div>
					<div className="img-preview">
						<img id="prevImage" src="#" alt="your image" />
					</div>
					<div className="add-cancel">
						<SubmitButton className="add-product">Add Product</SubmitButton>
						<SubmitButton className="add-product" onClick={handleCancel}>
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
