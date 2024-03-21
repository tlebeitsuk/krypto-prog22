import BuyButton from "@/components/BuyButton";

async function getData() {
	const res = await fetch("https://api.coincap.io/v2/assets");
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

type crypto = {
	id: string;
	symbol: string;
	name: string;
	priceUsd: string;
	changePercent24Hr: string;
};

export default async function Home() {
	const { data } = await getData();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ul>
				{data.map((crypto: crypto) => (
					<li key={crypto.id} className="space-x-12">
						<span>{crypto.symbol}</span>
						<span>{crypto.name}</span>
						<span>{crypto.priceUsd}</span>
						<span>{crypto.changePercent24Hr}</span>
						<BuyButton symbol={crypto.symbol} price={crypto.priceUsd} />
					</li>
				))}
			</ul>
		</main>
	);
}
