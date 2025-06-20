import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio que uses
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const enviarMailRegistro = async (destinatario, nombre) => {
  try {
    await transporter.sendMail({
      from: `"GymPlace" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: "Bienvenido a GymPlace 💪",
      html: `
        <h2>¡Hola ${nombre}!</h2>
        <p>Tu cuenta fue creada exitosamente. Gracias por unirte a nuestra comunidad 🏋️‍♀️.</p>
        <p>Nos vemos pronto en el gimnasio 😎</p>
      `,
    });
    console.log("📧 Email enviado correctamente a", destinatario);
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
  }
};

export const enviarMailRecuperacion = async (destinatario, nuevaPassword) => {
  try {
    await transporter.sendMail({
      from: `"GymPlace" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: "Recuperación de contraseña",
      html: `
        <p>Se solicitó una recuperación de contraseña para tu cuenta.</p>
        <p>Tu nueva contraseña provisoria es: <b>${nuevaPassword}</b></p>
        <p>Te recomendamos cambiarla apenas inicies sesión.</p>
      `,
    });
    console.log("📧 Mail de recuperación enviado a", destinatario);
  } catch (error) {
    console.error("❌ Error al enviar mail de recuperación:", error);
  }
};
