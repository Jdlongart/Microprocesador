import express from "express";
import { MemoryController } from "../controllers/memory.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const controller = new MemoryController();

router.get("/", authMiddleware, controller.getAllMemory);
router.post("/", authMiddleware, controller.createMemory);
router.put("/:id", authMiddleware, controller.updateMemory);
router.delete("/:id", authMiddleware, controller.deleteMemory);

export default router;