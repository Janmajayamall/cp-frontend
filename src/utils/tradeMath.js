import { BigNumber } from "ethers";
import { ONE_BN_1e18, ONE_BN, FOUR_BN, TWO_BN, ZERO_BN } from ".";

/**
 * @ref https://github.com/Uniswap/sdk-core/blob/76b41d349ef7f9e0555383b1b11f95872e91e975/src/utils/sqrt.ts#L14
 */
export function sqrtBn(value) {
	if (!BigNumber.isBigNumber(value) || value.lte(ZERO_BN)) {
		return 0;
	}

	if (value.lte(BigNumber.from(Number.MAX_SAFE_INTEGER - 1))) {
		return BigNumber.from(Math.sqrt(Number(value.toString())));
	}

	let z;
	let x;
	z = value;
	x = value.div(TWO_BN).add(ONE_BN);
	while (x.lt(z)) {
		z = x;
		x = value.div(x).add(x).div(TWO_BN);
	}
	return z;
}

export function isValidTradeEq(r0, r1, a0, a1, a, isBuy) {
	if (typeof isBuy !== "boolean") {
		return false;
	}

	if (
		!BigNumber.isBigNumber(r0) ||
		!BigNumber.isBigNumber(r1) ||
		!BigNumber.isBigNumber(a) ||
		!BigNumber.isBigNumber(a0) ||
		!BigNumber.isBigNumber(a1)
	) {
		return false;
	}

	if (
		isBuy &&
		r0.add(a).sub(a0).gte(ZERO_BN) &&
		r1.add(a).sub(a1).gte(ZERO_BN)
	) {
		return true;
	} else if (
		!isBuy &&
		r0.add(a0).sub(a).gte(ZERO_BN) &&
		r1.add(a1).sub(a).gte(ZERO_BN)
	) {
		return true;
	}
	return false;
}

export function isValidToken0Sell(r0, r1, tA, a) {
	if (
		!BigNumber.isBigNumber(r0) ||
		!BigNumber.isBigNumber(r1) ||
		!BigNumber.isBigNumber(a) ||
		!BigNumber.isBigNumber(tA)
	) {
		return false;
	}

	if (r0.add(tA).sub(a).gt(ZERO_BN) && r1.sub(a).gt(ZERO_BN)) {
		return true;
	}
	return false;
}

export function getToken0OutForAmountC(r0, r1, a, fee) {
	if (
		!BigNumber.isBigNumber(r0) ||
		!BigNumber.isBigNumber(r1) ||
		!BigNumber.isBigNumber(a) ||
		!BigNumber.isBigNumber(fee) ||
		fee.gte(ONE_BN_1e18)
	) {
		return { amount: 0, fee: 0, err: true };
	}
	let aMinusFee = a.mul(ONE_BN_1e18.sub(fee)).div(ONE_BN_1e18);
	let tokenAmount = r0.add(aMinusFee).sub(r0.mul(r1).div(r1.add(aMinusFee)));
	tokenAmount = tokenAmount.sub(ONE_BN);

	return {
		amount: tokenAmount,
		fee: a.sub(aMinusFee),
		err: false,
	};
}

export function getAmountCOutForToken0(r0, r1, tA, fee) {
	if (
		!BigNumber.isBigNumber(r0) ||
		!BigNumber.isBigNumber(r1) ||
		!BigNumber.isBigNumber(tA) ||
		!BigNumber.isBigNumber(fee) ||
		fee.gte(ONE_BN_1e18)
	) {
		return { amount: 0, fee: 0, err: true };
	}

	let b = r0.add(r1).add(tA); // B is -ve, but it does not make difference
	let c = tA.mul(r1);
	let root = sqrtBn(b.pow(2).sub(c.mul(FOUR_BN)));

	let amountPlusFee = b.sub(root).div(TWO_BN);
	if (!isValidToken0Sell(r0, r1, tA, amountPlusFee)) {
		amountPlusFee = b.add(root).div(TWO_BN);
		if (!isValidToken0Sell(r0, r1, tA, amountPlusFee)) {
			return {
				amount: 0,
				fee: 0,
				err: true,
			};
		}
	}

	let amount = amountPlusFee.mul(ONE_BN_1e18).div(ONE_BN_1e18 + fee);
	return {
		amount,
		fee: amountPlusFee.sub(amount),
		error: false,
	};
}
