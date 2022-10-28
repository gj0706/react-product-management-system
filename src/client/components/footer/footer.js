import { Outlet } from "react-router-dom";
import facebookSvg from "../../assets/icon-facebook.svg";
import twitterSvg from "../../assets/icon-twitter.svg";
import youtubeSvg from "../../assets/icon-youtube.svg";

import "./footer.css";
const Footer = () => {
	return (
		<footer className="footer">
			<div className="copy-right">
				<p>@2022 All Rights Reserved.</p>
			</div>
			<div className="social-icons">
				<a href="https://www.youtube.com">
					<img src={youtubeSvg} />
				</a>
				<a href="https://twitter.com">
					<img src={twitterSvg} />
				</a>
				<a href="https://www.facebook.com">
					<img src={facebookSvg} />
				</a>
			</div>
			<div className="contact-links">
				<a>Contact us</a>
				<a>Privacy policies</a>
				<a>Help</a>
			</div>
			<Outlet />
		</footer>
	);
};

export default Footer;
