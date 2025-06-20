import express from "express";
import {
  obtenerUsuarios,
  login,
  register,
  perfil,
  recuperarPassword,
  guardarImagenPerfil,
  obtenerImagenPerfil,
  uploadMiddleware, // 👈 nuevo
} from "../controllers/usuarioController.js";

const router = express.Router();

// router.get("/usuarios", obtenerUsuarios);
router.get("/perfil", perfil);
router.post("/login", login);
router.post("/register", register);
router.post("/recuperarPassword", recuperarPassword);

// 👇 nuevo uso del middleware multer
router.post("/guardarImagenPerfil", uploadMiddleware, guardarImagenPerfil);
router.get("/obtenerImagenPerfil", obtenerImagenPerfil);

export default router;
