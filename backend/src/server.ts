import express from 'express';
import cors from 'cors';
import instruccionesRoutes from './routes/instrucciones';
import authRoutes from './routes/auth';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API del Simulador de Microprocesadores' });
});

// Rutas
app.use('/api/instrucciones', instruccionesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});