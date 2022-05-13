-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 13-05-2022 a las 23:49:12
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
-- Estructura de tabla para la tabla `bill`
--

CREATE TABLE `bill` (
  `id` int NOT NULL,
  `customer_id` int NOT NULL,
  `datetime` datetime NOT NULL,
  `visit_id` int DEFAULT NULL,
  `paid` float NOT NULL,
  `amount` float NOT NULL,
  `payment_completed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `bill`
--

INSERT INTO `bill` (`id`, `customer_id`, `datetime`, `visit_id`, `paid`, `amount`, `payment_completed`) VALUES
(42, 6, '2022-04-27 17:20:13', 10, 44.05, 44.05, 1),
(43, 11, '2022-04-27 17:22:28', 11, 10, 10, 1),
(44, 3, '2022-04-27 17:23:45', 12, 25.34, 25.34, 1),
(45, 9, '2022-04-27 17:27:39', 13, 44.05, 44.05, 1),
(46, 10, '2022-04-27 18:33:58', 14, 95.55, 95.55, 1),
(47, 9, '2022-04-27 18:38:16', 4, 218.9, 218.9, 1),
(48, 8, '2022-04-28 16:54:04', 15, 44.05, 44.05, 1),
(49, 11, '2022-04-28 17:02:57', 16, 50, 89.28, 0),
(50, 10, '2022-04-29 20:01:25', 17, 0, 0, 0),
(52, 6, '2022-04-29 22:08:00', 3, 44.05, 44.05, 1),
(54, 8, '2022-05-05 15:46:00', 20, 85.3, 85.3, 1),
(55, 11, '2022-05-05 15:49:38', 21, 85.3, 85.3, 1),
(56, 48, '2022-05-13 22:26:44', 22, 0, 0, 1),
(57, 46, '2022-05-13 23:28:55', 24, 10, 37.04, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contact_form`
--

INSERT INTO `contact_form` (`id`, `email`, `message`, `date`) VALUES
(1, 'admin@turdus.com', 'hola qué tal', '2022-05-08'),
(8, 'prueba7@prueba.com', 'prueba prueba', '2022-05-12'),
(9, 'prueba8@prueba.com', 'wfqojenrgoewbgjeqrgboqenrgoergneg eqgqueg eqogjqeiogjqeo gequg qeughqiugeqig qeug eqrgqhg eghiquegeqr rgheiqug geqgg', '2022-05-12'),
(11, 'hola@gmail.com', 'prueba hola', '2022-05-12'),
(12, 'prueba10@pruebas.com', 'Prueba 10 prueba de prueba de cuando prueba. Prueba.\r\n\r\nPrueba, prueba probando la prueba.', '2022-05-13'),
(13, 'prueba11@pruebas.com', 'Prueba 11 prueba de prueba de cuando prueba. Prueba.\r\n\r\nPrueba, prueba probando la prueba.', '2022-05-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer`
--

CREATE TABLE `customer` (
  `id` int NOT NULL,
  `postal_code_id` int DEFAULT NULL,
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

--
-- Volcado de datos para la tabla `customer`
--

INSERT INTO `customer` (`id`, `postal_code_id`, `family_id`, `email`, `roles`, `password`, `dni`, `name`, `last_name`, `address`, `phone`, `info`) VALUES
(1, 26004, 1, 'pforbes0@blogger.com', '[]', '$2y$13$J.24..yVLHVsNWjI1gZMneO17hTceK5zHckQ9XvGzq/ogD5pgy0VK', '14932159F', 'Pepito', 'Forbes', '825 Farragut Point', '+86 326 110 2218', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\r\n\r\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\r\n\r\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.'),
(2, 26006, 1, 'lshorthill1@earthlink.net', '[]', '$2y$13$1ctWzkpbliQZfGcco0lHyODddx/1LlhTd3lM2IcvBvr2nX9xZzFq.', '14932159F', 'Leroi', 'Shorthill', '8372 Merrick Parkway', '+86 317 824 6782', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.'),
(3, 26004, 2, 'dmaccarter2@bbb.org', '[]', '$2y$13$Q0V0IzP7NWF9q1Y5yXLqzeJrJg52tJ3tEGOC16xb/PhTgpBY5dToa', '14932159A', 'Derward', 'MacCarter', '8518 Glendale Lane', '+86 461 251 1548', 'Info de prueba'),
(4, 26002, 3, 'mkenvin3@hubpages.com', '[]', '$2y$13$FRTyL4rpIoPwO0G90FJMKeoHSue8kaGjJ6M.fW3O.WjZ.JrYwYtqG', '14932159F', 'Mikael', 'Kenvin', '30399 Shopko Place', '+62 320 951 7892', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\r\n\r\nFusce consequat. Nulla nisl. Nunc nisl.'),
(5, 26004, 4, 'kgostage4@newsvine.com', '[]', '$2y$13$9hmZqeg76vNn0sFnxiINDOzmJzT7yOA4GTV/a1ASHF9Pr6eJr1SoG', '14932159F', 'Kate', 'Gostage', '4 Moose Plaza', '+86 565 434 1335', 'Fusce consequat. Nulla nisl. Nunc nisl.\r\n\r\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\r\n\r\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'),
(6, 26000, 5, 'nprovis5@blogs.com', '[]', '$2y$13$LL2L9kvWLDkqvMa7p4uo7Or7NvkVqGClfhLbO2bllzxVpiMrcbODO', '14932159F', 'Nicko', 'Provis', '0678 Southridge Junction', '+86 265 572 6929', 'Fusce consequat. Nulla nisl. Nunc nisl.\r\n\r\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.'),
(7, 26142, 6, 'iabramino6@ustream.tv', '[]', '$2y$13$Kz9Er1ybIkPoAD8yHwKPF.IWoKgqmfecQCoVLBHVEQKPqsYjnRXSG', '14932159F', 'Isidor', 'Abramino', '7440 American Ash Circle', '+63 459 774 4101', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\r\n\r\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'),
(8, 26140, 7, 'stottman7@studiopress.com', '[]', '$2y$13$DAm9g4cMhwBaZ0OnZiqVj.vmUbNxpfDEKY/0IXgXfXcFFLyaz4pXG', '14932159F', 'Sonja', 'Tottman', '2836 Melvin Terrace', '+62 192 699 2870', 'Fusce consequat. Nulla nisl. Nunc nisl.'),
(9, 26140, 8, 'mthornham8@skyrock.com', '[]', '$2y$13$4w18IG13h9IYu0pjDiH9o.HTH/HjidJGor966y9MOQsYpmEX8/YGW', '14932159F', 'Martelle', 'Thornham', '6185 Grasskamp Crossing', '+86 944 446 6829', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\r\n\r\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\r\n\r\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.'),
(10, 26006, 9, 'hegar9@1und1.de', '[]', '$2y$13$Ie0zJ4h4x1Pcgly2Mt.npuVY6PwouUZhfworG73b3CLi4YUr85QWq', '14932159F', 'Had', 'Egar', '3 Thackeray Drive', '+1 592 726 9088', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'),
(11, 26002, 17, 'mluisoalo@gmail.com', '[]', 'Manolo', '84745493N', 'Manolo', 'Luiso Alonso', 'Calle del Biércol 29', '849333434', ''),
(14, 26002, 20, 'lorepere@gmail.com', '[]', 'Lorena', '04938459N', 'Lorena', 'Suárez Pérez', 'Calle de la alcachofa 56', '545363246', 'Otro teléfono: 95493854'),
(15, 26002, 21, 'javiblanco@gmail.com', '[]', 'Javier', '438345934J', 'Javier', 'González Blanco', 'Calle de la Zanahoria 3', '483940567', ''),
(16, 26002, 22, 'rovaas@gmail.com', '[]', 'Rodrigo', '4354354L', 'Rodrigo', 'Vasco Asturio', 'Calle de la muerte 4', '434525', ''),
(17, 26002, 23, 'juanlui@gmail.com', '[]', 'Fede', '24253455h', 'Fede', 'Juanchez Luiso', 'Calle el Pimiento 4', '54325254', ''),
(29, 26000, 35, 'luima@gmail.com', '[]', 'Luis Alfonso', '3462356K', 'Luis Alfonso', 'Pérez Martínez', 'Calle de la agonía 47', '3452356', 'jkfgjoaej geajg oieajb aeo gjeaoi boajngaeg'),
(30, 26000, 36, 'eliseufi@gmail.com', '[]', '$2a$10$ty9pihYXxO3G/8xXWAZGXOExkW3NSq2EriIcO3Qf/b9e1bE06mTFe', '32352453H', 'Elisardo', 'Eufides Loles', 'Calle del ajedrez 56', '32349234', 'Pruebas'),
(31, 26000, 37, 'roberleal@gmail.com', '[]', '$2a$10$J0kK.e5.bzX95t8zYXvDG.haGmUxDtOdI.4ps2EbtG.MNDRdxfKaW', '23524535C', 'Roberto', 'Leal Calvo', 'Calle del audio 45', '345235623', 'Jarogoanrgoarg'),
(32, 26006, 38, 'juanjoagu@gmail.com', '[]', '$2a$10$giYk.IIKwtWX66G2rUqPLOP9wV0ZoUFfXunHcVmFFp7JiWgH1k.pK', '766956989c', 'Juan José', 'del Amo Gutiérrez', 'Calle de la amistad 64', '6785986', '            '),
(34, 26006, 40, 'c123@gmail.com', '[]', '$2a$10$MNZz.VYVQScp5SFyvqOH/eGBv7gRVPe9xvG7/psZCOuTnuWLH9Vte', '13425345j', 'Cliente123', 'apellidos123', 'Calle del amo 43', '1234556', '            '),
(42, 26006, 48, 'cli002@gmail.com', '[]', '$2y$13$EGa08ZNRXKwTmAvJYUId7uedvXpmOa4NHykAiUtsAT1JTMlYAOK2K', '4345346y', 'cliente002', 'Apellidos002', 'Avenida los amos 32', '3452362', '            '),
(46, 26000, 52, 'c003@gmail.com', '[]', '$2a$10$tQyY2GohyYhq9kvVqXN4zOoD3tvbcxbj2cfPHL0lCLLi3sFi9faXm', '24532632j', 'cliente003', 'apellidos003', 'Calle del yupi 3', '24536325656', '            '),
(47, 26006, 53, 'c004@gmail.com', '[]', '$2a$10$VF9elLknqj14jBW6v5kr1OEhR.n4A3IXHE.ORElVOQdZxqUiik9IC', '535623456k', 'cliente004', 'apellidos004', 'Calle de los perros 23', '6545747456', 'gqerwgergerg'),
(48, 26006, 54, 'c005@gmail.com', '[]', '$2a$10$1RJxJjKv0tR2mhF..9fQUelXq3Pc5wJyJx3IUmoJGfutVjAyjANti', '53462356k', 'cliente005', 'apellidos005', 'Calle de la amistad 3', '54352365', ''),
(50, 26006, 56, 'c006@gmail.com', '[]', '$2a$10$GfBOUnENLxhQrPgtVCSW4uqUYCzt.Pg2LgpExu.sJJ.kZt8yXfn0m', '34524523l', 'cliente006', 'apellidos006', 'Calle de la trucha 3', '3452345', '        '),
(51, 26000, 57, 'c007@gmail.com', '[]', '$2a$10$VMk80zr4Wz61zQCZDAsIjeCFZMzJrfkjrIejZjalPh8yE.RikijCO', '345235f', 'cliente007', 'apellidos007', 'Calle de la alpargata 3', '345236326', '        '),
(52, 26006, 58, 'c008@gmail.com', '[]', '$2a$10$nRGQPf2qmU80DsWAAShlhe2HBPzexRkaeOni.XlMj1AJd2veLWQQe', '24523465g', 'cliente008', 'apellidos008', 'Calle de la amistad 644', '43526236', '        '),
(53, 26006, 59, 'c009@gmail.com', '[]', '$2a$10$nIc77XKzPenTb0rc0fVnquMcPJ/6WjkB2IJKIDp0YJpv4cSnIiW4m', '3453263h', 'cliente009', 'apellidos009', 'Calle de la amistad 6454', '53242345', '        '),
(54, 26000, 60, 'c010@gmail.com', '[]', '$2a$10$JxxqrIuyHWwWFXr8h/Ctxec65ivB9v9j5daZ5Fvmr3HvEtFg1GGjS', '346256j', 'cliente010', 'apellidos010', 'Calle de la amistad 1', '4352356', '');

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
('DoctrineMigrations\\Version20220331162812', '2022-03-31 18:28:18', 310),
('DoctrineMigrations\\Version20220331164047', '2022-03-31 18:40:59', 359),
('DoctrineMigrations\\Version20220401090654', '2022-04-01 11:07:12', 121),
('DoctrineMigrations\\Version20220401091409', '2022-04-01 11:14:28', 329),
('DoctrineMigrations\\Version20220422150450', '2022-04-22 17:04:57', 315),
('DoctrineMigrations\\Version20220425081627', '2022-04-25 10:16:40', 174),
('DoctrineMigrations\\Version20220426135738', '2022-04-26 15:58:00', 115),
('DoctrineMigrations\\Version20220501091658', '2022-05-01 11:17:14', 124),
('DoctrineMigrations\\Version20220505150251', '2022-05-05 17:03:04', 213),
('DoctrineMigrations\\Version20220512092425', '2022-05-12 11:24:44', 64),
('DoctrineMigrations\\Version20220512145617', '2022-05-12 16:56:38', 64);

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
(9, 'EgarFam'),
(10, 'Sáchez Luis'),
(11, 'Sáchez Luis'),
(12, 'Sáchez LuisFam'),
(13, 'Botella AlonsoFam'),
(14, 'Luiso AlonsoFam'),
(15, 'Luiso AlonsoFam'),
(16, 'Luiso AlonsoFam'),
(17, 'Luiso AlonsoFam'),
(19, 'García AlemaniFam'),
(20, 'Suárez PérezFam'),
(21, 'González BlancoFam'),
(22, 'Vasco AsturioFam'),
(23, 'Juanchez LuisoFam'),
(35, 'Pérez MartínezFam'),
(36, 'Eufides LolesFam'),
(37, 'Leal CalvoFam'),
(38, 'del Amo GutiérrezFam'),
(40, 'apellidos123Fam'),
(41, 'Fam'),
(44, 'Fam'),
(45, 'apellidos001Fam'),
(46, 'Fam'),
(48, 'Apellidos002Fam'),
(49, 'Fam'),
(51, 'Fam'),
(52, 'apellidos003Fam'),
(53, 'apellidos004Fam'),
(54, 'apellidos005Fam'),
(56, 'apellidos006Fam'),
(57, 'apellidos007Fam'),
(58, 'apellidos008Fam'),
(59, 'apellidos009Fam'),
(60, 'apellidos010Fam');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patient`
--

CREATE TABLE `patient` (
  `id` int NOT NULL,
  `responsible_id` int DEFAULT NULL,
  `family_id` int DEFAULT NULL,
  `chip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eyes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` longtext COLLATE utf8mb4_unicode_ci,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sterilised` tinyint(1) NOT NULL,
  `vet_id` int NOT NULL,
  `weight` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `species_id` int DEFAULT NULL,
  `race_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `patient`
--

INSERT INTO `patient` (`id`, `responsible_id`, `family_id`, `chip`, `birthday`, `color`, `eyes`, `info`, `gender`, `name`, `sterilised`, `vet_id`, `weight`, `species_id`, `race_id`) VALUES
(1, 2, 1, '3446145885', '2020-08-26', 'Khaki', 'Marrones', '', 'Male', 'Yolos', 0, 6, '18', 1, 1),
(2, 3, 2, '7122081079', '2015-09-08', 'Negro y fuego', 'Marrones', '', 'Female', 'Loli', 0, 7, '43', 1, 3),
(3, 4, 3, '722577168', '2012-01-05', 'Negro y fuego', 'Verdes', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 'Male', 'Thor', 1, 6, '36', 1, 2),
(4, 5, 4, '1389451828', '2014-07-26', 'Blanco y gris', 'Azules', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 'Male', 'Nieve', 1, 7, NULL, 1, 4),
(5, 6, 5, '7069698747', '2019-12-28', 'Marrón y blanco', 'Marrones', '', 'Female', 'Croqueta', 0, 6, '19', 1, 5),
(6, 7, 6, '5256960873', '2020-01-01', 'Blanco', 'i: Azul, d: Amarillo', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 'Female', 'Pelusa', 0, 6, '4.5', 2, 6),
(7, 8, 7, '7219947844', '2012-04-11', 'Naranja Atigrado', 'Amarillos', '', 'Male', 'Link', 1, 6, '5.3', 2, 7),
(8, 9, 8, '5509332557', '2012-04-01', 'Blanco y gris atigrado', 'Verdes', '', 'Male', 'Forito', 1, 6, '4.8', 2, 7),
(9, 10, 9, '8996348643', '2017-12-30', 'Rojo', 'Negro', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'Male', 'Malfoy', 0, 8, NULL, 3, 15),
(10, 1, 2, '61601942', '2019-11-26', 'Blanca y Amarilla', 'Marrones', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'Female', 'Ringtone', 0, 8, NULL, 4, 16),
(11, 2, 1, '234523435462456', '2009-01-05', 'Negro y fuego', 'Marrón', 'Compresión medular', 'Male', 'Neo', 0, 8, '36', 1, 2),
(12, 3, NULL, '', '2022-03-08', '', '', '', 'Female', 'Harry', 0, 8, '', 3, 15),
(13, 11, NULL, '', '2021-12-22', '', '', '', 'Male', 'Rapado', 0, 7, '', 4, 16),
(14, 10, 9, '', '2021-12-22', '', '', '', 'Male', 'Pedroso', 1, 6, '14', 1, 1),
(17, 7, 6, '', '2022-02-08', '', '', '', 'Male', 'Leroy', 1, 6, '', 1, 2),
(18, 8, 7, '', '2021-06-08', '', '', '', 'Female', 'Josefa', 0, 8, '', 4, 16),
(19, 10, 9, '', '2021-06-08', '', '', '', 'Female', 'Josefina', 0, 8, '', 4, 16),
(20, 11, 17, '', '2021-12-15', '', '', '', 'Female', 'Priscila', 0, 6, '', 1, 5),
(22, 8, 7, '', '2021-12-15', '', '', '', 'Female', 'Salchicha', 1, 7, '', 1, 1),
(23, 16, 22, '', '2022-02-15', '', '', '', 'Female', 'Federico', 0, 8, '30', 1, 2),
(24, 17, 23, '', '2021-07-20', '', '', '', 'Male', 'Cruzcampo', 1, 6, '4.5', 2, 7),
(25, 1, 1, '2451452345', '2021-08-17', 'Negro y fuego', 'Ma', '', 'Male', 'Perricolo', 1, 8, '40', 1, 3),
(26, 6, 5, '435236236', '2021-08-10', 'Beige', 'Marrones', '            ', 'Male', 'César', 1, 7, '', 1, 1),
(29, 48, 54, '', '2022-04-04', 'Gris/amarillo', 'negros', '        ', 'Female', 'Flauta', 0, 8, '0.2', 4, 16),
(30, 54, 60, '', '2022-04-03', '', '', '', '', 'Indi', 0, 8, '', 3, 15),
(32, 42, 48, '', '2022-01-10', '', '', '', 'Male', 'Cualquiera', 1, 6, '', 2, 7),
(33, 42, 48, '', '2022-05-02', '', '', '', 'Male', 'prueba12', 1, 8, '', 18, 22),
(34, 46, 52, '', '2021-12-08', '', '', '', 'Female', 'prueba123', 1, 6, '', 1, 2);

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
(19160, 'Guadalajara', 'Chiloeches', 'España'),
(26000, 'La Rioja', 'Varea', 'Spain'),
(26002, 'La Rioja', 'Logroño', 'Spain'),
(26004, 'La Rioja', 'Logroño', 'Spain'),
(26006, 'La Rioja', 'Logroño', 'Spain'),
(26140, 'La Rioja', 'Lardero', 'Spain'),
(26142, 'La Rioja', 'Villamediana de Iregua', 'Spain'),
(28020, 'Madrid', 'Madrid', 'Spain'),
(39311, 'Cantabria', 'Cartes', 'Spain'),
(46210, 'Valencia', 'Picaña', 'Spain');

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
  `stock` int NOT NULL,
  `lot` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `life` int DEFAULT NULL,
  `subcategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ean` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `supplier_id`, `code`, `category`, `name`, `dose`, `price`, `stock`, `lot`, `expiration`, `life`, `subcategory`, `ean`) VALUES
(1, 1, 'ROYAL_KITTEN_STR_2.5', 'Alimento Seco', 'Royal Canin Kitten Sterilised 2.5kg', '2.5kg', 26.99, 30, 'L456', '2030-08-02', NULL, 'Cachorro', NULL),
(2, 2, 'ADVANTIX_4PIP_0-4KG', 'Antiparasitario Externo', 'Advantix Box 0-4kg 4x0.4ml', '0.4ml', 17.06, 14, '4856B8', '2030-08-02', 365, 'Pequeños', 'undefined'),
(3, 3, 'NOBIVAC_RABIA', 'Vacuna', 'Nobivac Rabia 1ml', '1ml', 10, 84, '84hh383', '2030-08-02', 365, 'Rabia', NULL),
(4, 2, 'APLWS_CAT_SLM', 'Alimento Seco', 'Applaws Cat Salmón y Pollo 7Kg', '7kg', 35, 10, '3245', '2024-08-02', NULL, 'Adulto', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_log`
--

CREATE TABLE `products_log` (
  `id` int NOT NULL,
  `bill_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products_log`
--

INSERT INTO `products_log` (`id`, `bill_id`, `product_id`, `quantity`) VALUES
(31, 42, 2, 1),
(32, 42, 1, 1),
(33, 42, 2, 1),
(34, 42, 1, 1),
(35, 43, 3, 1),
(36, 43, 3, 1),
(37, 43, 3, 1),
(38, 44, 3, 1),
(39, 44, 3, 1),
(40, 44, 3, 1),
(41, 45, 2, 1),
(42, 45, 1, 1),
(43, 47, 1, 1),
(44, 47, 2, 1),
(45, 48, 2, 1),
(46, 48, 1, 1),
(47, 52, 2, 1),
(48, 52, 1, 1),
(51, 55, 2, 5),
(52, 57, 2, 1),
(53, 57, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_species`
--

CREATE TABLE `product_species` (
  `product_id` int NOT NULL,
  `species_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_species`
--

INSERT INTO `product_species` (`product_id`, `species_id`) VALUES
(1, 2),
(2, 1),
(3, 1),
(3, 2),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `race`
--

CREATE TABLE `race` (
  `id` int NOT NULL,
  `species_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `race`
--

INSERT INTO `race` (`id`, `species_id`, `name`) VALUES
(1, 1, 'Corgi'),
(2, 1, 'Pastor Alemán'),
(3, 1, 'Rottweiler'),
(4, 1, 'Alaskan Malamute'),
(5, 1, 'Bulldog Inglés'),
(6, 2, 'Angora Turco'),
(7, 2, 'Común Europeo'),
(15, 3, 'Sin raza'),
(16, 4, 'Sin raza'),
(19, 2, 'Sin raza'),
(20, 1, 'Sin raza'),
(21, 1, 'Husky Siberiano'),
(22, 18, 'Calva');

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

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`id`, `category`, `name`, `price`) VALUES
(1, 'Exploración', 'Exploración Geriátrica', 15.34),
(2, 'Cirujía', 'Esterilización', 85.57),
(3, 'Laboratorio', 'Bioquímica', 9.98),
(4, 'Imagen', 'Radiografía', 73.94);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services_log`
--

CREATE TABLE `services_log` (
  `id` int NOT NULL,
  `service_id` int NOT NULL,
  `bill_id` int NOT NULL,
  `quantity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `services_log`
--

INSERT INTO `services_log` (`id`, `service_id`, `bill_id`, `quantity`) VALUES
(14, 1, 44, 1),
(15, 1, 44, 1),
(16, 1, 44, 1),
(17, 3, 46, 1),
(18, 2, 46, 1),
(19, 4, 47, 1),
(20, 2, 47, 1),
(21, 1, 47, 1),
(22, 3, 57, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `species`
--

CREATE TABLE `species` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scientific_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `species`
--

INSERT INTO `species` (`id`, `name`, `scientific_name`) VALUES
(1, 'Perro', 'Canis familiaris'),
(2, 'Gato', 'Felis catus'),
(3, 'Pogona', 'Pogona vitticeps'),
(4, 'Cacatúa ninfa', 'Nymphicus hollandicus'),
(9, 'Vaca', 'Bos Taurus'),
(10, 'Oveja', 'Ovis Aries'),
(11, 'Hurón', 'Mustela Putorius Furo'),
(12, 'Caballo', 'Equus Caballus'),
(15, 'Elefante', 'Elephantidae'),
(16, 'Conejo', 'Oryctolagus cuniculus'),
(18, 'Cobaya', 'Cavia Porcellus'),
(19, '', ''),
(20, '123412', NULL),
(21, '123412', NULL);

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
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `supplier`
--

INSERT INTO `supplier` (`id`, `postal_code_id`, `code`, `category`, `name`, `email`, `phone`, `address`, `info`) VALUES
(1, 28020, 'ROYALCANIN_ESP', 'Nutrición', 'Royal Canin España S.A.', NULL, '+34 900 504 673', 'Plaza de Carlos Trias Bertrán, 4', ''),
(2, 46210, 'PIENSOSMARI', 'Varios', 'Piensos Marí S.L.', 'administracion@piensosmari.es', '+34 961 590 114', 'Carrer de la Creu, 5', ''),
(3, 39311, 'CEMAVE', 'Varios', 'CEMAVE Sanidad Animal S.L.', 'pedidosonline@cemave.com', '+34 942 82 31 36', 'Poligono Mies de Molladar Nave C4', '');

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
  `collegiate_n` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`, `name`, `last_name`, `email`, `salary`, `phone`, `dni`, `collegiate_n`, `area`, `pic`) VALUES
(6, 'chellmer0', '[\"ROLE_ADMIN\", \"ROLE_VET\", \"ROLE_STAFF\"]', '$2y$13$uIKCHceXiewALgoLvBZ9h.v/XqC1NxCknt2E48XrzbzG8QDU9JBiO', 'Colette', 'Hellmer', 'chellmer0@spiegel.de', 2900.35, '+84 841 230 4662', '25452007T', '12382', 'General', '/img/users/profile_6.jpg'),
(7, 'apoytress1', '[\"ROLE_VET\", \"ROLE_STAFF\"]', '$2y$13$YAhJE/nxOvjsyPrd9mKoxujPJtMfbC0FE8XfETTnj8J.ljAgA11vG', 'Ansel', 'Poytress', 'apoytress1@gizmodo.com', 2445.53, '+30 857 819 5974', 'Y0506830Q', '39635', 'General', '/img/users/profile_7.jpg'),
(8, 'dlehucquet2', '[\"ROLE_VET\", \"ROLE_STAFF\"]', '$2y$13$KOLFmIHCuvvH9ORbQTE22uQRJiwAPIfBU9cfjkRH9ZhqHSPQ8VArS', 'Darn', 'Le Hucquet', 'dlehucquet2@bizjournals.com', 2626.15, '+255 449 550 9640', '85685078G', '78582', 'Exotics', '/img/users/profile_8.jpg'),
(9, 'rbridden3', '[\"ROLE_ATV\", \"ROLE_STAFF\"]', '$2y$13$aK6f9QLMHZv0H9t4N/hkaOOJsN/MBSlWPONlogMLjxq6.mv.I2kVO', 'Rodina', 'Bridden', 'rbridden3@ebay.co.uk', 1650.39, '+86 546 757 3436', '78299706R', NULL, 'ATV', '/img/users/profile_9.jpg'),
(10, 'mbrinkman4', '[\"ROLE_OFFICE\", \"ROLE_STAFF\"]', '$2y$13$/0sG8vZ5rgo13FBpO4mF4usd5kpudfgN7ZFTwaspKu8hkM8mA458C', 'Madison', 'Brinkman', 'mbrinkman4@msn.com', 1400.51, '+62 408 263 6095', '04166875B', '', 'Office', '/img/users/profile_10.jpg'),
(11, 'Admin', '[\"ROLE_ADMIN\", \"ROLE_STAFF\"]', '$2a$10$B7SzQTFRWEyO3aptsKDSuujNN6lxeVxcH1lvST73vwjEun82lHd86', 'Admin', 'Administrador', 'admin@turdus.com', 0, '123456789', '0', '', 'Administración', '/img/users/profile_11.jpg');

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
  `weight` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `done` tinyint(1) NOT NULL,
  `duration` int NOT NULL,
  `cart` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `visit`
--

INSERT INTO `visit` (`id`, `patient_id`, `user_id`, `category`, `date_time`, `description`, `treatment`, `weight`, `done`, `duration`, `cart`) VALUES
(1, 1, 7, 'Consulta', '2022-03-30 11:45:00', '', '', '18', 1, 1, NULL),
(2, 3, 6, 'Cirugía', '2022-03-31 12:00:00', '', '', '36', 1, 4, '[{\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"1\", \"name\": \"Royal Canin Kitten Sterilised 2.5kg\", \"type\": \"products\", \"price\": \"26.99\"}, {\"q\": 1, \"id\": \"2\", \"name\": \"Esterilización\", \"type\": \"services\", \"price\": \"85.57\"}, {\"q\": 1, \"id\": \"1\", \"name\": \"Exploración Geriátrica\", \"type\": \"services\", \"price\": \"15.34\"}, {\"q\": 1, \"id\": \"4\", \"name\": \"Radiografía\", \"type\": \"services\", \"price\": \"73.94\"}]'),
(3, 5, 6, 'Cirugía', '2022-04-28 18:45:00', '', '', '19', 1, 2, '[{\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"1\", \"name\": \"Royal Canin Kitten Sterilised 2.5kg\", \"type\": \"products\", \"price\": \"26.99\"}]'),
(4, 8, 6, 'Exoticos', '2022-04-27 10:00:00', '', '', '4.8', 1, 5, '[{\"q\": 1, \"id\": \"1\", \"name\": \"Royal Canin Kitten Sterilised 2.5kg\", \"type\": \"products\", \"price\": \"26.99\"}, {\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"2\", \"name\": \"Esterilización\", \"type\": \"services\", \"price\": \"85.57\"}, {\"q\": 1, \"id\": \"4\", \"name\": \"Radiografía\", \"type\": \"services\", \"price\": \"73.94\"}, {\"q\": 1, \"id\": \"1\", \"name\": \"Exploración Geriátrica\", \"type\": \"services\", \"price\": \"15.34\"}]'),
(6, 7, 6, 'Consulta', '2022-04-25 10:30:00', 'Link es un gato naranja con un poco de sobrepeso', 'Rebajar cantidad de pienso', '5.3', 1, 3, '[{\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"3\", \"name\": \"Nobivac Rabia 1ml\", \"type\": \"products\", \"price\": \"10\"}]'),
(9, 5, 6, 'Consulta', '2022-04-22 10:00:00', '', '', '', 1, 1, '[{\"q\": \"1\", \"id\": \"1\", \"name\": \"Royal Canin Kitten Sterilised 2.5kg\", \"type\": \"products\", \"price\": \"26.99\"}]'),
(10, 26, 6, 'Consulta', '2022-04-27 13:15:00', 'Esto es una descripción cualquiera', '', '', 1, 1, '[{\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"1\", \"name\": \"Royal Canin Kitten Sterilised 2.5kg\", \"type\": \"products\", \"price\": \"26.99\"}]'),
(11, 13, 6, 'Consulta', '2022-04-27 11:00:00', '', '', '', 1, 2, '[{\"q\": 1, \"id\": \"3\", \"name\": \"Nobivac Rabia 1ml\", \"type\": \"products\", \"price\": \"10\"}, {\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}]'),
(12, 12, 8, 'Exoticos', '2022-04-27 10:30:00', '', '', '', 1, 1, '[{\"q\": 1, \"id\": \"1\", \"name\": \"Exploración Geriátrica\", \"type\": \"services\", \"price\": \"15.34\"}, {\"q\": 1, \"id\": \"3\", \"name\": \"Nobivac Rabia 1ml\", \"type\": \"products\", \"price\": \"10\"}]'),
(13, 8, 6, 'Consulta', '2022-04-27 12:00:00', '', '', '', 1, 2, '[{\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"1\", \"name\": \"Royal Canin Kitten Sterilised 2.5kg\", \"type\": \"products\", \"price\": \"26.99\"}]'),
(14, 19, 7, 'Cirugía', '2022-04-27 11:15:00', '', '', '', 1, 2, '[{\"q\": 1, \"id\": \"3\", \"name\": \"Bioquímica\", \"type\": \"services\", \"price\": \"9.98\"}, {\"q\": 1, \"id\": \"2\", \"name\": \"Esterilización\", \"type\": \"services\", \"price\": \"85.57\"}]'),
(15, 18, 6, 'Consulta', '2022-04-28 17:30:00', '', '', '', 1, 2, '[{\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"1\", \"name\": \"Royal Canin Kitten Sterilised 2.5kg\", \"type\": \"products\", \"price\": \"26.99\"}]'),
(16, 13, 6, 'Consulta', '2022-04-28 18:45:00', '', '', '', 1, 1, '[{\"q\": 1, \"id\": \"1\", \"name\": \"Exploración Geriátrica\", \"type\": \"services\", \"price\": \"15.34\"}, {\"q\": 1, \"id\": \"4\", \"name\": \"Radiografía\", \"type\": \"services\", \"price\": \"73.94\"}]'),
(17, 9, 6, 'Consulta', '2022-04-29 17:45:00', '', '', '', 1, 2, '[]'),
(19, 32, 6, 'Consulta', '2022-05-02 18:15:00', '', '', '', 0, 1, '[]'),
(20, 22, 6, 'Consulta', '2022-05-05 17:00:00', 'Una descripción', 'Un tratamiento', '', 1, 1, '[{\"q\": \"5\", \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}]'),
(21, 20, 6, 'Consulta', '2022-05-05 17:30:00', '', '', '', 1, 1, '[{\"q\": \"5\", \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}]'),
(22, 29, 6, 'Consulta', '2022-05-13 18:15:00', '', '', '', 1, 1, '[]'),
(24, 34, 6, 'Consulta', '2022-05-11 11:00:00', 'Herida', 'Antibiótico', '', 1, 2, '[{\"q\": 1, \"id\": \"2\", \"name\": \"Advantix Box 0-4kg 4x0.4ml\", \"type\": \"products\", \"price\": \"17.06\"}, {\"q\": 1, \"id\": \"3\", \"name\": \"Nobivac Rabia 1ml\", \"type\": \"products\", \"price\": \"10\"}, {\"q\": 1, \"id\": \"3\", \"name\": \"Bioquímica\", \"type\": \"services\", \"price\": \"9.98\"}]');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7A2119E39395C3F3` (`customer_id`),
  ADD KEY `IDX_7A2119E375FA0FF2` (`visit_id`);

--
-- Indices de la tabla `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_81398E09E7927C74` (`email`),
  ADD KEY `IDX_81398E09BDBA6A61` (`postal_code_id`),
  ADD KEY `IDX_81398E09C35E566A` (`family_id`);

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

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
  ADD KEY `IDX_1ADAD7EBC35E566A` (`family_id`),
  ADD KEY `IDX_1ADAD7EB40369CAB` (`vet_id`),
  ADD KEY `IDX_1ADAD7EBB2A1D860` (`species_id`),
  ADD KEY `IDX_1ADAD7EB6E59D40D` (`race_id`);

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
  ADD KEY `IDX_4B8D919B4584665A` (`product_id`);

--
-- Indices de la tabla `product_species`
--
ALTER TABLE `product_species`
  ADD PRIMARY KEY (`product_id`,`species_id`),
  ADD KEY `IDX_74D6ECA24584665A` (`product_id`),
  ADD KEY `IDX_74D6ECA2B2A1D860` (`species_id`);

--
-- Indices de la tabla `race`
--
ALTER TABLE `race`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_DA6FBBAFB2A1D860` (`species_id`);

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
  ADD KEY `IDX_82607D6ED5CA9E6` (`service_id`),
  ADD KEY `IDX_82607D61A8C12F5` (`bill_id`);

--
-- Indices de la tabla `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `family`
--
ALTER TABLE `family`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `products_log`
--
ALTER TABLE `products_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `race`
--
ALTER TABLE `race`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `services_log`
--
ALTER TABLE `services_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `species`
--
ALTER TABLE `species`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `visit`
--
ALTER TABLE `visit`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `FK_7A2119E375FA0FF2` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`),
  ADD CONSTRAINT `FK_7A2119E39395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Filtros para la tabla `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FK_81398E09BDBA6A61` FOREIGN KEY (`postal_code_id`) REFERENCES `postal_code` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_81398E09C35E566A` FOREIGN KEY (`family_id`) REFERENCES `family` (`id`);

--
-- Filtros para la tabla `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `FK_1ADAD7EB40369CAB` FOREIGN KEY (`vet_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_1ADAD7EB602AD315` FOREIGN KEY (`responsible_id`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `FK_1ADAD7EB6E59D40D` FOREIGN KEY (`race_id`) REFERENCES `race` (`id`),
  ADD CONSTRAINT `FK_1ADAD7EBB2A1D860` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`),
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
  ADD CONSTRAINT `FK_4B8D919B4584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Filtros para la tabla `product_species`
--
ALTER TABLE `product_species`
  ADD CONSTRAINT `FK_74D6ECA24584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_74D6ECA2B2A1D860` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `race`
--
ALTER TABLE `race`
  ADD CONSTRAINT `FK_DA6FBBAFB2A1D860` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`);

--
-- Filtros para la tabla `services_log`
--
ALTER TABLE `services_log`
  ADD CONSTRAINT `FK_82607D61A8C12F5` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`),
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
