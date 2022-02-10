import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Market from "./pages/Market";
import { Flex, Spacer, Select } from "@chakra-ui/react";

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
						<Select width={"30%"} placeholder="Select Group">
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</Select>
						<Spacer />
						<ConnectButton />
						{/* <MainMenu /> */}
					</Flex>
				</Flex>
			</Flex>
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="/group/:groupId" element={<Feed />} />
				<Route path="/post/:postId" element={<Post />} />
				<Route path="/n" element={<Market />} />
			</Routes>
		</div>
	);
}

export default App;
