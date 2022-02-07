import {
	useContractFunction,
	useSendTransaction,
} from "@usedapp/core/packages/core";
import {
	routerContract,
	groupContract,
	wEthContract,
	usdcContract,
} from "../utils";
import Web3 from "web3";

export function useBuyMinimumOutcomeTokensWithFixedAmount() {
	const { state, send } = useContractFunction(
		routerContract,
		"buyMinOutcomeTokensWithFixedAmount"
	);
	return { state, send };
}

export function useSellMaxOutcomeTokensForFixedAmount() {
	const { state, send } = useContractFunction(
		routerContract,
		"sellMaxOutcomeTokensForFixedAmount"
	);
	return { state, send };
}

export function useSellFixedOutcomeTokensForMinAmount() {
	const { state, send } = useContractFunction(
		routerContract,
		"sellFixedOutcomeTokensForMinAmount"
	);
	return { state, send };
}

export function useRedeem() {
	const { state, send } = useContractFunction(routerContract, "redeem");
	return { state, send };
}

export function useERC1155SetApprovalForAll() {
	const { state, send } = useContractFunction(
		groupContract,
		"setApprovalForAll"
	);
	return { state, send };
}

export function useTokenApprove() {
	const { state, send } = useContractFunction(usdcContract, "approve");
	return {
		state,
		send,
	};
}
