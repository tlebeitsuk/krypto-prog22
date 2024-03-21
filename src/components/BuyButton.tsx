"use client";
import { addTransaction } from "@/app/actions";

function buy(symbol: string, price: string) {
	const count = prompt(`How many ${symbol}?`);
	addTransaction(Number(count), symbol, price);
}

export default function BuyButton(props: { symbol: string; price: string }) {
	return <button onClick={() => buy(props.symbol, props.price)}>Buy</button>;
}
