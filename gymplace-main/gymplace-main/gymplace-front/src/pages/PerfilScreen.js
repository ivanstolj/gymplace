import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./PerfilScreen.css";
import { useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import Swal from "sweetalert2";
import { IoIosArrowForward } from "react-icons/io";

export default function PerfilScreen() {
  const { email, logout } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const navigate = useNavigate();

  const imagenGenerica =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // Cargar imagen
  useEffect(() => {
    const fetchImagen = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/gymplace/obtenerImagenPerfil",
          {
            params: { email },
            responseType: "arraybuffer",
          }
        );
        const blob = new Blob([res.data], { type: "image/jpeg" });
        const reader = new FileReader();
        reader.onloadend = () => setImagenUrl(reader.result);
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("❌ Error al obtener imagen:", err);
        setImagenUrl(imagenGenerica);
      }
    };

    if (email) fetchImagen();
  }, [email]);

  // Cargar perfil
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await axios.get("http://localhost:8080/gymplace/perfil", {
          params: { email },
        });
        setPerfil(res.data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      }
    };

    if (email) fetchPerfil();
  }, [email]);

  const handleSeleccion = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("imagen", archivo);

    try {
      await axios.post(
        "http://localhost:8080/gymplace/guardarImagenPerfil",
        formData
      );

      Swal.fire({
        icon: "success",
        title: "¡Imagen actualizada!",
        text: "Tu imagen de perfil se guardó correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error("❌ Error al guardar imagen:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la imagen.",
      });
    }
  };

  const cerrarSesion = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="perfil">
      <Navbar />
      <main className="perfil__bg">
        <div className="perfil__contenido contenedor">
          {/* Parte de la IZQUIERDA */}
          <div className="perfil__contenido__izquierda">
            <div className="perfil__imagen-contenedor">
              <img
                src={imagenUrl || imagenGenerica}
                alt="Imagen de perfil"
                className="perfil__img"
              />
              <label htmlFor="fileInput" className="perfil__icono-lapiz">
                <GoPencil />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleSeleccion}
                className="perfil__input-oculto"
              />
            </div>
            {/* DATOS DEL PERFIL */}
            {perfil && (
              <div className="perfil__datos">
                <p className="perfil__nombre">
                  {perfil.nombre} {perfil.apellido}
                </p>

                <p>
                  <strong>Email:</strong> {perfil.email}
                </p>
                <p>
                  <strong>Tipo:</strong> {perfil.tipo_usuario}
                </p>
                <p>
                  <strong>Fecha de nacimiento:</strong>{" "}
                  {new Date(perfil.fecha_nacimiento).toLocaleDateString(
                    "es-AR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="perfil__contenido__derecha">
            <div className="perfil__opcion">
              <IoIosArrowForward className="perfil__opcion__icono" />
              <span className="perfil__opcion__texto">Cambiar Nombre</span>
            </div>
            <div className="perfil__opcion">
              <IoIosArrowForward className="perfil__opcion__icono" />
              <span className="perfil__opcion__texto">Cambiar Apellido</span>
            </div>
            <div className="perfil__opcion">
              <IoIosArrowForward className="perfil__opcion__icono" />
              <span className="perfil__opcion__texto">Cambiar Contraseña</span>
            </div>
            <div className="perfil__opcion__cerrarSesion">
              <button
                onClick={cerrarSesion}
                className="perfil__boton perfil__boton--cerrar"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
