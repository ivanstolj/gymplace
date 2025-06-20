import "./Logo.css";
import React from "react";

export default function Logo() {
  return (
    <div className="logo__contenedor">
      <img
        src="/logoNegro.png"
        alt="Logo Negro"
        className="logo__img logo__img--negro"
      />
      <img
        src="/logoVerde.png"
        alt="Logo Verde"
        className="logo__img logo__img--verde"
      />
    </div>
  );
}
