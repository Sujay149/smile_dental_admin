import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error('❌ Missing required database environment variables!');
  console.error('Required: DB_HOST, DB_NAME, DB_USER, DB_PASSWORD');
  process.exit(1);
}

const sslConfig = (process.env.DB_SSL === 'true')
  ? { rejectUnauthorized: false }
  : false;

// Show a sanitized summary of DB connection config for debugging (don't log password)
console.log('DB config summary:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  ssl: !!sslConfig
});

const pool = new Pool({
  host: process.env.DB_HOST || 'database-1.cnwu8u0y2mg3.ap-south-1.rds.amazonaws.com',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME || 'dental_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Nsmiledental',
  max: 20,
  idleTimeoutMillis: 30000,
  // increase connection timeout to help during debugging
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT ? Number(process.env.DB_CONNECTION_TIMEOUT) : 10000,
  ssl: sslConfig
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
