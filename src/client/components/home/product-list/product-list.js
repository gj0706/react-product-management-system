import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../stores/product-selector";
import ProductItem from "../product-item/product-item";
import "./product-list.css";

const ProductList = ({ selected }) => {
	const [page1Clicked, setPage1Clicked] = useState(false);
	const [page2Clicked, setPage2Clicked] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const products = useSelector(selectProducts);
	if (selected === "lastAdded") {
		products.sort((a, b) => a.valueOf() - b.valueOf());
	} else if (selected === "lowToHigh") {
		products.sort((a, b) => a.price - b.price);
	} else if (selected === "highToLow") {
		products.sort((a, b) => b.price - a.price);
	}
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

	// console.log(currentPage);
	const handlePage1Click = (e) => {
		setPage1Clicked(true);
		setPage2Clicked(false);
		setCurrentPage(1);
	};

	const handlePage2Click = (e) => {
		setPage2Clicked(true);
		setPage1Clicked(false);
		setCurrentPage(2);
	};

	const goToPrevPage = () => {
		if (currentPage === 2) {
			handlePage1Click();
			setCurrentPage(1);
		}
	};
	const goToNextPage = () => {
		if (currentPage === 1) {
			handlePage2Click();
			setCurrentPage(2);
		}
	};
	return (
		<div className="product-pagenation-container">
			{page1Clicked ? (
				<div className="product-list-container">{productList1}</div>
			) : page2Clicked ? (
				<div className="product-list-container">{productList2}</div>
			) : (
				<div className="product-list-container">{productList1}</div>
			)}

			<div className="pagenation">
				<a onClick={goToNextPage}>
					<i className="fa-solid fa-angles-right"></i>
				</a>
				<a
					onClick={handlePage2Click}
					className={page2Clicked && "page2-active"}
				>
					2
				</a>
				<a
					onClick={handlePage1Click}
					className={!page2Clicked ? "page1-active" : undefined}
				>
					1
				</a>
				<a onClick={goToPrevPage}>
					<i className="fa-solid fa-angles-left"></i>
				</a>
			</div>
		</div>
	);
};

export default ProductList;
