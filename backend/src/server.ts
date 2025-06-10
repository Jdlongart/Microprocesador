import app from "./app";
import { AppDataSource } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar la base de datos", error);
    process.exit(1);
  });