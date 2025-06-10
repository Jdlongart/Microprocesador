import { Register } from "../models/register.model";
import { AppDataSource } from "../config/db";

export class RegisterService {
  private registerRepository = AppDataSource.getRepository(Register);

  async getAllRegisters(): Promise<Register[]> {
    return this.registerRepository.find();
  }

  async createRegister(name: string, value: number = 0): Promise<Register> {
    const register = this.registerRepository.create({ name, value });
    return this.registerRepository.save(register);
  }

  async updateRegister(id: number, value: number): Promise<Register | null> {
    const register = await this.registerRepository.findOne({ where: { id } });
    if (!register) return null;
    
    register.value = value;
    return this.registerRepository.save(register);
  }

  async deleteRegister(id: number): Promise<void> {
    await this.registerRepository.delete(id);
  }
}