import { getTransactions } from "@/app/actions";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

function calcResult(oldPrice, newPrice) {
	return ((newPrice - oldPrice) / oldPrice) * 100;
}

export default async function Transactions(props) {
	const data = await getTransactions();

	return (
		<div className="w-full">
			<h1 className="text-3xl font-semibold pb-2">Transactions</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Symbol</TableHead>
						<TableHead className="w-[100px] text-right">Count</TableHead>
						<TableHead className="text-right">Price</TableHead>
						<TableHead className="text-right">Change</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.map((transaction) => (
						<TableRow key={transaction.id}>
							<TableCell>{transaction.symbol}</TableCell>
							<TableCell className="text-right">{transaction.units}</TableCell>
							<TableCell className="text-right">
								{Number(transaction.purchaseprice).toLocaleString("fi-FI", {
									style: "currency",
									currency: "USD",
								})}
							</TableCell>
							<TableCell className="text-right">
								{calcResult(
									transaction.purchaseprice,
									props.api.filter(
										(crypto) => crypto.symbol === transaction.symbol,
									)[0].priceUsd,
								).toFixed(2)}
								%
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
