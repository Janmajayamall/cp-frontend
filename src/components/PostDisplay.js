import { Flex, Spacer, Button, Text } from "@chakra-ui/react";
import PrimaryButton from "./PrimaryButton";

function PostDisplay() {
	function Prices({ title, price }) {
		// return (
		// 	<Flex flexDirection={"column"}>
		// 		<Text>{title}</Text>
		// 		<Text>{price}</Text>
		// 	</Flex>
		// );
		return <Text style={{ padding: 5 }}>{`${title}: ${price}`}</Text>;
	}

	return (
		<Flex flexDirection={"column"}>
			<Text fontSize={40}>
				What will be the box office earnings of The Amazing Spderman?
			</Text>
			<Flex flexDirection={"row"}>
				<Prices title={"Long"} price="12" />
				<Prices title={"Short"} price="12" />
				<Spacer />
				<Prices title={"Volume"} price="12" />
			</Flex>
			<Flex>
				<PrimaryButton title={"Trade"} />
				<Spacer />
			</Flex>
		</Flex>
	);
}

export default PostDisplay;
