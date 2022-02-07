import { addresses } from "./../contracts";
import { utils, Contract } from "ethers";
import WETHAbi from "../contracts/abis/WETH.json";

export const wEthInterface = new utils.Interface(WETHAbi);

export const wEthContract = new Contract(
	addresses.WETH,
	new utils.Interface(WETHAbi)
);
