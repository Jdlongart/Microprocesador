import React, { useState, useEffect } from 'react';
import { 
  createMemory, 
  deleteMemory, 
  getMemory, 
  updateMemory 
} from '../../services/memory';

const MemoryManager: React.FC = () => {
  const [memory, setMemory] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState('');
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMemory();
  }, []);

  const fetchMemory = async () => {
    const data = await getMemory();
    setMemory(data);
  };

  const handleCreate = async () => {
    const address = parseInt(newAddress);
    const value = parseInt(newValue);
    
    if (isNaN(address) || address < 0) {
      setError('Dirección inválida');
      return;
    }
    
    if (isNaN(value)) {
      setError('Valor inválido');
      return;
    }
    
    if (memory.some(m => m.direccion === address)) {
      setError('La dirección ya existe');
      return;
    }
    
    try {
      await createMemory({ direccion: address, valor: value });
      fetchMemory();
      setNewAddress('');
      setNewValue('');
      setError('');
    } catch (err) {
      setError('Error al crear la dirección de memoria');
    }
  };

  const handleUpdate = async (id: number, value: number) => {
    try {
      await updateMemory(id, value);
      fetchMemory();
    } catch (err) {
      console.error("Error al actualizar memoria:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMemory(id);
      fetchMemory();
    } catch (err) {
      console.error("Error al eliminar memoria:", err);
    }
  };

  return (
    <div className="border rounded p-4">
      <h3 className="text-xl font-semibold mb-4">Administrar Memoria</h3>
      
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Dirección:</label>
            <input
              type="number"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Ej: 100"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Valor:</label>
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Ej: 42"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Agregar
            </button>
          </div>
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
      
      <div className="border rounded overflow-hidden max-h-96 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Valor</th>
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {memory.map((mem) => (
              <tr key={mem.id}>
                <td className="px-4 py-2 font-mono">[{mem.direccion}]</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={mem.valor}
                    onChange={(e) => handleUpdate(mem.id, parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleDelete(mem.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemoryManager;