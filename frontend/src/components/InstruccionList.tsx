import React from 'react';

interface InstruccionListProps {
  instrucciones: any[];
}

const InstruccionList: React.FC<InstruccionListProps> = ({ instrucciones }) => {
  return (
    <div>
      {instrucciones.map(inst => (
        <div key={inst.id}>
          <h3>{inst.nombre}</h3>
          <p>{inst.codigo}</p>
        </div>
      ))}
    </div>
  );
};

export default InstruccionList;