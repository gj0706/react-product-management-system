import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import SubmitButton from "../submit-button/submit-button";
import "./error-page.css";
const Errorpage = () => {
	const navigate = useNavigate();
	// const location = useLocation();
	// const error = location.state.error;
	// console.log(error);
	const goHome = () => {
		navigate("/");
	};
	return (
		<>
			<Header />
			<div className="error-content-container" role="alert">
				<div className="product-title">
					<h1>Page Not Found</h1>
				</div>
				<div className="error-body">
					<span className="error-icon">!</span>
					{/* {error ? <h1>{error}</h1> : <h1>Something is wrong</h1>
					} */}
					<h1>Something went wrong</h1>
					{/* <pre>{error.message}</pre> */}
					<SubmitButton id="go-home-btn" onClick={goHome}>
						Go Home
					</SubmitButton>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Errorpage;
