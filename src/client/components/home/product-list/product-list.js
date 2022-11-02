import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import ProductItem from "../product-item/product-item";
import "./product-list.css";

const ProductList = () => {
	const products = useSelector(selectProducts);
	console.log(products);
	const productList = Object.values(products).map((product) => {
		return <ProductItem product={product} key={product.id} />;
	});
	return <div className="product-list-container">{productList}</div>;
};

export default ProductList;
