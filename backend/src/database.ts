import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql2.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'saas_estetica',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  timezone: '+00:00',
})

pool.getConnection().then(conn => {
  conn.query("SET NAMES 'utf8mb4'")
  conn.release()
})

export default pool