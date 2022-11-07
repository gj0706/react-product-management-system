import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import SubmitButton from "../submit-button/submit-button";
import "./error-page.css";
const Errorpage = ({ error }) => {
	const navigate = useNavigate();
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
					<h1>Oops, something went wrong!</h1>
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
