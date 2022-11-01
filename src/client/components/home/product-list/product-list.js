import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import ProductItem from "../product-item/product-item";
import "./product-list.css";

const ProductList = () => {
	const products = useSelector(selectProducts);

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
				/>
			);
		}
	);
	return <div className="product-list-container">{productList}</div>;
};

export default ProductList;
