import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'nexleaf_db',
  port: Number(process.env.MYSQL_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
});

export async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('[NexLeaf] MySQL connected successfully');
    connection.release();
  } catch (error) {
    console.error('[NexLeaf] MySQL connection failed:', error);
  }
}



testDatabaseConnection();