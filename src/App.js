import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div>
			<HeaderWarning />
			<Routes>
				<Route path="/" element={<NewPost />} />
			</Routes>
		</div>
	);
}

export default App;
