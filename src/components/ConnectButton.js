import { Box, Text, Flex } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core/packages/core";

import { useTokenBalance } from "./../hooks";
import { formatBNToDecimalCurr, sliceAddress } from "../utils";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState } from "react";

function ConnectButton() {
	const { account, activateBrowserWallet } = useEthers();
	const tokenBalance = useTokenBalance(account);

	const [chainId, setChainId] = useState(null);

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("chainChanged", (id) => {
				setChainId(parseInt(id, 16));
			});
		}
	}, [window.ethereum]);

	useEffect(async () => {
		if (window.ethereum) {
			const id = await window.ethereum.request({
				method: "eth_chainId",
			});
			setChainId(parseInt(id, 16));
		}
	}, []);
	console.log(chainId);
	return (
		<Flex m={2}>
			{chainId !== 421611 && account ? (
				<PrimaryButton
					onClick={async () => {
						if (window.ethereum) {
							await window.ethereum.request({
								method: "wallet_addEthereumChain",
								params: [
									{
										chainId: "0x66EEB",
										chainName: "Rinkeby-arbitrum",
										nativeCurrency: {
											name: "Ethereum",
											symbol: "ETH",
											decimals: 18,
										},
										rpcUrls: [
											"https://rinkeby.arbitrum.io/rpc",
										],
										blockExplorerUrls: [
											"https://testnet.arbiscan.io/",
										],
									},
								],
							});
						}
					}}
					title={"Switch to Rinkeby-Arbitrum"}
				/>
			) : undefined}
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
						if (account != undefined) {
							return;
						}
						activateBrowserWallet();
					}}
					title={
						account ? sliceAddress(account) : "Connect your wallet"
					}
				/>
			</Box>
		</Flex>
	);
}

export default ConnectButton;
