import { Register } from "../models/register.model";
import { Memory } from "../models/memory.model";
import { Simulator } from "../utils/assembler";
import { AppDataSource } from "../config/db";

export class SimulatorService {
  private simulator: Simulator;

  constructor() {
    this.simulator = new Simulator();
  }

  public async executeInstruction(instruction: string): Promise<any> {
    // Obtener el estado actual de registros y memoria
    const registerRepo = AppDataSource.getRepository(Register);
    const memoryRepo = AppDataSource.getRepository(Memory);

    const registers = await registerRepo.find();
    const memory = await memoryRepo.find();

    // Inicializar simulador con estado actual
    this.simulator = new Simulator();
    registers.forEach(reg => this.simulator.setRegister(reg.name, reg.value));
    memory.forEach(mem => this.simulator.memory.set(mem.address, mem.value));

    // Ejecutar la instrucción
    this.simulator.loadInstructions([instruction]);
    const result = this.simulator.executeStep();

    if (!result) {
      throw new Error("No se pudo ejecutar la instrucción");
    }

    // Actualizar la base de datos con los nuevos valores
    for (const reg of result.registers) {
      await registerRepo.update({ name: reg.name }, { value: reg.value });
    }

    for (const mem of result.memory) {
      await memoryRepo.update({ address: mem.address }, { value: mem.value });
    }

    return result;
  }

  public async executeProgram(programId: number): Promise<any> {
    // Implementar ejecución de programa completo
    // Similar a executeInstruction pero para múltiples instrucciones
  }
}