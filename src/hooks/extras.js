import { ZERO_BN } from "../utils";
import { useTokenAllowance, useERC1155ApprovalForAll } from "./useContractCall";

export function useCheckTokenApproval(
	tokenAddress,
	account,
	erc20AmountBn = ZERO_BN
) {
	const tokenAllowance = useTokenAllowance(account, tokenAddress);
	return tokenAllowance != undefined
		? erc20AmountBn.lte(tokenAllowance)
		: true;
}

export function useCheckERC1155ApprovalForAll(groupAddress, account) {
	const approvalForAll = useERC1155ApprovalForAll(groupAddress, account);
	return approvalForAll != undefined ? approvalForAll : true;
}
