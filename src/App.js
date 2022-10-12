import { useState } from "react";
import Header from "./components/header/header";
import Signin from "./components/sign-in-modal/sign-in-modal";
import Footer from "./components/footer/footer";

import "./App.css";

function App() {
	const [users, setUsers] = useState([]);
	const [modalOn, setModalOn] = useState(false);

	return (
		<div className="App">
			<Header modalOn={modalOn} setModalOn={setModalOn} />
			<Signin
				users={users}
				setUsers={setUsers}
				modalOn={modalOn}
				setModalOn={setModalOn}
			/>
			<Footer />
		</div>
	);
}

export default App;
