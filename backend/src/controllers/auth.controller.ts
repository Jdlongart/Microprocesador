import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      const user = await this.authService.register(name, password);
      res.status(201).json({ id: user.id, name: user.name });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      const token = await this.authService.login(name, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}