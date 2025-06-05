import pool from '../config/database';

export interface Usuario {
  id?: number;
  username: string;
  password: string;
}

export const findByUsername = async (username: string): Promise<Usuario | null> => {
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
  return rows[0] || null;
};

export const createUser = async (user: Usuario): Promise<Usuario> => {
  const { rows } = await pool.query(
    'INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING id, username',
    [user.username, user.password]
  );
  return rows[0];
};