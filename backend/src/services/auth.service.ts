import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AppDataSource } from "../config/db";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(name: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { name } });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  async login(name: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { name } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return token;
  }
}