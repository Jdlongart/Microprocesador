import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { JWT_SECRET } from '../config/constants';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { rows } = await pool.query(
      'INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    
    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ userId: rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: rows[0].id, username: rows[0].username } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};