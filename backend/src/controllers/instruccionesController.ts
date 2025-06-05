import { Request, Response } from 'express';
import * as InstruccionModel from '../models/Instruccion';

export const getInstrucciones = async (req: Request, res: Response) => {
  try {
    const instrucciones = await InstruccionModel.getAllInstrucciones();
    res.json(instrucciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las instrucciones' });
  }
};

export const createInstruccion = async (req: Request, res: Response) => {
  try {
    const nuevaInstruccion = await InstruccionModel.createInstruccion(req.body);
    res.status(201).json(nuevaInstruccion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la instrucción' });
  }
};

// Agregar más controladores para update, delete, etc.