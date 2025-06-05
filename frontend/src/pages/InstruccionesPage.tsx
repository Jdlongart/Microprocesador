import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InstruccionList from '../components/InstruccionList';
import InstruccionForm from '../components/InstruccionForm';

const InstruccionesPage: React.FC = () => {
  const [instrucciones, setInstrucciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstrucciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/instrucciones');
        setInstrucciones(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching instrucciones:', error);
        setLoading(false);
      }
    };

    fetchInstrucciones();
  }, []);

  const handleAddInstruccion = async (instruccion: any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/instrucciones', instruccion);
      setInstrucciones([...instrucciones, response.data]);
    } catch (error) {
      console.error('Error adding instruccion:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Administrar Instrucciones</h1>
      <InstruccionForm onSubmit={handleAddInstruccion} />
      <InstruccionList instrucciones={instrucciones} />
    </div>
  );
};

export default InstruccionesPage;