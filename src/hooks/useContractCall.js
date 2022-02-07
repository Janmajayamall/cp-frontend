import { addresses } from "../contracts";
import {
	useEthers,
	useContractFunction,
	useContractCalls,
	useContractCall,
} from "@usedapp/core/packages/core";
import { oracleInterface, wEthInterface } from "../utils";

export function useTokenBalance(account) {
	const [tokenBalance] =
		useContractCall(
			account &&
				addresses.WETH && {
					abi: wEthInterface,
					address: addresses.WETH,
					method: "balanceOf",
					args: [account],
				}
		) ?? [];
	return tokenBalance;
}
