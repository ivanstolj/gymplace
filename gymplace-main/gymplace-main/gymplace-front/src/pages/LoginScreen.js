import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import "./LoginScreen.css";

export default function LoginScreen() {
  return (
    <div className="login-screen">
      <div className="login-screen__imagen" />
      <div className="login-screen__formulario">
        <LoginForm />
        
      </div>
    </div>
  );
}
