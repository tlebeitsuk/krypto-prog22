"use server"
import { db } from "@/utils/db"

export async function addTransaction(
  count: number,
  symbol: string,
  price: string
) {
  console.log("buying", count, "of", symbol, "at", price)
  // Add count, symbol and price to a database
  await db(
    "INSERT INTO transactions (units, symbol, purchasePrice) VALUES ($1, $2, $3)",
    [count, symbol, Number.parseFloat(price)]
  )
}
