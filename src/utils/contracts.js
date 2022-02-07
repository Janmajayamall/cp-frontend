import { addresses } from "../contracts";
import { utils, Contract } from "ethers";
import ERC20Abi from "../contracts/abis/ERC20.json";
import GroupAbi from "../contracts/abis/Group.json";
import RouterAbi from "../contracts/abis/Router.json";

export const erc20Interface = new utils.Interface(ERC20Abi);
export const groupInterface = new utils.Interface(GroupAbi);
export const routerInterface = new utils.Interface(RouterAbi);

export const wEthContract = new Contract(addresses.WETH, erc20Interface);
export const usdcContract = new Contract(addresses.USDC, erc20Interface);
export const groupContract = new Contract(addresses.Group, groupInterface);
export const routerContract = new Contract(addresses.Router, routerInterface);
