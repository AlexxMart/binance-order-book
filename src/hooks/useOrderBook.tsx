import { useEffect, useState } from 'react'

interface bidInterface {
	asks: [number, number][];
	bids: [number, number][];
	lastUpdateId: number;
}

export const useOrderBook = (pair: string) => {
	const [orders, setOrders] = useState<bidInterface>();
	useEffect(() => {
		const ws = new WebSocket("wss://stream.binance.com:9443/ws");
		const apiCall = {
			id: 1,
			params: [`${pair.toLowerCase()}@depth20@1000ms`],
			method: "SUBSCRIBE",
		};

		ws.onopen = () => {
			ws.send(JSON.stringify(apiCall));
		};

		ws.onmessage = function (event) {
			const msg: bidInterface = JSON.parse(event.data);
			setOrders(msg)
		};

		return () => ws.close();
	}, [pair]);

	return orders
}