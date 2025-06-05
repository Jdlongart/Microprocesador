import { Router } from 'express';
import { Request, Response } from 'express'; // Importación explícita
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { JWT_SECRET } from '../config/constants';

const router = Router();

// Tipado completo para Request y Response
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as { username: string; password: string }; // Tipado del body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { rows } = await pool.query(
      'INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    
    return res.status(201).json(rows[0]); // Asegúrate de retornar la respuesta
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as { username: string; password: string };
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    
    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ userId: rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { id: rows[0].id, username: rows[0].username } }); // Usa return
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

export default router;