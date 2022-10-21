import Header from "./components/header/header";
// import Signin from "./components/sign-in-modal/sign-in-modal";
import Footer from "./components/footer/footer";
import SignInModalContent from "./components/sign-in-modal-content/sign-in-modal-content";
import SignUnModalContent from "./components/sign-up-modal-content/sign-up-modal-content";
import UpdatePwModalContent from "./components/update-password-modal-content/update-password-modal-content";

import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="flex-container">
				<Header />
				<div className="body"></div>
				<Footer />
			</div>
		</div>
	);
}

export default App;
