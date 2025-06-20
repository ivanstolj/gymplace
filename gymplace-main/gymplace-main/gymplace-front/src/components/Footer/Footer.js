import { Link } from "react-router-dom";
import "./Footer.css";
import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RiTiktokLine } from "react-icons/ri";
import { LuFacebook } from "react-icons/lu";

export default function Footer() {
  return (
    <div className="footer__bg">
      <footer className="footer contenedor">
        <div className="footer__logo__contenedor">
          <Link to="/home">
            <img
              src="/logoNegro.png"
              alt="Logo Negro"
              className="footer__logo"
            />
          </Link>
        </div>

        {/* Íconos de redes */}
        <nav className="footer__enlaces">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <RiTiktokLine />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <LuFacebook />
          </a>

          <a
            href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20saber%20más%20sobre%20tu%20servicio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </nav>
      </footer>
    </div>
  );
}
