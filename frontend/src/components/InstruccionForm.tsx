import React, { useState } from 'react';

interface InstruccionFormProps {
  onSubmit: (instruccion: any) => void;
}

const InstruccionForm: React.FC<InstruccionFormProps> = ({ onSubmit }) => {
  const [instruccion, setInstruccion] = useState({
    sentencia: '',
    registro: '',
    dir: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(instruccion);
    setInstruccion({
    sentencia: '',
    registro: '',
    dir: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
    </form>
  );
};

export default InstruccionForm;