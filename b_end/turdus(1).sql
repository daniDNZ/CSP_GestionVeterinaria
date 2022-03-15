-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 15-03-2022 a las 14:05:55
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
  `postal_code_id` int DEFAULT NULL,
  `family_id` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `customer`
--

INSERT INTO `customer` (`id`, `postal_code_id`, `family_id`, `email`, `roles`, `password`, `dni`, `name`, `last_name`, `address`, `phone`, `info`) VALUES
(1, 26004, 1, 'pforbes0@blogger.com', NULL, 'aDrHEo', '14932159F', 'Pepito', 'Forbes', '825 Farragut Point', '+86 326 110 2218', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\r\n\r\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\r\n\r\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.'),
(2, 26006, 1, 'lshorthill1@earthlink.net', NULL, 'wfVdT9Jc7', '14932159F', 'Leroi', 'Shorthill', '8372 Merrick Parkway', '+86 317 824 6782', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\r\n\r\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\r\n\r\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.'),
(3, NULL, 2, 'dmaccarter2@bbb.org', NULL, 'lKZ8dq', '14932159F', 'Derward', 'MacCarter', '8518 Glendale Lane', '+86 461 251 1548', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\r\n\r\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
(4, 26002, 3, 'mkenvin3@hubpages.com', NULL, 'JkVX5aigP', '14932159F', 'Mikael', 'Kenvin', '30399 Shopko Place', '+62 320 951 7892', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\r\n\r\nFusce consequat. Nulla nisl. Nunc nisl.'),
(5, 26004, 4, 'kgostage4@newsvine.com', NULL, 'Z77SM9FK', '14932159F', 'Kate', 'Gostage', '4 Moose Plaza', '+86 565 434 1335', 'Fusce consequat. Nulla nisl. Nunc nisl.\r\n\r\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\r\n\r\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'),
(6, 26000, 5, 'nprovis5@blogs.com', NULL, '7UQDXi2AM8A', '14932159F', 'Nicko', 'Provis', '0678 Southridge Junction', '+86 265 572 6929', 'Fusce consequat. Nulla nisl. Nunc nisl.\r\n\r\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.'),
(7, 26142, 6, 'iabramino6@ustream.tv', NULL, '5QvVMO', '14932159F', 'Isidor', 'Abramino', '7440 American Ash Circle', '+63 459 774 4101', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\r\n\r\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'),
(8, 26140, 7, 'stottman7@studiopress.com', NULL, 'zoWm2OHvH', '14932159F', 'Sonja', 'Tottman', '2836 Melvin Terrace', '+62 192 699 2870', 'Fusce consequat. Nulla nisl. Nunc nisl.'),
(9, 26140, 8, 'mthornham8@skyrock.com', NULL, 'Jj2WMI', '14932159F', 'Martelle', 'Thornham', '6185 Grasskamp Crossing', '+86 944 446 6829', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\r\n\r\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\r\n\r\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.'),
(10, 26006, 9, 'hegar9@1und1.de', NULL, 'QvOC2DSp', '14932159F', 'Had', 'Egar', '3 Thackeray Drive', '+1 592 726 9088', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.');

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
('DoctrineMigrations\\Version20220314131924', '2022-03-14 14:19:46', 1524),
('DoctrineMigrations\\Version20220315122640', '2022-03-15 13:26:57', 302),
('DoctrineMigrations\\Version20220315123034', '2022-03-15 13:30:58', 105),
('DoctrineMigrations\\Version20220315123545', '2022-03-15 13:35:50', 121),
('DoctrineMigrations\\Version20220315124835', '2022-03-15 13:48:41', 96);

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

--
-- Volcado de datos para la tabla `family`
--

INSERT INTO `family` (`id`, `name`) VALUES
(1, 'ForbesFam'),
(2, 'McCarterFam'),
(3, 'KenvinFam'),
(4, 'GostageFam'),
(5, 'ProvisFam'),
(6, 'AbraminoFam'),
(7, 'TottmanFam'),
(8, 'ThornhamFam'),
(9, 'EgarFam');

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
  `info` longtext COLLATE utf8mb4_unicode_ci,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sterilised` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `patient`
--

INSERT INTO `patient` (`id`, `responsible_id`, `family_id`, `chip`, `birthday`, `species`, `race`, `color`, `eyes`, `info`, `gender`, `name`, `sterilised`) VALUES
(1, 2, 1, 3446145885, '2020-08-26', 'Canis Familiaris', 'Corgi', 'Khaki', 'Marrones', '', 'Male', 'Yolo', 0),
(2, 3, 2, 7122081079, '2015-09-08', 'Canis Familiaris', 'Rottweiler', 'Negro y fuego', 'Marrones', '', 'Female', 'Loli', 0),
(3, 4, 3, 722577168, '2017-07-08', 'Canis Familiaris', 'Pastor Alemán', 'Negro y fuego', 'Verdes', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 'Male', 'Thor', 1),
(4, 5, 4, 1389451828, '2014-07-26', 'Canis Familiaris', 'Alaskan Malamute', 'Blanco y gris', 'Azules', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 'Male', 'Nieve', 1),
(5, 6, 5, 7069698747, '2019-12-28', 'Canis Familiaris', 'Bulldog Inglés', 'Marrón y blanco', 'Marrones', '', 'Female', 'Croqueta', 0),
(6, 7, 6, 5256960873, '2020-01-01', 'Felis Catus', 'Angora Turco', 'Blanco', 'i: Azul, d: Amarillo', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 'Female', 'Pelusa', 0),
(7, 8, 7, 7219947844, '2012-04-11', 'Felis Catus', 'Común Europeo', 'Naranja Atigrado', 'Amarillos', '', 'Male', 'Link', 1),
(8, 9, 8, 5509332557, '2012-04-01', 'Felis Catus', 'Común Europeo', 'Blanco y gris atigrado', 'Verdes', '', 'Male', 'Forito', 1),
(9, 10, 9, 8996348643, '2017-12-30', 'Pogona Vitticeps', 'Red', 'Rojo', 'Negro', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'Male', 'Malfoy', 0),
(10, 1, 2, 61601942, '2019-11-26', 'Nymphicus Hollandicus', '', 'Blanca y Amarilla', 'Marrones', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'Female', 'Ringtone', 0);

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

--
-- Volcado de datos para la tabla `postal_code`
--

INSERT INTO `postal_code` (`id`, `province`, `city`, `country`) VALUES
(26000, 'La Rioja', 'Varea', 'Spain'),
(26002, 'La Rioja', 'Logroño', 'Spain'),
(26004, 'La Rioja', 'Logroño', 'Spain'),
(26006, 'La Rioja', 'Logroño', 'Spain'),
(26140, 'La Rioja', 'Lardero', 'Spain'),
(26142, 'La Rioja', 'Villamediana de Iregua', 'Spain');

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
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `collegiate_n` int DEFAULT NULL,
  `area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`, `name`, `last_name`, `email`, `salary`, `phone`, `dni`, `collegiate_n`, `area`) VALUES
(6, 'chellmer0', '[\"ROLE_ADMIN\", \"ROLE_VET\"]', '8yhXo3A', 'Colette', 'Hellmer', 'chellmer0@spiegel.de', 2900.35, '+84 841 230 4662', '25452007T', 12382, 'General'),
(7, 'apoytress1', '[\"ROLE_VET\"]', 'nPzRWOusg', 'Ansel', 'Poytress', 'apoytress1@gizmodo.com', 2445.53, '+30 857 819 5974', 'Y0506830Q', 39635, 'General'),
(8, 'dlehucquet2', '[\"ROLE_VET\"]', 'A50JMS', 'Darn', 'Le Hucquet', 'dlehucquet2@bizjournals.com', 2626.15, '+255 449 550 9640', '85685078G', 78582, 'Exotics'),
(9, 'rbridden3', '[\"ROLE_ATV\"]', 'ZzwS6oZ', 'Rodina', 'Bridden', 'rbridden3@ebay.co.uk', 1650.39, '+86 546 757 3436', '78299706R', NULL, 'ATV'),
(10, 'mbrinkman4', '[\"ROLE_OFFICE\"]', 'USMq7X3h4n', 'Madison', 'Brinkman', 'mbrinkman4@msn.com', 1400.51, '+62 408 263 6095', '04166875B', NULL, 'Office');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  ADD CONSTRAINT `FK_81398E09BDBA6A61` FOREIGN KEY (`postal_code_id`) REFERENCES `postal_code` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
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
  ADD CONSTRAINT `FK_9B2A6C7EBDBA6A61` FOREIGN KEY (`postal_code_id`) REFERENCES `postal_code` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

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
