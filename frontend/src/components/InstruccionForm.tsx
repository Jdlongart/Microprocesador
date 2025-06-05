import React, { useState } from 'react';

interface InstruccionFormProps {
  onSubmit: (instruccion: any) => void;
}

const InstruccionForm: React.FC<InstruccionFormProps> = ({ onSubmit }) => {
  const [instruccion, setInstruccion] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    sintaxis: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(instruccion);
    setInstruccion({
      nombre: '',
      codigo: '',
      descripcion: '',
      sintaxis: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
    </form>
  );
};

export default InstruccionForm;