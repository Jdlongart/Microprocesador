import { Pool } from 'pg';

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'simulador_micro',
  password: 'tu_contraseña',
  port: 5432,
});

export default pool;