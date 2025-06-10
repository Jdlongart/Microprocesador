import { Request, Response } from "express";
import { SimulatorService } from "../services/simulator.service";

export class SimulatorController {
  private simulatorService = new SimulatorService();

  async executeInstruction(req: Request, res: Response) {
    try {
      const { instruction } = req.body;
      if (!instruction) {
        return res.status(400).json({ error: "Se requiere una instrucción" });
      }

      const result = await this.simulatorService.executeInstruction(instruction);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async executeProgram(req: Request, res: Response) {
    try {
      const { programId } = req.params;
      const result = await this.simulatorService.executeProgram(parseInt(programId));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}