import express from "express";
import { RegisterController } from "../controllers/register.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
const controller = new RegisterController();

router.get("/", authMiddleware, controller.getAllRegisters);
router.post("/", authMiddleware, controller.createRegister);
router.put("/:id", authMiddleware, controller.updateRegister);
router.delete("/:id", authMiddleware, controller.deleteRegister);

export default router;