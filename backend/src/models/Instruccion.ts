import pool from '../config/database';

export interface Instruccion {
  id?: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  sintaxis: string;
  usuario_id?: number;
}

export const getAllInstrucciones = async (): Promise<Instruccion[]> => {
  const { rows } = await pool.query('SELECT * FROM instrucciones');
  return rows;
};

export const createInstruccion = async (instruccion: Instruccion): Promise<Instruccion> => {
  const { nombre, codigo, descripcion, sintaxis, usuario_id } = instruccion;
  const { rows } = await pool.query(
    'INSERT INTO instrucciones (nombre, codigo, descripcion, sintaxis, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, codigo, descripcion, sintaxis, usuario_id || null]
  );
  return rows[0];
};

// Agregar más funciones CRUD según sea necesario