import { Button, Text, Flex, useToast, UnorderedList } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core/packages/core";
import { useEffect } from "react";
import { useState } from "react";
import {
	useBuyMinimumOutcomeTokensWithFixedAmount,
	useSellFixedOutcomeTokensForMinAmount,
	useSellExactTokensForMinCTokens,
	useTokenBalance,
	useCheckTokenApprovals,
} from "../hooks";
import {
	formatBNToDecimal,
	getAmountCBySellTokenAmount,
	getTokenAmountToBuyWithAmountC,
	useBNInput,
	getDecStrAvgPriceBN,
	GRAPH_BUFFER_MS,
	formatBNToDecimalCurr,
	minAmountAfterSlippageBn,
	CURR_SYMBOL,
	getOutcomeProbabilityFromReserves,
	ZERO_BN,
	ARB_RINKEBY_CHAIN_ID,
	formatDecimalToPercentage,
	getAmountCOutForToken0,
	getToken0OutForAmountC,
} from "../utils";
import TwoColTitleInfo from "../components/TwoColTitleInfo";
import PrimaryButton from "./PrimaryButton";
import { BigNumber } from "ethers";
import TradingInput from "./TradingInput";
import TradePriceBoxes from "./TradePriceBoxes";
import ApprovalInterface from "./ApprovalInterface";
import {
	useCheckERC1155ApprovalForAll,
	useCheckTokenApproval,
} from "../hooks/extras";
import { addresses } from "../contracts";

