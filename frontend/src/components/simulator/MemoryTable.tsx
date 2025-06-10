import React, { useState } from 'react';

interface Memory {
  id: number;
  direccion: number;
  valor: number;
}

interface MemoryTableProps {
  memory: Memory[];
  highlight?: number | null;
}

const MemoryTable: React.FC<MemoryTableProps> = ({ memory, highlight }) => {
  const [search, setSearch] = useState('');
  
  const filteredMemory = memory.filter(mem => 
    mem.direccion.toString().includes(search) || 
    mem.valor.toString().includes(search)
  );

  return (
    <div className="border rounded overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <h3 className="font-semibold">Memoria</h3>
        <input
          type="text"
          placeholder="Buscar dirección o valor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 py-1 border rounded text-sm w-64"
        />
      </div>
      <div className="max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMemory.map((mem) => (
              <tr 
                key={mem.id} 
                className={highlight === mem.direccion ? 'bg-yellow-100' : ''}
              >
                <td className="px-4 py-2 font-mono">[{mem.direccion}]</td>
                <td className="px-4 py-2 font-mono">
                  {mem.valor.toString(16).toUpperCase()}h 
                  <span className="ml-2 text-gray-500">({mem.valor})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemoryTable;