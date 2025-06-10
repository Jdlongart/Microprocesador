import React, { useState, useEffect } from 'react';
import { 
  createRegister, 
  deleteRegister, 
  getRegisters, 
  updateRegister 
} from '../../services/registers';

const RegisterManager: React.FC = () => {
  const [registers, setRegisters] = useState<any[]>([]);
  const [newRegister, setNewRegister] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegisters();
  }, []);

  const fetchRegisters = async () => {
    const data = await getRegisters();
    setRegisters(data);
  };

  const handleCreate = async () => {
    if (!newRegister.trim()) {
      setError('El nombre del registro es requerido');
      return;
    }
    
    if (!/^R\d+$/.test(newRegister)) {
      setError('El nombre debe seguir el formato R<numero> (ej: R1)');
      return;
    }
    
    if (registers.some(r => r.nombre === newRegister)) {
      setError('El registro ya existe');
      return;
    }
    
    try {
      await createRegister({ nombre: newRegister, valor: 0 });
      fetchRegisters();
      setNewRegister('');
      setError('');
    } catch (err) {
      setError('Error al crear el registro');
    }
  };

  const handleUpdate = async (id: number, valor: number) => {
    try {
      await updateRegister(id, valor);
      fetchRegisters();
    } catch (err) {
      console.error("Error al actualizar registro:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRegister(id);
      fetchRegisters();
    } catch (err) {
      console.error("Error al eliminar registro:", err);
    }
  };

  return (
    <div className="border rounded p-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">Administrar Registros</h3>
      
      <div className="mb-4 flex items-end">
        <div className="flex-grow mr-2">
          <label className="block text-gray-700 mb-1">Nuevo Registro:</label>
          <input
            type="text"
            value={newRegister}
            onChange={(e) => setNewRegister(e.target.value)}
            placeholder="Ej: R5"
            className="w-full px-3 py-2 border rounded"
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear
        </button>
      </div>
      
      <div className="border rounded overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Registro</th>
              <th className="px-4 py-2 text-left">Valor</th>
              <th className="px-4 py-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {registers.map((reg) => (
              <tr key={reg.id}>
                <td className="px-4 py-2 font-mono">{reg.nombre}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={reg.valor}
                    onChange={(e) => handleUpdate(reg.id, parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleDelete(reg.id)}
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

export default RegisterManager;