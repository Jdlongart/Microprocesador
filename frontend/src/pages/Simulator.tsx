import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from '../components/simulator/CodeEditor';
import InstructionsTable from '../components/simulator/InstructionsTable';
import ExecutionControls from '../components/simulator/ExecutionControls';
import RegisterTable from '../components/simulator/RegisterTable';
import MemoryTable from '../components/simulator/MemoryTable';
import { validateAssembler } from '../utils/assemblerValidator';
import { saveProgram, executeInstruction } from '../services/instructions';
import { getRegisters, getMemory } from '../services/memory';
import { useAuth } from '../contexts/AuthContext';

interface Instruction {
  id: number;
  line: number;
  content: string;
}

const SimulatorPage: React.FC = () => {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [errors, setErrors] = useState<{ line: number; message: string }[]>([]);
  const [registers, setRegisters] = useState<any[]>([]);
  const [memory, setMemory] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [highlightRegister, setHighlightRegister] = useState<string | null>(null);
  const [highlightMemory, setHighlightMemory] = useState<number | null>(null);
  const executionRef = useRef<NodeJS.Timeout | null>(null);
  const nextInstructionRef = useRef(0);

  // Cargar registros y memoria al iniciar
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const regs = await getRegisters();
        const mem = await getMemory();
        setRegisters(regs);
        setMemory(mem);
      }
    };
    fetchData();
  }, [user]);

  // Limpiar ejecución al desmontar
  useEffect(() => {
    return () => {
      if (executionRef.current) {
        clearInterval(executionRef.current);
      }
    };
  }, []);

  const handleAddInstruction = () => {
    if (!code.trim()) return;
    
    const validation = validateAssembler(code);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors([]);
    
    const newInstruction = {
      id: Date.now(),
      line: instructions.length + 1,
      content: code.trim()
    };
    
    setInstructions([...instructions, newInstruction]);
    setCode('');
  };

  const handleRemoveInstruction = (id: number) => {
    setInstructions(instructions.filter(inst => inst.id !== id));
  };

  const handleClearInstructions = () => {
    setInstructions([]);
    stopExecution();
  };

  const executeSingleInstruction = async () => {
    if (nextInstructionRef.current >= instructions.length) {
      stopExecution();
      return;
    }
    
    const instruction = instructions[nextInstructionRef.current];
    setCurrentLine(instruction.line);
    
    try {
      const result = await executeInstruction(instruction.content);
      
      // Actualizar estado con los nuevos valores
      setRegisters(result.registers);
      setMemory(result.memory);
      
      // Destacar cambios
      if (result.updatedRegister) {
        setHighlightRegister(result.updatedRegister);
        setTimeout(() => setHighlightRegister(null), 1000);
      }
      if (result.updatedMemory) {
        setHighlightMemory(result.updatedMemory);
        setTimeout(() => setHighlightMemory(null), 1000);
      }
      
      nextInstructionRef.current++;
      
      // Si es la última instrucción, detener ejecución
      if (nextInstructionRef.current >= instructions.length) {
        stopExecution();
      }
    } catch (error) {
      console.error("Error al ejecutar instrucción:", error);
      stopExecution();
    }
  };

  const startExecution = () => {
    if (instructions.length === 0) return;
    
    setIsRunning(true);
    nextInstructionRef.current = 0;
    
    executionRef.current = setInterval(() => {
      executeSingleInstruction();
    }, 1000);
  };

  const stopExecution = () => {
    if (executionRef.current) {
      clearInterval(executionRef.current);
      executionRef.current = null;
    }
    setIsRunning(false);
  };

  const handleStep = () => {
    if (isRunning) return;
    executeSingleInstruction();
  };

  const handleRun = () => {
    if (isRunning) return;
    startExecution();
  };

  const handlePause = () => {
    stopExecution();
  };

  const handleReset = () => {
    stopExecution();
    setCurrentLine(null);
    nextInstructionRef.current = 0;
    
    // Restaurar registros y memoria a estado inicial
    const fetchData = async () => {
      const regs = await getRegisters();
      const mem = await getMemory();
      setRegisters(regs);
      setMemory(mem);
    };
    fetchData();
  };

  const handleSaveProgram = async () => {
    if (instructions.length === 0) {
      alert('No hay instrucciones para guardar');
      return;
    }
    
    try {
      const program = instructions.map(inst => inst.content).join('\n');
      await saveProgram(program);
      alert('Programa guardado exitosamente');
    } catch (error) {
      console.error("Error al guardar programa:", error);
      alert('Error al guardar el programa');
    }
  };

  const handleExecuteAll = () => {
    if (instructions.length === 0) return;
    
    // Ejecutar todas las instrucciones de una vez
    const executeAll = async () => {
      stopExecution();
      setCurrentLine(null);
      nextInstructionRef.current = 0;
      
      for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        setCurrentLine(instruction.line);
        
        try {
          const result = await executeInstruction(instruction.content);
          setRegisters(result.registers);
          setMemory(result.memory);
          
          // Pequeña pausa para visualización
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
          console.error("Error al ejecutar instrucción:", error);
          break;
        }
      }
    };
    
    executeAll();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Simulador de Instrucciones</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CodeEditor 
            value={code} 
            onChange={setCode} 
            onAddInstruction={handleAddInstruction}
            errors={errors}
          />
          
          <InstructionsTable 
            instructions={instructions} 
            onRemove={handleRemoveInstruction}
            onExecute={handleExecuteAll}
            onClear={handleClearInstructions}
          />
          
          <div className="flex justify-end">
            <button 
              onClick={handleSaveProgram}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Guardar Programa
            </button>
          </div>
        </div>
        
        <div>
          <ExecutionControls 
            onStep={handleStep}
            onRun={handleRun}
            onPause={handlePause}
            onReset={handleReset}
            isRunning={isRunning}
            currentLine={currentLine}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <RegisterTable 
              registers={registers} 
              highlight={highlightRegister}
            />
            <MemoryTable 
              memory={memory} 
              highlight={highlightMemory}
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Instrucciones Soportadas</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="font-mono">MOV dest, src</div>
              <div className="font-mono">LOAD reg, [addr]</div>
              <div className="font-mono">STORE [addr], reg</div>
              <div className="font-mono">ADD dest, src</div>
              <div className="font-mono">SUB dest, src</div>
              <div className="font-mono">MUL dest, src</div>
              <div className="font-mono">DIV dest, src</div>
              <div className="font-mono">CMP op1, op2</div>
              <div className="font-mono">JMP label</div>
              <div className="font-mono">JE label</div>
              <div className="font-mono">JNE label</div>
              <div className="font-mono">JG label</div>
              <div className="font-mono">JGE label</div>
              <div className="font-mono">JL label</div>
              <div className="font-mono">JLE label</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;