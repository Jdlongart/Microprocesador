import React from 'react';

interface ExecutionControlsProps {
  onStep: () => void;
  onRun: () => void;
  onPause: () => void;
  onReset: () => void;
  isRunning: boolean;
  currentLine: number | null;
}

const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  onStep,
  onRun,
  onPause,
  onReset,
  isRunning,
  currentLine
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Controles de Ejecución</h3>
        {currentLine !== null && (
          <div className="text-sm text-gray-600">
            Línea actual: <span className="font-bold">{currentLine}</span>
          </div>
        )}
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onStep}
          disabled={isRunning}
          className={`px-4 py-2 rounded ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Paso a Paso
        </button>
        
        {isRunning ? (
          <button
            onClick={onPause}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Pausar
          </button>
        ) : (
          <button
            onClick={onRun}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Ejecutar Automático
          </button>
        )}
        
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default ExecutionControls;