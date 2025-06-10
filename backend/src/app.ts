import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import registerRoutes from "./routes/register.routes";
import memoryRoutes from "./routes/memory.routes";
import simulatorRoutes from "./routes/simulator.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/registers", registerRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/simulator", simulatorRoutes);

app.use(errorMiddleware);

export default app;