import { BigNumber, constants, utils as eUtils } from "ethers";
export const DEFAULT_BASE_UINT = 18;
export const ZERO_BN = BigNumber.from("0");
export const ONE_BN_1e18 = eUtils.parseUnits("1", DEFAULT_BASE_UINT);
export const ONE_BN = BigNumber.from("1");
export const TWO_BN = BigNumber.from("2");
export const FOUR_BN = BigNumber.from("4");
export const MULTIPLIER = BigNumber.from("10000000000");
export const MULTIPLIER_BASE = 10;
export const ZERO_DECIMAL_STR = "0";
export const GRAPH_BUFFER_MS = 10000;
export const MAX_LENGTH_NAME = 20;
export const MAX_LENGTH_DESCRIPTION = 500;
export const MAX_UINT_256 = constants.MaxUint256;
export const CURR_SYMBOL = "USDC";
export const FEED_BATCH_COUNT = 100;
export const ARB_RINKEBY_CHAIN_ID = 421611;
