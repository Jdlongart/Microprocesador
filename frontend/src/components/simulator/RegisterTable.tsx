import React from 'react';

interface Register {
  id: number;
  nombre: string;
  valor: number;
}

interface RegisterTableProps {
  registers: Register[];
  highlight?: string | null;
}

const RegisterTable: React.FC<RegisterTableProps> = ({ registers, highlight }) => {
  return (
    <div className="border rounded overflow-hidden">
      <h3 className="bg-gray-100 px-4 py-2 font-semibold">Registros</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Registro</th>
            <th className="px-4 py-2 text-right">Valor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {registers.map((register) => (
            <tr 
              key={register.id} 
              className={highlight === register.nombre ? 'bg-yellow-100' : ''}
            >
              <td className="px-4 py-2 font-mono">{register.nombre}</td>
              <td className="px-4 py-2 text-right font-mono">
                {register.valor.toString(16).toUpperCase()}h 
                <span className="ml-2 text-gray-500">({register.valor})</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterTable;