import facebookSvg from "../../assets/facebook.svg";
import "./footer.css";
const Footer = () => {
	return (
		<footer className="footer">
			<div className="copy-right">
				<p>2022 All Rights Reserved.</p>
			</div>
			<div className="social-icons">
				<img src={facebookSvg} height="10 px" width="10 px" />
			</div>
			<div className="contact-links"></div>
		</footer>
	);
};

export default Footer;
