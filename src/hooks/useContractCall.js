import { addresses } from "../contracts";
import {
	useEthers,
	useContractFunction,
	useContractCalls,
	useContractCall,
} from "@usedapp/core/packages/core";
import { groupInterface, erc20Interface } from "../utils";

export function useTokenBalance(account, tokenAddress) {
	const [tokenBalance] =
		useContractCall(
			account &&
				addresses.WETH && {
					abi: erc20Interface,
					address: tokenAddress,
					method: "balanceOf",
					args: [account],
				}
		) ?? [];
	return tokenBalance;
}

export function useTokenAllowance(account, tokenAddress) {
	const [allowance] =
		useContractCall(
			account &&
				tokenAddress && {
					abi: erc20Interface,
					address: tokenAddress,
					method: "allowance",
					args: [account, addresses.Router],
				}
		) ?? [];
	return allowance;
}

export function useERC1155ApprovalForAll(groupAddress, account) {
	const [approval] =
		useContractCall(
			account &&
				groupAddress &&
				addresses.MarketRouter && {
					abi: groupInterface,
					address: groupAddress,
					method: "isApprovedForAll",
					args: [account, addresses.Router],
				}
		) ?? [];
	return approval;
}
