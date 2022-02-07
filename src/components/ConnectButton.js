import { Box, Text, Flex } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core/packages/core";

import { useTokenBalance } from "./../hooks";
import { formatBNToDecimalCurr, sliceAddress } from "../utils";
import PrimaryButton from "./PrimaryButton";

function ConnectButton() {
	const { account } = useEthers();
	const tokenBalance = useTokenBalance(account);

	return (
		<Flex m={2}>
			<Box
				display="flex"
				alignItems="center"
				background="gray.700"
				borderRadius="xl"
				py="0"
			>
				{account && tokenBalance ? (
					<Box px="3">
						<Text color="white" fontSize="md">
							{formatBNToDecimalCurr(tokenBalance)}
						</Text>
					</Box>
				) : undefined}
				<PrimaryButton
					onClick={() => {
						if (userProfile && account) {
							return;
						}
						dispatch(sUpdateLoginModalIsOpen(true));
					}}
					title={
						userProfile && account
							? sliceAddress(account)
							: "Sign In"
					}
				/>
			</Box>
		</Flex>
	);
}

export default ConnectButton;
