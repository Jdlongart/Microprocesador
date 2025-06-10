import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAddInstruction: () => void;
  errors: { line: number; message: string }[];
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  onAddInstruction,
  errors 
}) => {
  const lines = value.split('\n');
  
  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        Escribe instrucciones (ej: MOV R1, 5):
      </label>
      <div className="flex">
        <div className="border rounded-l flex flex-col items-center p-2 bg-gray-100">
          {lines.map((_, i) => (
            <div 
              key={i} 
              className={`h-6 w-8 text-center ${errors.some(e => e.line === i+1) ? 'text-red-500' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          className="flex-grow p-2 border rounded-r font-mono"
          placeholder="MOV R1, 5&#10;ADD R1, 10&#10;STORE [100], R1"
        />
      </div>
      
      {errors.length > 0 && (
        <div className="mt-2 text-red-600">
          {errors.map((error, idx) => (
            <div key={idx}>Línea {error.line}: {error.message}</div>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <button 
          onClick={onAddInstruction}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar Instrucción
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;