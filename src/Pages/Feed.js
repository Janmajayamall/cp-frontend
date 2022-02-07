import PostDisplay from "../components/PostDisplay";
import Loader from "../components/Loader";
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

import {} from "@usedapp/core/packages/core";
import {} from "../hooks";
import useInView from "react-cool-inview";
import { useEffect, useState } from "react";
import {} from "../utils";
import {} from "../redux/reducers";
import ConfigSidebar from "../components/ConfigSiderbar";
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
			<ConfigSidebar />
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
				{filteredMarkets.map((market, index) => {
					return (
						<PostDisplay
							key={index}
							setRef={
								filteredMarkets.length % FEED_BATCH_COUNT === 0
									? index === filteredMarkets.length - 1
										? observe
										: null
									: null
							}
							style={{
								marginBottom: 45,
								width: "100%",
							}}
							market={market}
							onImageClick={(marketIdentifier) => {
								navigate(`/post/${marketIdentifier}`);
							}}
						/>
					);
				})}

				{loadingMarkets == true ? <Loader /> : undefined}
			</Flex>
		</Flex>
	);
}

export default Page;
