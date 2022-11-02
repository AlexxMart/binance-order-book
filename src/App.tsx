import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useOrderBook } from "./hooks/useOrderBook";
import { useSymbolStream } from "./hooks/useSymbolStream";
import { OrderBookTable } from "./components/OrderBookTable";

interface symbolsInterface {
	baseAsset: string;
	label: string;
	symbol: string;
	quoteAsset: string;
}

function App() {
	const [filter, setFilter] = useState("");
	const [pairs, setPairs] = useState<symbolsInterface[]>();
	// Manually setting an initial pair
	const [selectedPair, setSelectedPair] = useState<symbolsInterface>({
		baseAsset: "",
		label: "ETH/BTC",
		symbol: "ethbtc",
		quoteAsset: "",
	});

	useEffect(() => {
		/**
		 * This is a rather heavy call, but I decided to go with this approach because of the following:
		 *
		 * - It has a complete list of ALL pairs offered by Binance
		 * - It provides the base currency, quote currency and symbol
		 * - The size of the data fetches is 2.76MB
		 *
		 */
		fetch("https://api.binance.com/api/v3/exchangeInfo")
			.then((response) => response.json())
			.then((data) => {
				const symbolsArray = data.symbols.map(
					(symbolObject: symbolsInterface) => {
						return {
							baseAsset: symbolObject.baseAsset,
							label: `${symbolObject.baseAsset}/${symbolObject.quoteAsset}`,
							symbol: symbolObject.symbol,
							quoteAsset: symbolObject.quoteAsset,
						};
					}
				);

				function compare(a: symbolsInterface, b: symbolsInterface) {
					if (a.symbol < b.symbol) {
						return -1;
					}
					if (a.symbol > b.symbol) {
						return 1;
					}
					return 0;
				}

				symbolsArray.sort(compare);
				setPairs(symbolsArray);
			})
			.catch((error) => console.error(error));
	}, []);

	const orders = useOrderBook(selectedPair.symbol);
	const currentPrice = useSymbolStream(selectedPair.symbol);

	return (
		<div>
			<h1>{selectedPair.label}</h1>
			<h2>{currentPrice}</h2>

			<Autocomplete
				id="controllable-states-demo"
				isOptionEqualToValue={(option, value) => option.label === value.label}
				options={pairs || []}
				renderInput={(params) => <TextField {...params} label="Pair" />}
				value={selectedPair}
				onChange={(_: any, newValue) => {
					if (!newValue) return;
					setSelectedPair(newValue as symbolsInterface);
				}}
				sx={{
					margin: "0 auto",
					width: 200,
				}}
				inputValue={filter || ""}
				onInputChange={(_: any, newInputValue: string) => {
					setFilter(newInputValue);
				}}
			/>

			<OrderBookTable orders={orders} />
		</div>
	);
}

export default App;
