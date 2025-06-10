import { Request, Response } from "express";
import { MemoryService } from "../services/memory.service";

export class MemoryController {
  private memoryService = new MemoryService();

  async getAllMemory(req: Request, res: Response) {
    try {
      const memory = await this.memoryService.getAllMemory();
      res.json(memory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createMemory(req: Request, res: Response) {
    try {
      const { address, value } = req.body;
      const memory = await this.memoryService.createMemory(address, value);
      res.status(201).json(memory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateMemory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const memory = await this.memoryService.updateMemory(parseInt(id), value);
      if (!memory) {
        return res.status(404).json({ error: "Dirección de memoria no encontrada" });
      }
      res.json(memory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMemory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.memoryService.deleteMemory(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}