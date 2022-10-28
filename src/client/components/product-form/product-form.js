import SubmitButton from "../submit-button/submit-button";
const ProductForm = ({ name, type, ...otherProps }) => {
	return (
		<>
			<div className="form-container">
				<form className="create-product-form">
					<label>Product name</label>
					<input
						name="name"
						type="text"
						className="product-name"
						{...otherProps}
					/>
					<label>Product Description</label>
					<textarea className="textarea" name="description" />
					<div className="category-price">
						<div className="category">
							<label>Category</label>
							<select className="select-category">
								<option>Category1</option>
							</select>
						</div>
						<div className="price">
							<label>Price</label>
							<input type="text" name="price" {...otherProps} />
						</div>
					</div>

					<div className="instock-upload">
						<div className="instock">
							<label>In Stock Quantity</label>
							<input type="text" name="quantity" />
						</div>

						<div className="upload">
							<label>Add image Link</label>
							<input
								id="img-url"
								type="text"
								accept="image/*"
								placeholder="http://"
								name="imageUrl"
								{...otherProps}
							/>

							<input id="upload" type="submit" value="upload" />
						</div>
					</div>
					<div className="img-preview">
						<img id="prevImage" src="#" alt="your image" />
					</div>
					<div className="add-cancel">
						<SubmitButton className="add" {...otherProps}>
							Add
						</SubmitButton>
						<SubmitButton className="cancel" {...otherProps}>
							Cancel
						</SubmitButton>
					</div>
				</form>
			</div>
		</>

		// </div>
	);
};

export default ProductForm;
