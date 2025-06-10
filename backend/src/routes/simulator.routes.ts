import express from "express";
import { SimulatorController } from "../controllers/simulator.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const controller = new SimulatorController();

router.post("/execute", authMiddleware, controller.executeInstruction);
router.post("/execute-program/:programId", authMiddleware, controller.executeProgram);

export default router;