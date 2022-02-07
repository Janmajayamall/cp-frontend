import { Button, Box, Text, Flex, Spacer, Image } from "@chakra-ui/react";

import {} from "../hooks";
import { useEffect, useState } from "react";

function Page() {
	return (
		<Flex>
			<Spacer />

			<Flex width={"50%"} flexDirection={"column"}>
				<Text fontSize={30}>
					What will be the box office earnings of The Amazing
					Spderman?
				</Text>
				<Image
					loading={"eager"}
					onLoad={() => {}}
					fit="contain"
					src={
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-GQQe6DjmOfqXWr0QsXQMlYCxitsF6PooA&usqp=CAU"
					}
					alt="Failed to load image"
				/>
			</Flex>
			<Spacer />
		</Flex>
	);
}

export default Page;
