import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import "./ResetPasswordForm.css";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

export default function ResetPasswordForm() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .required("El correo es obligatorio"),
    }),
    onSubmit: async (formulario, { resetForm }) => {
      try {
        const respuesta = await axios.post(
          "http://localhost:8080/gymplace/recuperarPassword",
          { email: formulario.email }
        );

        // ✅ Si la respuesta fue exitosa
        Swal.fire({
          icon: "success",
          title: "¡Listo!",
          text: respuesta.data,
          confirmButtonText: "Aceptar",
        });

        resetForm();
      } catch (error) {
        const mensaje =
          error.response?.data || "Ocurrió un error. Intente nuevamente.";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: mensaje,
          confirmButtonText: "Cerrar",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form resetForm">
      <h1 className="form__titulo">Recuperar Contraseña</h1>
      <p className="form__subtitulo">
        Por favor ingresa tu correo electrónico y seguí los pasos indicados para
        recuperar tu cuenta
      </p>

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

      <button type="submit" className="form__button">
        Recuperar
      </button>
    </form>
  );
}
