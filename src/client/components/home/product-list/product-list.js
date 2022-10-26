import { useEffect, useState } from "react";
import ProductItem from "../product-item/product-item";
import "./product-list.css";

const ProductList = ({
	products,
	isSignedIn,
	setAddClicked,
	clickEditProduct,
	editedProduct,
	setEditedProduct,
}) => {
	const productList = Object.values(products).map(
		({ id, name, price, quantity, imageUrl, description }) => {
			return (
				<ProductItem
					products={products}
					key={`${name}-${id}`}
					id={id}
					name={name}
					price={"$" + `${price}`}
					quantity={quantity}
					imageUrl={imageUrl}
					isSignedIn={isSignedIn}
					setAddClicked={setAddClicked}
					clickEditProduct={clickEditProduct}
					editedProduct={editedProduct}
					setEditedProduct={setEditedProduct}
				/>
			);
		}
	);
	return <div className="product-list-container">{productList}</div>;
};

export default ProductList;
