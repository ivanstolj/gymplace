CREATE DATABASE gymplace;
use gymplace;

CREATE TABLE `usuarios` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo_usuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`email`)
);

INSERT INTO usuarios (email, password, nombre, apellido, fecha_nacimiento, tipo_usuario) VALUES
('juanperez@gmail.com', '1234juanP!', 'Juan', 'Pérez', '1990-05-14', 'cliente'),
('maria.gomez@hotmail.com', 'Maria2024$', 'María', 'Gómez', '1985-09-30', 'entrenador'),
('carlos.rossi@yahoo.com', 'C4rlos#2023', 'Carlos', 'Rossi', '1992-12-01', 'entrenador'),
('luciana.martinez@gmail.com', 'Luciana@123', 'Luciana', 'Martínez', '1998-07-20', 'cliente'),
('admin@gymplace.com', 'Admin*Secure1', 'Admin', 'Gymplace', '1980-01-01', 'cliente');
