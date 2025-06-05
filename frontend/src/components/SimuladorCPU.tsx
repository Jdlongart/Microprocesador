import React, { useState } from 'react';

interface Registros {
  [key: string]: number;
}

interface Flags {
  zero: boolean;
  carry: boolean;
  sign: boolean;
  overflow: boolean;
}

const SimuladorCPU: React.FC = () => {
  const [registros, setRegistros] = useState<Registros>({
    AX: 0,
    BX: 0,
    CX: 0,
    DX: 0,
  });
  
  const [flags, setFlags] = useState<Flags>({
    zero: false,
    carry: false,
    sign: false,
    overflow: false,
  });
  
  const [memoria, setMemoria] = useState<number[]>(Array(256).fill(0));
  const [codigo, setCodigo] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);

  const ejecutarInstruccion = () => {
    // Implementar lógica de ejecución aquí
    // Esto es solo un ejemplo básico
    if (codigo.startsWith('MOV')) {
      const partes = codigo.split(' ');
      const destino = partes[1];
      const valor = parseInt(partes[2]);
      
      if (!isNaN(valor)) {
        setRegistros(prev => ({ ...prev, [destino]: valor }));
        setOutput([...output, `MOV: ${destino} = ${valor}`]);
      }
    }
    // Agregar más instrucciones...
  };

  return (
    <div className="simulador-cpu">
      <div className="panel-codigo">
        <textarea 
          value={codigo} 
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ingrese código de instrucciones..."
        />
        <button onClick={ejecutarInstruccion}>Ejecutar</button>
      </div>
      
      <div className="panel-registros">
        <h3>Registros</h3>
        {Object.entries(registros).map(([nombre, valor]) => (
          <div key={nombre}>
            {nombre}: {valor}
          </div>
        ))}
      </div>
      
      <div className="panel-flags">
        <h3>Flags</h3>
        {Object.entries(flags).map(([nombre, valor]) => (
          <div key={nombre}>
            {nombre}: {valor.toString()}
          </div>
        ))}
      </div>
      
      <div className="panel-output">
        <h3>Salida</h3>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default SimuladorCPU;