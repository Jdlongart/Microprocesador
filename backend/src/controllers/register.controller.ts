import { Request, Response } from "express";
import { RegisterService } from "../services/register.service";

export class RegisterController {
  private registerService = new RegisterService();

  async getAllRegisters(req: Request, res: Response) {
    try {
      const registers = await this.registerService.getAllRegisters();
      res.json(registers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createRegister(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const register = await this.registerService.createRegister(name);
      res.status(201).json(register);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateRegister(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const register = await this.registerService.updateRegister(parseInt(id), value);
      if (!register) {
        return res.status(404).json({ error: "Registro no encontrado" });
      }
      res.json(register);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRegister(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.registerService.deleteRegister(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}