import React from 'react';

interface InstruccionListProps {
  instrucciones: any[];
}

const InstruccionList: React.FC<InstruccionListProps> = ({ instrucciones }) => {
  return (
    <div>
      {instrucciones.map(inst => (
        <div key={inst.id}>
          <h3>{inst.sentencia}</h3>
          <p>{inst.sentencia}</p>
        </div>
      ))}
    </div>
  );
};

export default InstruccionList;