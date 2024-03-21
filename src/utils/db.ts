import { Pool } from "pg"

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
})

export const db = (text: string, params?: any, callback?: any) => {
  return pool.query(text, params, callback)
}
