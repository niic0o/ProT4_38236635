-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-08-2024 a las 04:07:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sena_nicolas_biblioteca`
--
CREATE DATABASE IF NOT EXISTS `sena_nicolas_biblioteca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sena_nicolas_biblioteca`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `autor` varchar(30) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `año-publicacion` year(4) NOT NULL,
  `ISBN` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `nombre`, `autor`, `categoria`, `año-publicacion`, `ISBN`) VALUES
(1, 'Ingeniería del Software', 'Ian Sommerville', 'Computación', '2005', '8478290745'),
(2, 'Probabilidad y Estadisticas', 'Devoree, Jay L.', 'Matemáticas', '2018', '0978607526659'),
(3, 'Programación Visual Basic.NET:', 'Edgar D\'Andrea', 'Computación', '2019', '0979862363247'),
(4, 'Álgebra', 'Armando O. Rojo', 'Matemáticas', '1972', '0067548237'),
(5, 'Introducción al Análisis Matem', 'Hebe T. Rabuffetti', 'Matemáticas', '1978', '9500252813'),
(6, 'Fundamentos De Programación: 5', 'Joyanes Aguilar, Luis', 'Computación', '2020', '0978607151468'),
(19, 'Windows 12 - Primeros pasos', 'Desconocido', 'Computación', '2030', '1088627151469'),
(20, 'Manual de Uso de Chat GTP', 'Gomez Ramon', 'Inteligencia Artificial', '2024', '0988627151469');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
