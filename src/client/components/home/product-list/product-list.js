import { useEffect, useState } from "react";
import ProductItem from "../product-item/product-item";
import "./product-list.css";

const ProductList = ({ products }) => {
	// const { id, price, imageUrl, description } = props;
	const productList = Object.values(products).map(
		({ id, price, imageUrl, description }) => {
			return (
				<ProductItem
					key={id}
					name={description.split(",")[0]}
					price={"$" + `${price}`}
					imageUrl={imageUrl}
				/>
			);
		}
	);
	return <div className="product-list-container">{productList}</div>;
};

export default ProductList;
