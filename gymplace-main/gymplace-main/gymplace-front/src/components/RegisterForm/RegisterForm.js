import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlinePermIdentity,
} from "react-icons/md";
import {
  IoCalendarNumberOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [verPassword, setVerPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      fecha_nacimiento: "",
      tipo_usuario: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "Mínimo 8 caracteres")
        .matches(/[A-Z]/, "Debe tener al menos una mayúscula")
        .matches(/[0-9]/, "Debe tener al menos un número")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe tener un carácter especial"),
      fecha_nacimiento: Yup.date().required(
        "La fecha de nacimiento es obligatoria"
      ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(
          "http://localhost:8080/gymplace/register",
          values
        );

        await Swal.fire({
          title: "Registro exitoso",
          text: "¡Bienvenido a GymPlace!",
          icon: "success",
          confirmButtonText: "Ir al inicio",
        });

        navigate("/home");
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.response?.data || "Error en el registro",
          icon: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <Link to={"/home"}>
        <img src="/logoNegro.png" className="form__logo" alt="logo" />
      </Link>
      <h2 className="form__titulo">Crea tu cuenta</h2>
      <p className="form__subtitulo">
        Registrate y empezá a vivir la experiencia
      </p>

      {/* Nombre */}
      <div className="form__input-wrapper">
        <MdOutlinePermIdentity className="svg__input" />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="form__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nombre}
        />
      </div>
      {formik.touched.nombre && formik.errors.nombre && (
        <div className="form__error">{formik.errors.nombre}</div>
      )}

      {/* Apellido */}
      <div className="form__input-wrapper">
        <MdOutlinePermIdentity className="svg__input" />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className="form__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.apellido}
        />
      </div>
      {formik.touched.apellido && formik.errors.apellido && (
        <div className="form__error">{formik.errors.apellido}</div>
      )}

      {/* Email */}
      <div className="form__input-wrapper">
        <MdOutlineEmail className="svg__input" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>
      {formik.touched.email && formik.errors.email && (
        <div className="form__error">{formik.errors.email}</div>
      )}

      {/* Contraseña */}
      <div className="form__input-wrapper">
        <MdOutlineLock className="svg__input" />
        <input
          type={verPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          className="form__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {verPassword ? (
          <IoEyeOffOutline
            className="svg__input__derecha"
            onClick={() => setVerPassword(false)}
            title="Ocultar contraseña"
          />
        ) : (
          <IoEyeOutline
            className="svg__input__derecha"
            onClick={() => setVerPassword(true)}
            title="Mostrar contraseña"
          />
        )}
      </div>
      {formik.touched.password && formik.errors.password && (
        <div className="form__error">{formik.errors.password}</div>
      )}

      {/* Fecha de nacimiento */}
      <div className="form__input-wrapper">
        <IoCalendarNumberOutline className="svg__input" />
        <input
          type="date"
          name="fecha_nacimiento"
          className="form__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fecha_nacimiento}
        />
      </div>
      {formik.touched.fecha_nacimiento && formik.errors.fecha_nacimiento && (
        <div className="form__error">{formik.errors.fecha_nacimiento}</div>
      )}

      {/* Tipo de usuario */}
      <select
        name="tipo_usuario"
        className="form__input register__select"
        onChange={formik.handleChange}
        value={formik.values.tipo_usuario}
      >
        <option value="" disabled>
          -- Tipo Cliente --
        </option>
        <option value="cliente">Cliente</option>
        <option value="entrenador">Entrenador</option>
      </select>

      {/* Botón submit */}
      <button
        type="submit"
        className="form__button"
        disabled={formik.isSubmitting}
      >
        Registrarse
      </button>

      <div className="div__noTenesCuenta">
        <p>
          Ya tengo una cuenta.
          <Link to="/login"> Iniciar Sesión</Link>
        </p>
      </div>
    </form>
  );
}
