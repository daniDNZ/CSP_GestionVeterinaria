-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-03-2022 a las 14:22:07
-- Versión del servidor: 8.0.28-0ubuntu0.20.04.3
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `turdus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `allergie`
--

CREATE TABLE `allergie` (
  `id` int NOT NULL,
  `substance` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `allergies_log`
--

CREATE TABLE `allergies_log` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `allergie_id` int NOT NULL,
  `date_time` datetime NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bill`
--

CREATE TABLE `bill` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer`
--

CREATE TABLE `customer` (
  `id` int NOT NULL,
  `postal_code_id` int NOT NULL,
  `family_id` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnosis`
--

CREATE TABLE `diagnosis` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20220314131924', '2022-03-14 14:19:46', 1524);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document`
--

CREATE TABLE `document` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `visit_id` int NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_time` datetime NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `family`
--

CREATE TABLE `family` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patient`
--

CREATE TABLE `patient` (
  `id` int NOT NULL,
  `responsible_id` int DEFAULT NULL,
  `family_id` int DEFAULT NULL,
  `chip` bigint DEFAULT NULL,
  `birthday` date NOT NULL,
  `species` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `race` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eyes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postal_code`
--

CREATE TABLE `postal_code` (
  `id` int NOT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dose` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `species` longtext COLLATE utf8mb4_unicode_ci,
  `stock` int NOT NULL,
  `lot` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` date DEFAULT NULL,
  `life` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_log`
--

CREATE TABLE `products_log` (
  `id` int NOT NULL,
  `bill_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `product_id` int NOT NULL,
  `date` date NOT NULL,
  `quantity` double NOT NULL,
  `paid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reminder`
--

CREATE TABLE `reminder` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  `visit_id` int DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `id` int NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services_log`
--

CREATE TABLE `services_log` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `service_id` int NOT NULL,
  `bill_id` int NOT NULL,
  `date` date NOT NULL,
  `quantity` double NOT NULL,
  `paid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supplier`
--

CREATE TABLE `supplier` (
  `id` int NOT NULL,
  `postal_code_id` int DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` longtext COLLATE utf8mb4_unicode_ci,
  `tax` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary` double NOT NULL,
  `phone` int NOT NULL,
  `collegiate_n` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visit`
--

CREATE TABLE `visit` (
  `id` int NOT NULL,
  `patient_id` int NOT NULL,
  `user_id` int NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_time` datetime NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `treatment` longtext COLLATE utf8mb4_unicode_ci,
  `weight` double DEFAULT NULL,
  `done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visit_diagnosis`
--

CREATE TABLE `visit_diagnosis` (
  `visit_id` int NOT NULL,
  `diagnosis_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `allergie`
--
ALTER TABLE `allergie`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `allergies_log`
--
ALTER TABLE `allergies_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_83474E096B899279` (`patient_id`),
  ADD KEY `IDX_83474E097C86304A` (`allergie_id`);

--
-- Indices de la tabla `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7A2119E39395C3F3` (`customer_id`);

--
-- Indices de la tabla `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_81398E09E7927C74` (`email`),
  ADD KEY `IDX_81398E09BDBA6A61` (`postal_code_id`),
  ADD KEY `IDX_81398E09C35E566A` (`family_id`);

--
-- Indices de la tabla `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D8698A766B899279` (`patient_id`),
  ADD KEY `IDX_D8698A7675FA0FF2` (`visit_id`);

--
-- Indices de la tabla `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_1ADAD7EB602AD315` (`responsible_id`),
  ADD KEY `IDX_1ADAD7EBC35E566A` (`family_id`);

--
-- Indices de la tabla `postal_code`
--
ALTER TABLE `postal_code`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D34A04AD2ADD6D8C` (`supplier_id`);

--
-- Indices de la tabla `products_log`
--
ALTER TABLE `products_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_4B8D919B1A8C12F5` (`bill_id`),
  ADD KEY `IDX_4B8D919B6B899279` (`patient_id`),
  ADD KEY `IDX_4B8D919B4584665A` (`product_id`);

--
-- Indices de la tabla `reminder`
--
ALTER TABLE `reminder`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_40374F4075FA0FF2` (`visit_id`),
  ADD KEY `IDX_40374F406B899279` (`patient_id`),
  ADD KEY `IDX_40374F404584665A` (`product_id`),
  ADD KEY `IDX_40374F40ED5CA9E6` (`service_id`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `services_log`
--
ALTER TABLE `services_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_82607D66B899279` (`patient_id`),
  ADD KEY `IDX_82607D6ED5CA9E6` (`service_id`),
  ADD KEY `IDX_82607D61A8C12F5` (`bill_id`);

--
-- Indices de la tabla `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9B2A6C7EBDBA6A61` (`postal_code_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`);

--
-- Indices de la tabla `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_437EE9396B899279` (`patient_id`),
  ADD KEY `IDX_437EE939A76ED395` (`user_id`);

--
-- Indices de la tabla `visit_diagnosis`
--
ALTER TABLE `visit_diagnosis`
  ADD PRIMARY KEY (`visit_id`,`diagnosis_id`),
  ADD KEY `IDX_FD07DC2475FA0FF2` (`visit_id`),
  ADD KEY `IDX_FD07DC243CBE4D00` (`diagnosis_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `allergie`
--
ALTER TABLE `allergie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `allergies_log`
--
ALTER TABLE `allergies_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `diagnosis`
--
ALTER TABLE `diagnosis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `document`
--
ALTER TABLE `document`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `family`
--
ALTER TABLE `family`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `postal_code`
--
ALTER TABLE `postal_code`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products_log`
--
ALTER TABLE `products_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reminder`
--
ALTER TABLE `reminder`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `services_log`
--
ALTER TABLE `services_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `visit`
--
ALTER TABLE `visit`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `allergies_log`
--
ALTER TABLE `allergies_log`
  ADD CONSTRAINT `FK_83474E096B899279` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  ADD CONSTRAINT `FK_83474E097C86304A` FOREIGN KEY (`allergie_id`) REFERENCES `allergie` (`id`);

--
-- Filtros para la tabla `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `FK_7A2119E39395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Filtros para la tabla `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FK_81398E09BDBA6A61` FOREIGN KEY (`postal_code_id`) REFERENCES `postal_code` (`id`),
  ADD CONSTRAINT `FK_81398E09C35E566A` FOREIGN KEY (`family_id`) REFERENCES `family` (`id`);

--
-- Filtros para la tabla `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `FK_D8698A766B899279` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  ADD CONSTRAINT `FK_D8698A7675FA0FF2` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`);

--
-- Filtros para la tabla `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `FK_1ADAD7EB602AD315` FOREIGN KEY (`responsible_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `FK_1ADAD7EBC35E566A` FOREIGN KEY (`family_id`) REFERENCES `family` (`id`);

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_D34A04AD2ADD6D8C` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

--
-- Filtros para la tabla `products_log`
--
ALTER TABLE `products_log`
  ADD CONSTRAINT `FK_4B8D919B1A8C12F5` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`),
  ADD CONSTRAINT `FK_4B8D919B4584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_4B8D919B6B899279` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`);

--
-- Filtros para la tabla `reminder`
--
ALTER TABLE `reminder`
  ADD CONSTRAINT `FK_40374F404584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_40374F406B899279` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  ADD CONSTRAINT `FK_40374F4075FA0FF2` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`),
  ADD CONSTRAINT `FK_40374F40ED5CA9E6` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

--
-- Filtros para la tabla `services_log`
--
ALTER TABLE `services_log`
  ADD CONSTRAINT `FK_82607D61A8C12F5` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`),
  ADD CONSTRAINT `FK_82607D66B899279` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  ADD CONSTRAINT `FK_82607D6ED5CA9E6` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

--
-- Filtros para la tabla `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `FK_9B2A6C7EBDBA6A61` FOREIGN KEY (`postal_code_id`) REFERENCES `postal_code` (`id`);

--
-- Filtros para la tabla `visit`
--
ALTER TABLE `visit`
  ADD CONSTRAINT `FK_437EE9396B899279` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  ADD CONSTRAINT `FK_437EE939A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `visit_diagnosis`
--
ALTER TABLE `visit_diagnosis`
  ADD CONSTRAINT `FK_FD07DC243CBE4D00` FOREIGN KEY (`diagnosis_id`) REFERENCES `diagnosis` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_FD07DC2475FA0FF2` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