function TradingInterface({ market, tradePosition, refreshFn }) {
	const { account, chainId } = useEthers();
	const isAuthenticated =
		account && chainId && chainId == ARB_RINKEBY_CHAIN_ID ? true : false;
	const toast = useToast();
	const usdcTokenBalance = useTokenBalance(account, addresses.USDC);

	/**
	 * Contract calls
	 */
	const {
		state: stateBuy,
		send: sendBuy,
	} = useBuyMinimumOutcomeTokensWithFixedAmount();
	const {
		state: stateSell,
		send: sendSell,
	} = useSellFixedOutcomeTokensForMinAmount();

	/**
	 * tabIndex == 0 -> BUY
	 * tabIndex == 1 -> SELL
	 */
	const [tabIndex, setTabIndex] = useState(0);
	const [tokenActionIndex, setTokenActionIndex] = useState(1);

	/**
	 * Buy side states
	 */
	const {
		input: inputBuyAmount,
		bnValue: inputBuyAmountBn,
		setInput: setInputBuyAmount,
		err: inputBuyAmountErr,
		errText: inputBuyAmountErrText,
	} = useBNInput(buyValidationFn);
	const [tokenOutAmountBn, setTokenOutAmountBn] = useState(BigNumber.from(0));

	/**
	 * Sell side states
	 */
	const {
		input: inputSellAmount,
		bnValue: inputSellAmountBn,
		setInput: setInputSellAmount,
		err: inputSellAmountErr,
		errText: inputSellAmountErrText,
	} = useBNInput(sellValidationFn);
	const [amountCOutBn, setAmountCOutBn] = useState(BigNumber.from(0));

	const [feeBn, setFeeBn] = useState(BigNumber.from(0));

	const [slippage, setSlippage] = useState(0.5);

	// tx loading
	const [buyLoading, setBuyLoading] = useState(false);
	const [sellLoading, setSellLoading] = useState(false);

	const tokenApproval = useCheckTokenApproval(
		addresses.USDC,
		account,
		inputBuyAmountBn
	);
	const erc1155TokenApproval = useCheckERC1155ApprovalForAll(
		addresses.Group,
		account
	);

	useEffect(() => {
		if (
			!market ||
			tabIndex != 0 ||
			tokenActionIndex > 1 ||
			tokenActionIndex < 0
		) {
			return;
		}

		let { amount, fee, err } = getToken0OutForAmountC(
			tokenActionIndex == 0
				? market.outcomeReserve0
				: market.outcomeReserve1,
			tokenActionIndex == 0
				? market.outcomeReserve1
				: market.outcomeReserve0,
			inputBuyAmountBn,
			market.fee
		);

		if (err === true) {
			// TODO set error
			return;
		}

		setTokenOutAmountBn(amount);
		setFeeBn(fee);
	}, [inputBuyAmountBn, tokenActionIndex]);

	useEffect(() => {
		if (
			!market ||
			tabIndex != 1 ||
			tokenActionIndex > 1 ||
			tokenActionIndex < 0
		) {
			return;
		}

		let { amount, fee, err } = getAmountCOutForToken0(
			tokenActionIndex == 0
				? market.outcomeReserve0
				: market.outcomeReserve1,
			tokenActionIndex == 0
				? market.outcomeReserve1
				: market.outcomeReserve0,
			inputSellAmountBn,
			market.fee
		);

		if (err) {
			// TODO set error
			return;
		}

		setAmountCOutBn(amount);
		setFeeBn(fee);
	}, [inputSellAmountBn, tokenActionIndex]);

	// tx state handle
	useEffect(() => {
		if (stateBuy.status == "Success" || stateSell.status == "Success") {
			setTimeout(() => {
				displayToast("Success!", "success");
				setBuyLoading(false);
				setSellLoading(false);
				if (refreshFn) {
					refreshFn();
				}
			}, GRAPH_BUFFER_MS);
		}
	}, [stateSell, stateBuy]);

	useEffect(() => {
		if (
			stateBuy.status == "Exception" ||
			stateBuy.status == "Fail" ||
			stateSell.status == "Exception" ||
			stateSell.status == "Fail"
		) {
			displayToast("Metamask err!", "error");
			setBuyLoading(false);
			setSellLoading(false);
		}
	}, [stateBuy, stateSell]);

	function displayToast(title, status) {
		toast({
			title: title,
			status: status,
			isClosable: true,
		});
	}

	function buyValidationFn(bnValue) {
		if (usdcTokenBalance == undefined || bnValue.lte(usdcTokenBalance)) {
			return { valid: true, expStr: "" };
		}
		return {
			valid: false,
			expStr: "Insufficient Balance",
		};
	}

	function sellValidationFn(bnValue) {
		if (
			(tokenActionIndex === 0 && bnValue.gt(tradePosition.amount0)) ||
			(tokenActionIndex === 1 && bnValue.gt(tradePosition.amount1))
		) {
			return {
				valid: false,
				expStr: "You don't have enough shares",
			};
		}
		return {
			valid: true,
			expStr: "",
		};
	}

	function TradingButton({ index, ...props }) {
		return (
			<Button
				{...props}
				style={
					tabIndex === index
						? {
								backgroundColor: "#0B0B0B",
						  }
						: {
								backgroundColor: "#FDFDFD",
						  }
				}
				_hover={{
					border: "1px",
					borderStyle: "solid",
					borderColor: "blue.400",
					backgroundColor: "gray.700",
				}}
				width="50%"
				justifyContent="center"
			>
				<Text
					fontSize={14}
					style={
						tabIndex === index
							? {
									color: "#FDFDFD",
							  }
							: {
									color: "#0B0B0B",
							  }
					}
				>
					{index == 0 ? "Buy" : "Sell"}
				</Text>
			</Button>
		);
	}

	return (
		<Flex flexDirection={"column"}>
			<Flex marginTop={5}>
				<TradingButton
					index={0}
					onClick={() => {
						setTabIndex(0);
					}}
				/>
				<TradingButton
					index={1}
					onClick={() => {
						setTabIndex(1);
					}}
				/>
			</Flex>
			{tabIndex === 0 ? (
				<Flex flexDirection="column">
					<TradePriceBoxes
						market={market}
						outcomeChosen={tokenActionIndex}
						onOutcomeChosen={(index) => {
							setTokenActionIndex(index);
						}}
						tradePosition={tradePosition}
					/>
					<TradingInput
						setSlippage={setSlippage}
						slippageValue={slippage}
						setInput={setInputBuyAmount}
						inputValue={inputBuyAmount}
						isBuy={true}
						err={inputBuyAmountErr}
						errText={inputBuyAmountErrText}
					/>
					<TwoColTitleInfo
						title="Your choice"
						info={tokenActionIndex === 0 ? "LONG" : "SHORT"}
						helpText="Outcome share that you are buying"
					/>
					<TwoColTitleInfo
						title="Shares bought"
						info={formatBNToDecimal(tokenOutAmountBn)}
						helpText="Number of shares you will receive based on the WETH amount you've entered"
					/>
					{/**
					 * Note add fee
					 */}
					<TwoColTitleInfo
						title="Avg. Price per share"
						info={getDecStrAvgPriceBN(
							inputBuyAmountBn,
							tokenOutAmountBn
						)}
						helpText={`Price per outcome share in ${CURR_SYMBOL}`}
					/>
					<TwoColTitleInfo
						title="Max. Profit"
						info={formatBNToDecimalCurr(
							tokenOutAmountBn.sub(inputBuyAmountBn)
						)}
						helpText="Maximum WETH you could win, if your prediction is correct"
					/>
					<TwoColTitleInfo
						title="Change in YES%"
						info={formatBNToDecimalCurr(
							tokenOutAmountBn.sub(inputBuyAmountBn)
						)}
						helpText="Maximum WETH you could win, if your prediction is correct"
					/>
					<PrimaryButton
						disabled={
							!isAuthenticated ||
							!tokenApproval ||
							inputBuyAmountErr
						}
						marginTop="2"
						width="100%"
						isLoading={buyLoading}
						loadingText={"Processing..."}
						onClick={() => {
							if (
								!isAuthenticated ||
								!tokenApproval ||
								inputBuyAmountErr
							) {
								return;
							}

							let tokenOutAmountBnAfterSlippage = minAmountAfterSlippageBn(
								tokenOutAmountBn,
								slippage
							);
							if (
								tokenOutAmountBnAfterSlippage.isZero() ||
								inputBuyAmountBn.isZero()
							) {
								return;
							}

							setBuyLoading(true);

							sendBuy(
								addresses.Group,
								market.marketIdentifier,
								tokenOutAmountBnAfterSlippage,
								tokenActionIndex,
								inputBuyAmountBn
							);
						}}
						title={"Buy"}
					/>

					<ApprovalInterface
						marginTop={5}
						tokenType={0}
						erc20AmountBn={inputBuyAmountBn}
						onSuccess={() => {
							toast({
								title: "Success!",
								status: "success",
								isClosable: true,
							});
						}}
						onFail={() => {
							toast({
								title: "Metamask err!",
								status: "error",
								isClosable: true,
							});
						}}
					/>
				</Flex>
			) : undefined}
			{tabIndex === 1 ? (
				<Flex flexDirection="column">
					<TradePriceBoxes
						market={market}
						outcomeChosen={tokenActionIndex}
						onOutcomeChosen={(index) => {
							setTokenActionIndex(index);
						}}
						tradePosition={tradePosition}
					/>
					<TradingInput
						setSlippage={setSlippage}
						slippageValue={slippage}
						setInput={setInputSellAmount}
						inputValue={inputSellAmount}
						setMaxSell={() => {
							if (tokenActionIndex == 0) {
								setInputSellAmount(
									formatBNToDecimal(
										tradePosition.amount0,
										18,
										false
									)
								);
							}
							if (tokenActionIndex == 1) {
								setInputSellAmount(
									formatBNToDecimal(
										tradePosition.amount1,
										18,
										false
									)
								);
							}
						}}
						err={inputSellAmountErr}
						errText={inputSellAmountErrText}
						isBuy={false}
					/>
					<TwoColTitleInfo
						title="Your choice"
						info={tokenActionIndex === 0 ? "NO" : "YES"}
						helpText="Outcome share that you are selling"
					/>
					<TwoColTitleInfo
						title="Estimated amount received"
						info={formatBNToDecimalCurr(amountCOutBn)}
						helpText={`Amount in ${CURR_SYMBOL} you will receive based on Share amount you've entered`}
					/>
					<TwoColTitleInfo
						title="Avg. sell price"
						info={getDecStrAvgPriceBN(
							amountCOutBn,
							inputSellAmountBn
						)}
						helpText={`Amount in ${CURR_SYMBOL} you receive per share`}
					/>

					<PrimaryButton
						disabled={
							!isAuthenticated ||
							!erc1155TokenApproval ||
							inputSellAmountErr
						}
						marginTop="2"
						width="100%"
						onClick={() => {
							if (
								!isAuthenticated ||
								!erc1155TokenApproval ||
								inputSellAmountErr
							) {
								return;
							}

							let amountCOutAfterSlippageBn = minAmountAfterSlippageBn(
								amountCOutBn,
								slippage
							);

							if (
								amountCOutAfterSlippageBn.isZero() ||
								inputSellAmountBn.isZero()
							) {
								return;
							}

							setSellLoading(true);

							sendSell(
								addresses.Group,
								market.marketIdentifier,
								inputSellAmountBn,
								tokenActionIndex,
								amountCOutAfterSlippageBn
							);
						}}
						isLoading={sellLoading}
						loadingText={"Processing..."}
						title={"Sell"}
					/>

					<ApprovalInterface
						marginTop={10}
						tokenType={1}
						erc1155Address={addresses.Group}
						onSuccess={() => {
							toast({
								title: "Success!",
								status: "success",
								isClosable: true,
							});
						}}
						onFail={() => {
							toast({
								title: "Metamask err!",
								status: "error",
								isClosable: true,
							});
						}}
					/>
				</Flex>
			) : undefined}
		</Flex>
	);
}

export default TradingInterface;
