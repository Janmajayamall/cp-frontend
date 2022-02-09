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

import { useQueryAllMarkets } from "../hooks";
import { useEffect, useState } from "react";
import ConfigSidebar from "./../components/ConfigSidebar";
import MarketDisplay from "../components/MarketDisplay";
import {
	filterMarketIdentifiersFromMarkets,
	findMarkets,
	populateMarketWithMetadata,
} from "../utils";

function Page() {
	const { result } = useQueryAllMarkets(false);

	const [filteredMarkets, setFilteredMarkets] = useState([]); // filteredMarkets are populated with metadata
	const [marketsDetails, setMarketsDetails] = useState([]);

	// fetch market details whenever result from queryAllMarkets changes
	useEffect(async () => {
		if (result.data && result.data.markets) {
			// get market details using market identifiers
			const _marketsD = await findMarkets({
				marketIdentifier: filterMarketIdentifiersFromMarkets(
					result.data.markets
				),
			});
			setMarketsDetails(_marketsD);
		}
	}, [result]);

	// whenever result or marketsDetails change, sort markets (using result) according to filter, populate them with metadata and set them as filteredMarkets
	useEffect(async () => {
		if (result.data && result.data.markets) {
			// sort market by selected sort type
			const sortedRawMarkets = result.data.markets; // TODO change this

			const _filteredMarkets = []; // sorted markets populated with respective metadata
			sortedRawMarkets.forEach((rawMarket) => {
				const metadata = marketsDetails.find(
					(market) => market.marketIdentifier == rawMarket.id
				);

				if (metadata != undefined) {
					_filteredMarkets.push(
						populateMarketWithMetadata(rawMarket, metadata)
					);
				}
			});
			setFilteredMarkets(_filteredMarkets);
		}
	}, [result, marketsDetails]);

	return (
		<Flex>
			<Spacer />
			<Flex width={"30%"}>
				<Text>Dropdown</Text>
			</Flex>

			<Flex
				flexDirection="column"
				width={"70%"}
				minHeight="100vh"
				paddingRight={21}
				paddingLeft={21}
				borderRightWidth={1}
				borderLeftWidth={1}
				borderColor={"#E0E0E0"}
			>
				{filteredMarkets.map((market, index) => {
					return (
						<MarketDisplay
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
		</Flex>
	);
}

export default Page;
