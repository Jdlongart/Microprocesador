import React from 'react';

interface Instruction {
  id: number;
  line: number;
  content: string;
}

interface InstructionsTableProps {
  instructions: Instruction[];
  onRemove: (id: number) => void;
  onExecute: () => void;
  onClear: () => void;
}

const InstructionsTable: React.FC<InstructionsTableProps> = ({ 
  instructions, 
  onRemove, 
  onExecute,
  onClear
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Instrucciones a Ejecutar</h3>
        <div className="space-x-2">
          <button 
            onClick={onExecute}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ejecutar Todo
          </button>
          <button 
            onClick={onClear}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Limpiar Todo
          </button>
        </div>
      </div>
      
      {instructions.length === 0 ? (
        <div className="text-gray-500 italic">No hay instrucciones agregadas</div>
      ) : (
        <div className="border rounded overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Instrucción</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {instructions.map((instruction) => (
                <tr key={instruction.id}>
                  <td className="px-4 py-2">{instruction.line}</td>
                  <td className="px-4 py-2 font-mono">{instruction.content}</td>
                  <td className="px-4 py-2 text-right">
                    <button 
                      onClick={() => onRemove(instruction.id)}
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
      )}
    </div>
  );
};

export default InstructionsTable;