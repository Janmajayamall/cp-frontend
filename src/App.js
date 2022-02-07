import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Feed from "./pages/Feed";
import { Flex } from "@chakra-ui/react";

import HeaderWarning from "./components/HeaderWarning";
import ConnectButton from "./components/ConnectButton";

function App() {
	return (
		<div>
			<HeaderWarning />
			<Flex borderBottom="1px" borderColor="#BDBDBD">
				<Flex
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						height: 96,
					}}
				>
					<Flex
						style={{
							width: "100%",
							height: "100%",
							maxWidth: 1650,
							justifyContent: "center",
							alignItems: "center",
							paddingLeft: 5,
							paddingRight: 5,
						}}
					>
						<Spacer />
						<ConnectButton />
						{/* <MainMenu /> */}
					</Flex>
				</Flex>
			</Flex>
			<Routes>
				<Route path="/" element={<Feed />} />
			</Routes>
		</div>
	);
}

export default App;
