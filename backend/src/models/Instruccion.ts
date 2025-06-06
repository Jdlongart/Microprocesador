import pool from '../config/database';

export interface Instruccion {
  id: number;
  sentencia: string;
  id_dir: number;
  id_registro: number;
  id_usuario: number;
}

export const getAllInstrucciones = async (): Promise<Instruccion[]> => {
  const { rows } = await pool.query('SELECT * FROM instrucciones');
  return rows;
};

export const createInstruccion = async (instruccion: Instruccion): Promise<Instruccion> => {
  const { sentencia, id_dir, id_registro, id_usuario } = instruccion;
  const { rows } = await pool.query(
    'INSERT INTO instrucciones (sentencia, id_dir, id_registro, id_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
    [ sentencia, id_dir, id_registro, id_usuario  || null]
  );
  return rows[0];
};

// Agregar más funciones CRUD según sea necesario