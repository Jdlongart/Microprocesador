interface SyntaxError {
  line: number;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  errors: SyntaxError[];
}

const validOperations = [
  'MOV', 'LOAD', 'STORE', 'ADD', 'SUB', 'MUL', 'DIV', 
  'CMP', 'JMP', 'JE', 'JNE', 'JG', 'JGE', 'JL', 'JLE', 'JZ', 'JNZ'
];

const registerPattern = /^R\d+$/;
const addressPattern = /^\[\d+\]$/;

export const validateAssembler = (code: string): ValidationResult => {
  const lines = code.split('\n');
  const errors: SyntaxError[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') return;
    
    const parts = trimmedLine.split(/\s+/);
    const operation = parts[0].toUpperCase();
    
    // Validar operación
    if (!validOperations.includes(operation)) {
      errors.push({
        line: index + 1,
        message: `Operación desconocida: ${operation}`
      });
      return;
    }
    
    // Validar operandos según operación
    const operands = parts.slice(1).join('').split(',');
    
    switch(operation) {
      case 'MOV':
      case 'ADD':
      case 'SUB':
      case 'MUL':
      case 'DIV':
        if (operands.length !== 2) {
          errors.push({
            line: index + 1,
            message: `${operation} requiere exactamente 2 operandos`
          });
        } else {
          if (!registerPattern.test(operands[0])) {
            errors.push({
              line: index + 1,
              message: `Primer operando debe ser un registro (ej: R1)`
            });
          }
        }
        break;
      
      case 'LOAD':
        if (operands.length !== 2) {
          errors.push({
            line: index + 1,
            message: `LOAD requiere exactamente 2 operandos`
          });
        } else {
          if (!registerPattern.test(operands[0])) {
            errors.push({
              line: index + 1,
              message: `Primer operando debe ser un registro (ej: R1)`
            });
          }
          if (!addressPattern.test(operands[1])) {
            errors.push({
              line: index + 1,
              message: `Segundo operando debe ser una dirección de memoria (ej: [100])`
            });
          }
        }
        break;
      
      case 'STORE':
        if (operands.length !== 2) {
          errors.push({
            line: index + 1,
            message: `STORE requiere exactamente 2 operandos`
          });
        } else {
          if (!addressPattern.test(operands[0])) {
            errors.push({
              line: index + 1,
              message: `Primer operando debe ser una dirección de memoria (ej: [100])`
            });
          }
          if (!registerPattern.test(operands[1])) {
            errors.push({
              line: index + 1,
              message: `Segundo operando debe ser un registro (ej: R1)`
            });
          }
        }
        break;
      
      case 'CMP':
        if (operands.length !== 2) {
          errors.push({
            line: index + 1,
            message: `CMP requiere exactamente 2 operandos`
          });
        }
        break;
      
      case 'JMP':
      case 'JE':
      case 'JNE':
      case 'JG':
      case 'JGE':
      case 'JL':
      case 'JLE':
      case 'JZ':
      case 'JNZ':
        if (operands.length !== 1) {
          errors.push({
            line: index + 1,
            message: `${operation} requiere exactamente 1 operando (etiqueta)`
          });
        }
        break;
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};