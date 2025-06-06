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
    const { nombre, clave } = req.body as { nombre: string; clave: string }; // Tipado del body
    if (!nombre || !clave) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }
    const hashedPassword = await bcrypt.hash(clave, 10);
    
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nombre, clave) VALUES ($1, $2) RETURNING id, nombre',
      [nombre, hashedPassword]
    );
    
    return res.status(201).json(rows[0]); // Asegúrate de retornar la respuesta
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { nombre, clave } = req.body as { nombre: string; clave: string };
    if (!nombre || !clave) {
      return res.status(400).json({ message: 'Username y password son requeridos' });
    }
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [nombre]);
    
    if (rows.length === 0 || !(await bcrypt.compare(clave, rows[0].clave))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ userId: rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { id: rows[0].id, nombre: rows[0].nombre } }); // Usa return
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

export default router;