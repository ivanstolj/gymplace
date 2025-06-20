import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import "./RegisterScreen.css";

export default function RegisterScreen() {
  return (
    <div className="register-screen">
      <div className="register-screen__formulario">
        <RegisterForm />
      </div>
      <div className="register-screen__imagen" />
    </div>
  );
}
