import { Memory } from "../models/memory.model";
import { AppDataSource } from "../config/db";

export class MemoryService {
  private memoryRepository = AppDataSource.getRepository(Memory);

  async getAllMemory(): Promise<Memory[]> {
    return this.memoryRepository.find();
  }

  async createMemory(address: number, value: number = 0): Promise<Memory> {
    const memory = this.memoryRepository.create({ address, value });
    return this.memoryRepository.save(memory);
  }

  async updateMemory(id: number, value: number): Promise<Memory | null> {
    const memory = await this.memoryRepository.findOne({ where: { id } });
    if (!memory) return null;
    
    memory.value = value;
    return this.memoryRepository.save(memory);
  }

  async deleteMemory(id: number): Promise<void> {
    await this.memoryRepository.delete(id);
  }
}