import { BigNumber, ethers, utils } from "ethers";
import { useState } from "react";
import { useEffect } from "react";
import { CURR_SYMBOL, MULTIPLIER_BASE, MULTIPLIER, ZERO_BN, TWO_BN } from ".";

export function filterMarketIdentifiersFromMarkets(markets) {
	return markets.map((market) => {
		return market.marketIdentfier;
	});
}

export function populateMarketWithMetadata(rawMarket, marketMetadata) {
	return {
		...rawMarket,
		fee: parseDecimalToBN(rawMarket.fee),
		reserve0: parseDecimalToBN(rawMarket.reserve0),
		reserve1: parseDecimalToBN(rawMarket.reserve1),
		liquiditySupply: parseDecimalToBN(rawMarket.liquiditySupply),
		tradeVolume: parseDecimalToBN(rawMarket.tradeVolume),
		marketMetadata,
	};
}

export function roundDecimalStr(value, dp = 6) {
	let _value = value;
	try {
		if (typeof _value == "string") {
			_value = Number(_value);
		}
	} catch (e) {
		return 0;
	}

	return parseFloat(_value.toFixed(dp));
}

export function numStrFormatter(value, digits = 1) {
	let _value = value;
	try {
		if (typeof _value == "string") {
			_value = Number(_value);
		}
	} catch (e) {
		return 0;
	}

	if (_value > 1000000) {
		_value = (_value / 1000000).toFixed(digits) + "M";
	} else if (_value > 1000) {
		_value = (_value / 1000).toFixed(digits) + "K";
	} else {
		_value = String(_value);
	}
	return _value;
}

export function sliceAddress(address) {
	return `${address.slice(0, 6)}...${address.slice(
		address.length - 4,
		address.length
	)}`;
}

export function parseDecimalToBN(val, base = 18) {
	return ethers.utils.parseUnits(val, base);
}

export function formatBNToDecimal(val, base = 18, round = true, dp = 6) {
	val = ethers.utils.formatUnits(val, base);
	if (round === true) {
		val = roundDecimalStr(val, dp);
	}
	return val;
}

export function formatBNToDecimalCurr(val, base = 18, dp = 6) {
	return `${formatBNToDecimal(val, base, true, dp)} ${CURR_SYMBOL}`;
}

export function formatDecimalToCurr(value, dp = 6) {
	return `${roundDecimalStr(value, dp)} ${CURR_SYMBOL}`;
}

export function formatDecimalToPercentage(value, dp = 6) {
	return `${roundDecimalStr(value * 100, dp)}%`;
}

export function getDecStrAvgPriceBN(amountIn, amountOut) {
	if (!BigNumber.isBigNumber(amountIn) || !BigNumber.isBigNumber(amountOut)) {
		return "0.00";
	}
	if (amountIn.isZero() || amountOut.isZero()) {
		return "0.00";
	}
	return formatBNToDecimal(
		amountIn.mul(MULTIPLIER).div(amountOut),
		MULTIPLIER_BASE,
		true,
		6
	);
}

export function useBNInput(validationFn) {
	const [input, setInput] = useState("0");
	const [bnValue, setBnValue] = useState(BigNumber.from("0"));
	const [err, setErr] = useState(false);
	const [errText, setErrText] = useState("");

	useEffect(() => {
		try {
			let bn = parseDecimalToBN(
				`${input == "" || input == "." ? "0" : input}`
			);

			setBnValue(bn);
			if (validationFn != undefined) {
				let { valid, expStr } = validationFn(bn);
				if (!valid) {
					throw Error(expStr);
				}
			}
			setErr(false);
			setErrText("");
		} catch (e) {
			setErr(true);
			setErrText(e.message);
		}
	}, [input]);

	return {
		input,
		bnValue,
		setInput,
		err,
		errText,
	};
}

export function toBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
