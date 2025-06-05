import React from 'react';
import SimuladorCPU from '../components/SimuladorCPU';

const SimuladorPage: React.FC = () => {
  return (
    <div>
      <h1>Simulador de Microprocesador</h1>
      <SimuladorCPU />
    </div>
  );
};

export default SimuladorPage;