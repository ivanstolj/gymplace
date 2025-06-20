import React, { useContext, useState } from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../../context/AuthContext";
import { IoSettingsOutline } from "react-icons/io5";

export default function Navbar() {
  const { email } = useContext(AuthContext);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <div className="navbar__bg">
      <nav className="navbar contenedor">
        <Link className="navbar__logo" to="/home">
          <Logo />
        </Link>

        {/* Menú hamburguesa solo visible en mobile */}
        <GiHamburgerMenu className="navbar__hamburguesa" onClick={toggleMenu} />

        {/* Menú normal (desktop) */}
        <div className="navbar__derecha">
          <Link className="navbar__enlace" to="/home">
            Home
          </Link>
          <Link className="navbar__enlace" to="/profesores">
            Profesores
          </Link>
          <Link className="navbar__enlace" to="/servicios">
            Servicios
          </Link>
          <Link className="navbar__enlace" to="/calendario">
            Calendario
          </Link>

          {email === null ? (
            <Link to="/login">
              <MdOutlineAccountCircle className="svg__account" />
            </Link>
          ) : (
            <Link to="/perfil" className="svg__account">
              <IoSettingsOutline className="svg__account" />
            </Link>
          )}
        </div>
      </nav>

      {/* Menú desplegable en mobile */}
      <div
        className={`navbar__menu-movil contenedor ${
          menuAbierto ? "activo" : ""
        }`}
      >
        <Link className="navbar__enlace" to="/home" onClick={toggleMenu}>
          Home
        </Link>
        <Link className="navbar__enlace" to="/profesores" onClick={toggleMenu}>
          Profesores
        </Link>
        <Link className="navbar__enlace" to="/servicios" onClick={toggleMenu}>
          Servicios
        </Link>
        <Link className="navbar__enlace" to="/calendario" onClick={toggleMenu}>
          Calendario
        </Link>
        {email === null ? (
          <Link to="/login" className="navbar__enlace" onClick={toggleMenu}>
            Ingresar
          </Link>
        ) : (
          <Link to="/perfil" className="navbar__enlace" onClick={toggleMenu}>
            Mi Perfil
          </Link>
        )}
      </div>
    </div>
  );
}
