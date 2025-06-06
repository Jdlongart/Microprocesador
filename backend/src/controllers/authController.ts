import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { JWT_SECRET } from '../config/constants';

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, clave } = req.body;
    const hashedClave = await bcrypt.hash(clave, 10);
    
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nombre, clave) VALUES ($1, $2) RETURNING id, nonbre',
      [nombre, hashedClave]
    );
    
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nombre, clave } = req.body;
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [nombre]);
    
    if (rows.length === 0 || !(await bcrypt.compare(clave, rows[0].clave))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ userId: rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: rows[0].id, nombre: rows[0].nombre } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};