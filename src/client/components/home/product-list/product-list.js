import { useEffect, useState } from "react";
import ProductItem from "../product-item/product-item";
import "./product-list.css";

const ProductList = ({ products, isSignedIn, user }) => {
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
					description={description}
					imageUrl={imageUrl}
					isSignedIn={isSignedIn}
					user={user}
				/>
			);
		}
	);
	return <div className="product-list-container">{productList}</div>;
};

export default ProductList;
