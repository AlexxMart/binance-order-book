import { useEffect, useState } from "react";

interface miniTickerStreamInterface {
	c: string; // Close price
	o: string; // Open price
	h: string; // High price
	l: string; // Low price
}

export const useSymbolStream = (pair: string) => {
	const [price, setPrice] = useState("");

	useEffect(() => {
		const ws = new WebSocket("wss://stream.binance.com:9443/ws");
		const apiCall = {
			id: 1,
			params: [`${pair.toLowerCase()}@miniTicker`],
			method: "SUBSCRIBE",
		};

		ws.onopen = () => {
			ws.send(JSON.stringify(apiCall));
		};

		ws.onmessage = function (event) {
			const msg: miniTickerStreamInterface = JSON.parse(event.data);
			setPrice(msg.c);
		};

		return () => ws.close();
	}, [pair]);

	return price;
};
