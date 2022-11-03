import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import ProductItem from "../product-item/product-item";
import "./product-list.css";

const ProductList = () => {
	const [page1Clicked, setPage1Clicked] = useState(false);
	const [page2Clicked, setPage2Clicked] = useState(false);
	const products = useSelector(selectProducts);
	console.log(products);
	const productList1 = Object.values(products)
		.slice(0, 10)
		.map((product) => {
			return <ProductItem product={product} key={product.id} />;
		});

	const productList2 = Object.values(products)
		.slice(10)
		.map((product) => {
			return <ProductItem product={product} key={product.id} />;
		});

	const handlePage1Click = (e) => {
		setPage1Clicked(true);
		setPage2Clicked(false);
	};

	const handlePage2Click = (e) => {
		setPage2Clicked(true);
		setPage1Clicked(false);
	};
	return (
		<>
			{page1Clicked ? (
				<div className="product-list-container">{productList1}</div>
			) : page2Clicked ? (
				<div className="product-list-container">{productList2}</div>
			) : (
				<div className="product-list-container">{productList1}</div>
			)}

			<div className="pagenation">
				<span>
					<i class="fa-solid fa-angles-right"></i>
				</span>
				<span onClick={handlePage2Click}>2</span>
				<span onClick={handlePage1Click}>1</span>
				<span>
					<i class="fa-solid fa-angles-left"></i>
				</span>
			</div>
		</>
	);
};

export default ProductList;
