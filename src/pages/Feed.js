import {
	Button,
	Box,
	Text,
	Flex,
	Spacer,
	Heading,
	Avatar,
	IconButton,
	Tag,
	TagLabel,
} from "@chakra-ui/react";

import { useQueryAllMarkets } from "../hooks";
import { useEffect, useState } from "react";
import ConfigSidebar from "./../components/ConfigSidebar";
import MarketDisplay from "../components/MarketDisplay";
import FeedPost from "../components/FeedPost";
import {
	filterMarketIdentifiersFromMarkets,
	findMarkets,
	populateMarketWithMetadata,
} from "../utils";
import { useParams, useLocation } from "react-router";

function Page() {
	const location = useLocation();
	const urlParams = useParams();
	const groupId =
		urlParams.groupId != undefined ? urlParams.groupId : undefined;
	const feedType = (() => {
		if (location.pathname == "/explore" || location.pathname == "/") {
			return 0;
		}
		if (location.pathname == "/home") {
			return 1;
		}
		if (groupId) {
			return 2;
		}
	})();

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
			{/* <Flex width={"30%"}>
				<Text>Dropdown</Text>
			</Flex>

			 */}

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
				{feedType == 2 ? (
					<Flex padding={5} flexDirection={"column"}>
						<Flex>
							<Text>Group Name</Text>
							<Button size={"sm"}>Following</Button>
						</Flex>
						<Flex>
							<Text>Posts: 47</Text>
							<Text>members: 47</Text>
						</Flex>

						<Text>Place for PMs on geopolitical stuff</Text>
					</Flex>
				) : undefined}
				<FeedPost />
				<FeedPost />
				<FeedPost />

				{/* {loadingMarkets == true ? <Loader /> : undefined} */}
			</Flex>

			<Flex flexDirection="column" width={"30%"} minHeight="100vh">
				<Flex margin={5} flexDirection={"column"}>
					<Text>Create your favorite prediction market!!</Text>
					<Button>Create now</Button>
				</Flex>
				<Flex margin={5} flexDirection={"column"}>
					<Text>Active Communities</Text>
					{["Geoplitics", "Something", "Something 2"].map((name) => {
						return (
							<Flex>
								<Text>{name}</Text>
								<Spacer />
								<Button>Follow</Button>
							</Flex>
						);
					})}
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Page;
