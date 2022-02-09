import { useQuery } from "urql";

const QueryAllMarketes = `
    query {
        markets {
            id
            marketIdentifier
            cToken
            fee
            manager
            group
            outcomeFractions
            tokenId0
            tokenId1
            reserve0
            reserve1
            liquiditySupply
            timestamp
            tradeVolume
            lastActionTimestamp
            tradesCount
        }
    }
`;

export function useQueryAllMarkets(pause) {
	const [result, reexecuteQuery] = useQuery({
		query: QueryAllMarketes,
		variables: {},
		pause,
	});
	return {
		result,
		reexecuteQuery,
	};
}
