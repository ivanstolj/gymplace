import React from "react";
import "./ResetPasswordScreen.css";
import Navbar from "../components/Navbar/Navbar";
import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";
import Footer from "../components/Footer/Footer";

export default function ResetPasswordScreen() {
  return (
    <div>
      <Navbar></Navbar>
      <ResetPasswordForm />
      <Footer></Footer>
    </div>
  );
}
