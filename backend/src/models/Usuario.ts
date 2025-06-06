import pool from '../config/database';

export interface Usuario {
  id?: number;
  nombre: string;
  clave: string;
}

export const findByUsername = async (nombre: string): Promise<Usuario | null> => {
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [nombre]);
  return rows[0] || null;
};

export const createUser = async (user: Usuario): Promise<Usuario> => {
  const { rows } = await pool.query(
    'INSERT INTO usuarios (nombre, clave) VALUES ($1, $2) RETURNING id, nombre',
    [user.nombre, user.clave]
  );
  return rows[0];
};