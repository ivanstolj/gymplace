import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/gymplace", usuarioRoutes); // 👈 Esto es clave para que "/gymplace/login" funcione

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente ✅");
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
