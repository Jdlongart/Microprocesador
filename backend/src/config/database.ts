import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simulador_micro',
  password: '4513560',
  port: 5432,
});

export default pool;