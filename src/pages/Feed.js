import {
	Button,
	Box,
	Text,
	Flex,
	Spacer,
	Heading,
	Avatar,
	IconButton,
} from "@chakra-ui/react";

import {} from "../hooks";
import { useEffect, useState } from "react";
import ConfigSidebar from "./../components/ConfigSidebar";
import PostDisplay from "../components/PostDisplay";

function Page() {
	return (
		<Flex
			style={{
				paddingRight: 20,
				paddingLeft: 20,
			}}
		>
			<Spacer />
			<Flex width={"30%"}>
				<Text>Dropdown</Text>
			</Flex>

			<Flex
				flexDirection="column"
				width={"50%"}
				minHeight="100vh"
				paddingRight={21}
				paddingLeft={21}
				borderRightWidth={1}
				borderLeftWidth={1}
				borderColor={"#E0E0E0"}
			>
				{[0, 1, 2, 3].map((market, index) => {
					return (
						<PostDisplay
						// key={index}
						// market={market}
						// onImageClick={(marketIdentifier) => {
						// 	// navigate(`/post/${marketIdentifier}`);
						// }}
						/>
					);
				})}

				{/* {loadingMarkets == true ? <Loader /> : undefined} */}
			</Flex>
			<Spacer />
		</Flex>
	);
}

export default Page;
