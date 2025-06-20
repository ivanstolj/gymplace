import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const [verPassword, setVerPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // justo debajo de useState y useContext

  const estadoInicial = { email: "", password: "" };

  const validacion = Yup.object({
    email: Yup.string()
      .email("Ingresá un email válido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const formik = useFormik({
    initialValues: estadoInicial,
    validationSchema: validacion,
    onSubmit: async (formulario) => {
      try {
        const respuesta = await axios.post(
          "http://localhost:8080/gymplace/login",
          { email: formulario.email, password: formulario.password }
        );

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "¡Bienvenido de nuevo!",
          confirmButtonColor: "#6cae82",
        });
        console.log("email");
        console.log(respuesta.data.email);
        login(respuesta.data.email);
        navigate("/home");

        // Podés redirigir después con navigate("/home") si usás useNavigate de React Router
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: `${error.response.data}`,
          confirmButtonColor: "#d33",
        });
      }
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <Link to={"/home"}>
        <img src="/logoNegro.png" className="form__logo" alt="logo" />
      </Link>

      <h1 className="form__titulo">Bienvenido de vuelta</h1>
      <p className="form__subtitulo">
        Inicia sesión para continuar con tu entrenamiento
      </p>

      <div className="form__campos">
        {/* Campo Email */}
        <div className="form__campo">
          <div className="form__input-wrapper">
            <MdOutlineEmail className="svg__input" />
            <input
              id="email"
              className="form__input"
              placeholder="Email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="form__error">{formik.errors.email}</div>
          )}
        </div>

        {/* Campo Password con ojo */}
        <div className="form__campo">
          <div className="form__input-wrapper">
            <MdOutlineLock className="svg__input" />
            <input
              id="password"
              className="form__input"
              placeholder="Password"
              type={verPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {verPassword ? (
              <IoEyeOffOutline
                className="svg__input__derecha"
                onClick={() => setVerPassword(false)}
              />
            ) : (
              <IoEyeOutline
                className="svg__input__derecha"
                onClick={() => setVerPassword(true)}
              />
            )}
          </div>

          {formik.touched.password && formik.errors.password && (
            <div className="form__error">{formik.errors.password}</div>
          )}
        </div>
      </div>

      <Link className="form__olvidaste" to="/resetPassword">
        ¿Olvidaste tu contraseña?
      </Link>

      <button className="form__button" type="submit">
        Ingresar
      </button>

      <div className="div__noTenesCuenta">
        <p>
          ¿Todavía no tenes cuenta?
          <Link to="/register"> Click aquí para registrarte</Link>
        </p>
      </div>
    </form>
  );
}
