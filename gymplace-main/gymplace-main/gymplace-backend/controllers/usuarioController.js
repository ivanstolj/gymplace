// controllers/usuarioController.js – versión completa con almacenamiento de imágenes en BLOB

import db from "../db.js";
import { enviarMailRegistro, enviarMailRecuperacion } from "../mailer.js";
import { generarContraseniaProvisoria } from "../utils/generarContraseniaProvisoria.js";

// ──────────────────────────────────
// 1. Usuarios: CRUD básico + auth
// ──────────────────────────────────
export const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.execute("SELECT * FROM usuarios");
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ? AND password = ?",
      [email, password]
    );

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
  const { nombre, apellido, email, password, fecha_nacimiento, tipo_usuario } =
    req.body;

  try {
    const [existing] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).send("Ya existe un usuario con ese email");
    }

    await db.execute(
      "INSERT INTO usuarios (email, password, nombre, apellido, fecha_nacimiento, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)",
      [email, password, nombre, apellido, fecha_nacimiento, tipo_usuario]
    );

    await enviarMailRegistro(email, nombre);

    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const recuperarPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [usuarios] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(400).send("No existe ningún usuario con ese correo");
    }

    const nuevaPassword = generarContraseniaProvisoria();

    await db.execute("UPDATE usuarios SET password = ? WHERE email = ?", [
      nuevaPassword,
      email,
    ]);

    await enviarMailRecuperacion(email, nuevaPassword);

    res
      .status(200)
      .send("Email enviado correctamente, siga los pasos correspondientes");
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ──────────────────────────────────
// 2. Imágenes de perfil (BLOB)
// ──────────────────────────────────

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
export const uploadMiddleware = upload.single("imagen"); // campo => "imagen"

// Guardar o actualizar imagen de perfil en BLOB
export const guardarImagenPerfil = async (req, res) => {
  const { email } = req.body;
  const imagenBuffer = req.file?.buffer; // binario

  console.log(
    "📥 guardarImagenPerfil → email:",
    email,
    " tamaño:",
    imagenBuffer?.length
  );

  if (!email || !imagenBuffer) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    await db.execute(
      `INSERT INTO imagenesperfiles (email, imagen)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE imagen = VALUES(imagen)`,
      [email, imagenBuffer]
    );

    res
      .status(200)
      .json({ mensaje: "Imagen guardada como BLOB correctamente" });
  } catch (error) {
    console.error("❌ Error al guardar imagen en MySQL:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener imagen de perfil y devolver binario
export const obtenerImagenPerfil = async (req, res) => {
  const { email } = req.query;

  try {
    const [rows] = await db.execute(
      "SELECT imagen FROM imagenesperfiles WHERE email = ?",
      [email]
    );

    if (rows.length > 0 && rows[0].imagen) {
      res.setHeader("Content-Type", "image/jpeg"); // ajusta según formato
      res.send(rows[0].imagen);
    } else {
      res
        .status(404)
        .json({ mensaje: "No se encontró imagen para ese usuario" });
    }
  } catch (error) {
    console.error("Error al obtener imagen de perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const perfil = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Falta el parámetro 'email'" });
  }

  try {
    const [usuarios] = await db.execute(
      "SELECT email, nombre, apellido, fecha_nacimiento, tipo_usuario FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json(usuarios[0]);
  } catch (error) {
    console.error("❌ Error al obtener perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
