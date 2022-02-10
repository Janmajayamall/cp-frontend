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
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
import TradingInterface from "../components/TradingInterface";
const data = [
	{ name: "Page A", uv: 400, pv: 2400, amt: 2400 },
	{ name: "Page B", uv: 424, pv: 2400, amt: 2400 },
	{ name: "Page C", uv: 421, pv: 2400, amt: 2400 },
	{ name: "Page D", uv: 213, pv: 2400, amt: 2400 },
	{ name: "Page waA", uv: 345, pv: 2400, amt: 2400 },
	{ name: "Page sqA", uv: 122, pv: 2400, amt: 2400 },
	{ name: "Page SQA", uv: 232, pv: 2400, amt: 2400 },
];

function Page() {
	const location = useLocation();
	const urlParams = useParams();
	const postId = urlParams.postId != undefined ? urlParams.postId : undefined;

	return (
		<Flex padding={5}>
			<Flex flexDirection="column" width={"70%"}>
				<Flex flexDirection="column">
					<Flex>
						<Tag size={"sm"} variant="subtle" colorScheme="cyan">
							<TagLabel>Cyan</TagLabel>
						</Tag>
						<Tag size={"sm"} variant="subtle" colorScheme="cyan">
							<TagLabel>Geopolitics</TagLabel>
						</Tag>
						<Tag size={"sm"} variant="subtle" colorScheme="cyan">
							<TagLabel>Normal</TagLabel>
						</Tag>
					</Flex>
					<Flex>
						<Avatar
							name="Dan Abrahmov"
							src="https://bit.ly/dan-abramov"
						/>
						<Text>
							Will interest reates hike in the next month?
						</Text>
					</Flex>
					<Text>
						This market will resolve to sommething if something
						happens. And will resolve to something is something does
						not happen. Please bet according to something happening
					</Text>

					<Text>ENDS AT Some date</Text>
				</Flex>
				<LineChart width={500} height={500} data={data}>
					<Line type="monotone" dataKey="uv" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
				</LineChart>
			</Flex>
			<Flex flexDirection="column" width={"30%"}>
				<TradingInterface />
			</Flex>
		</Flex>
	);
}

export default Page;
