interface ExecutionResult {
  registers: { name: string; value: number }[];
  memory: { address: number; value: number }[];
  updatedRegister?: string;
  updatedMemory?: number;
}

export class Simulator {
  private registers: Map<string, number>;
  private memory: Map<number, number>;
  private flags: { ZF: boolean; CF: boolean; OF: boolean };
  private pc: number;
  private instructions: string[];
  private labels: Map<string, number>;

  constructor() {
    this.registers = new Map();
    this.memory = new Map();
    this.flags = { ZF: false, CF: false, OF: false };
    this.pc = 0;
    this.instructions = [];
    this.labels = new Map();
  }

  public async initialize() {
    // Inicializar registros y memoria desde la base de datos
    // Esto se haría en el servicio real, aquí es solo para simulación
    this.registers.set('R1', 0);
    this.registers.set('R2', 0);
    this.registers.set('R3', 0);
    this.registers.set('R4', 0);
    this.memory.set(0, 0);
    this.memory.set(1, 0);
    // ... etc
  }

  public loadInstructions(instructions: string[]) {
    this.instructions = instructions;
    this.pc = 0;
    this.labels = new Map();

    // Primera pasada para encontrar etiquetas
    instructions.forEach((instr, index) => {
      const parts = instr.trim().split(/\s+/);
      if (parts[0].endsWith(':')) {
        const label = parts[0].slice(0, -1);
        this.labels.set(label, index);
      }
    });
  }

  public executeStep(): ExecutionResult | null {
    if (this.pc >= this.instructions.length) {
      return null;
    }

    const instruction = this.instructions[this.pc];
    const result = this.executeInstruction(instruction);
    this.pc++;
    return result;
  }

  private executeInstruction(instruction: string): ExecutionResult {
    const parts = instruction.trim().split(/\s+/);
    if (parts[0].endsWith(':')) {
      // Es una etiqueta, no hacer nada
      return { registers: [], memory: [] };
    }

    const op = parts[0].toUpperCase();
    const operands = parts.slice(1).join('').split(',').map(op => op.trim());

    let updatedRegister: string | undefined;
    let updatedMemory: number | undefined;

    switch (op) {
      case 'MOV':
        this.mov(operands[0], operands[1]);
        updatedRegister = operands[0];
        break;
      case 'LOAD':
        this.load(operands[0], operands[1]);
        updatedRegister = operands[0];
        break;
      case 'STORE':
        this.store(operands[0], operands[1]);
        updatedMemory = this.extractAddress(operands[0]);
        break;
      case 'ADD':
        this.add(operands[0], operands[1]);
        updatedRegister = operands[0];
        break;
      case 'SUB':
        this.sub(operands[0], operands[1]);
        updatedRegister = operands[0];
        break;
      case 'MUL':
        this.mul(operands[0], operands[1]);
        updatedRegister = operands[0];
        break;
      case 'DIV':
        this.div(operands[0], operands[1]);
        updatedRegister = operands[0];
        break;
      case 'CMP':
        this.cmp(operands[0], operands[1]);
        break;
      case 'JMP':
        this.jmp(operands[0]);
        break;
      case 'JE':
        if (this.flags.ZF) this.jmp(operands[0]);
        break;
      case 'JNE':
        if (!this.flags.ZF) this.jmp(operands[0]);
        break;
      case 'JG':
        if (!this.flags.ZF && !this.flags.OF) this.jmp(operands[0]);
        break;
      case 'JGE':
        if (!this.flags.OF) this.jmp(operands[0]);
        break;
      case 'JL':
        if (this.flags.OF) this.jmp(operands[0]);
        break;
      case 'JLE':
        if (this.flags.ZF || this.flags.OF) this.jmp(operands[0]);
        break;
      case 'JZ':
        if (this.flags.ZF) this.jmp(operands[0]);
        break;
      case 'JNZ':
        if (!this.flags.ZF) this.jmp(operands[0]);
        break;
      default:
        throw new Error(`Instrucción no soportada: ${op}`);
    }

    return {
      registers: Array.from(this.registers).map(([name, value]) => ({ name, value })),
      memory: Array.from(this.memory).map(([address, value]) => ({ address, value })),
      updatedRegister,
      updatedMemory
    };
  }

  private mov(dest: string, src: string) {
    const value = this.getOperandValue(src);
    this.setRegister(dest, value);
  }

  private load(reg: string, addr: string) {
    const address = this.extractAddress(addr);
    const value = this.memory.get(address) || 0;
    this.setRegister(reg, value);
  }

  private store(addr: string, reg: string) {
    const address = this.extractAddress(addr);
    const value = this.registers.get(reg) || 0;
    this.memory.set(address, value);
  }

  private add(dest: string, src: string) {
    const current = this.registers.get(dest) || 0;
    const value = this.getOperandValue(src);
    const result = current + value;
    this.setRegister(dest, result);
    this.flags.OF = result > 0xFFFF; // Overflow para 16 bits
    this.flags.ZF = result === 0;
  }

  private sub(dest: string, src: string) {
    const current = this.registers.get(dest) || 0;
    const value = this.getOperandValue(src);
    const result = current - value;
    this.setRegister(dest, result);
    this.flags.OF = result < 0; // Overflow para 16 bits
    this.flags.ZF = result === 0;
  }

  private mul(dest: string, src: string) {
    const current = this.registers.get(dest) || 0;
    const value = this.getOperandValue(src);
    const result = current * value;
    this.setRegister(dest, result);
    this.flags.OF = result > 0xFFFF; 
    this.flags.ZF = result === 0;
  }

  private div(dest: string, src: string) {
    const current = this.registers.get(dest) || 0;
    const value = this.getOperandValue(src);
    if (value === 0) throw new Error("División por cero");
    const result = Math.floor(current / value);
    this.setRegister(dest, result);
    this.flags.ZF = result === 0;
  }

  private cmp(op1: string, op2: string) {
    const val1 = this.getOperandValue(op1);
    const val2 = this.getOperandValue(op2);
    const diff = val1 - val2;
    this.flags.ZF = diff === 0;
    this.flags.OF = diff < 0;
  }

  private jmp(label: string) {
    const target = this.labels.get(label);
    if (target === undefined) throw new Error(`Etiqueta no encontrada: ${label}`);
    this.pc = target;
  }

  private getOperandValue(operand: string): number {
    if (operand.startsWith('[') && operand.endsWith(']')) {
      const address = this.extractAddress(operand);
      return this.memory.get(address) || 0;
    } else if (this.registers.has(operand)) {
      return this.registers.get(operand) || 0;
    } else if (!isNaN(parseInt(operand))) {
      return parseInt(operand);
    }
    throw new Error(`Operando inválido: ${operand}`);
  }

  private extractAddress(addr: string): number {
    const match = addr.match(/^\[(\d+)\]$/);
    if (!match) throw new Error(`Dirección inválida: ${addr}`);
    return parseInt(match[1]);
  }

  private setRegister(name: string, value: number) {
    this.registers.set(name, value);
  }
}