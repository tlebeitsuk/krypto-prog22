import BuyButton from "@/components/BuyButton";
import Transactions from "@/components/Transactions";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

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
		<main className="flex min-h-screen flex-col items-center justify-between p-24 gap-16">
			<Transactions api={data} />
			<div className="w-full">
				<h2 className="text-2xl font-semibold pb-2">List</h2>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Symbol</TableHead>
							<TableHead>Name</TableHead>
							<TableHead className="text-right">Price</TableHead>
							<TableHead className="text-right">Change 24Hr</TableHead>
							<TableHead> </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((crypto: crypto) => (
							<TableRow key={crypto.id}>
								<TableCell>{crypto.symbol}</TableCell>
								<TableCell>{crypto.name}</TableCell>
								<TableCell className="text-right">
									{Number(crypto.priceUsd).toLocaleString("fi-FI", {
										style: "currency",
										currency: "USD",
									})}
								</TableCell>
								<TableCell
									className={
										Number(crypto.changePercent24Hr) > 0
											? "text-green-400 text-right"
											: "text-red-400 text-right"
									}
								>
									{Number(crypto.changePercent24Hr).toFixed(2)}%
								</TableCell>
								<TableCell className="text-right">
									<BuyButton symbol={crypto.symbol} price={crypto.priceUsd} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
