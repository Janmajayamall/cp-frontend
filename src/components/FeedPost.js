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

function FeedPost() {
	return (
		<Flex flexDirection={"column"} padding={5}>
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
				<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
				<Text>Will interest reates hike in the next month?</Text>
			</Flex>
			<Text>
				This market will resolve to sommething if something happens. And
				will resolve to something is something does not happen. Please
				bet according to something happening
			</Text>
			<Text>70% YES</Text>
			<Text>200 USDC</Text>
			<Text>ENDS AT Some date</Text>
		</Flex>
	);
}
export default FeedPost;
