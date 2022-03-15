-- Creación de USUARIOS (USER)
INSERT INTO `user`(`username`, `roles`, `password`, `area`, `name`, `last_name`, `email`, `salary`, `phone`, `dni`, `collegiate_n`) VALUES ('chellmer0', '["ROLE_ADMIN","ROLE_VET"]', '8yhXo3A', 'General', 'Colette', 'Hellmer', 'chellmer0@spiegel.de', '2900.35', '+84 841 230 4662', '25452007T', '12382');
INSERT INTO `user`(`username`, `roles`, `password`, `area`, `name`, `last_name`, `email`, `salary`, `phone`, `dni`, `collegiate_n`) VALUES ('apoytress1', '["ROLE_VET"]', 'nPzRWOusg', 'General', 'Ansel', 'Poytress', 'apoytress1@gizmodo.com', '2445.53', '+30 857 819 5974', 'Y0506830Q', '39635');
INSERT INTO `user`(`username`, `roles`, `password`, `area`, `name`, `last_name`, `email`, `salary`, `phone`, `dni`, `collegiate_n`) VALUES ('dlehucquet2', '["ROLE_VET"]', 'A50JMS', 'Exotics', 'Darn', 'Le Hucquet', 'dlehucquet2@bizjournals.com', '2626.15', '+255 449 550 9640', '85685078G', '78582');
INSERT INTO `user`(`username`, `roles`, `password`, `area`, `name`, `last_name`, `email`, `salary`, `phone`, `dni`) VALUES ('rbridden3', '["ROLE_ATV"]', 'ZzwS6oZ', 'ATV', 'Rodina', 'Bridden', 'rbridden3@ebay.co.uk', '1650.39', '+86 546 757 3436', '78299706R');
INSERT INTO `user`(`username`, `roles`, `password`, `area`, `name`, `last_name`, `email`, `salary`, `phone`, `dni`) VALUES  ('mbrinkman4', '["ROLE_OFFICE"]', 'USMq7X3h4n', 'Office', 'Madison', 'Brinkman', 'mbrinkman4@msn.com', '1400.51', '+62 408 263 6095', '04166875B');

-- Creación de CÓDIGOS POSTALES (POSTAL_CODE)
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (26004,'La Rioja','Logroño','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (26006,'La Rioja','Logroño','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (26002,'La Rioja','Logroño','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (26000,'La Rioja','Varea','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (26142,'La Rioja','Villamediana de Iregua','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (26140,'La Rioja','Lardero','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (28020,'Madrid','Madrid','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (46210,'Valencia','Picaña','Spain');
INSERT INTO `postal_code`(`id`, `province`, `city`, `country`) VALUES (39311,'Cantabria','Cartes','Spain');

-- Creación de FAMILIAS (FAMILY)
INSERT INTO `family`(`name`) VALUES ('ForbesFam');
INSERT INTO `family`(`name`) VALUES ('McCarterFam');
INSERT INTO `family`(`name`) VALUES ('KenvinFam');
INSERT INTO `family`(`name`) VALUES ('GostageFam');
INSERT INTO `family`(`name`) VALUES ('ProvisFam');
INSERT INTO `family`(`name`) VALUES ('AbraminoFam');
INSERT INTO `family`(`name`) VALUES ('TottmanFam');
INSERT INTO `family`(`name`) VALUES ('ThornhamFam');
INSERT INTO `family`(`name`) VALUES ('EgarFam');

-- Creación de CLIENTES (CUSTOMER)
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26004, 1, 'pforbes0@blogger.com', 'aDrHEo', '14932159F', 'Pepito', 'Forbes', '825 Farragut Point', '+86 326 110 2218', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26006, 1, 'lshorthill1@earthlink.net', 'wfVdT9Jc7', '14932159F', 'Leroi', 'Shorthill', '8372 Merrick Parkway', '+86 317 824 6782', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (null, 2, 'dmaccarter2@bbb.org', 'lKZ8dq', '14932159F', 'Derward', 'MacCarter', '8518 Glendale Lane', '+86 461 251 1548', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26002, 3, 'mkenvin3@hubpages.com', 'JkVX5aigP', '14932159F', 'Mikael', 'Kenvin', '30399 Shopko Place', '+62 320 951 7892', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26004, 4, 'kgostage4@newsvine.com', 'Z77SM9FK', '14932159F', 'Kate', 'Gostage', '4 Moose Plaza', '+86 565 434 1335', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26000, 5, 'nprovis5@blogs.com', '7UQDXi2AM8A', '14932159F', 'Nicko', 'Provis', '0678 Southridge Junction', '+86 265 572 6929', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26142, 6, 'iabramino6@ustream.tv', '5QvVMO', '14932159F', 'Isidor', 'Abramino', '7440 American Ash Circle', '+63 459 774 4101', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26140, 7, 'stottman7@studiopress.com', 'zoWm2OHvH', '14932159F', 'Sonja', 'Tottman', '2836 Melvin Terrace', '+62 192 699 2870', 'Fusce consequat. Nulla nisl. Nunc nisl.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26140, 8, 'mthornham8@skyrock.com', 'Jj2WMI', '14932159F', 'Martelle', 'Thornham', '6185 Grasskamp Crossing', '+86 944 446 6829', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.');
insert into customer (postal_code_id, family_id, email, password, dni, name, last_name, address, phone, info) values (26006, 9, 'hegar9@1und1.de', 'QvOC2DSp', '14932159F', 'Had', 'Egar', '3 Thackeray Drive', '+1 592 726 9088', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.');

-- Creación de PACIENTES (PATIENT)
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (2, 1, '3446145885', 'Yolo', '2020-08-26', 'Canis Familiaris', 'Corgi', 'Khaki', 'Marrones', 'Male', '0', '');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (3, 2, '7122081079', 'Loli', '2015-09-08', 'Canis Familiaris', 'Rottweiler', 'Negro y fuego', 'Marrones', 'Female', '0', '');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (4, 3, '0722577168', 'Thor', '2017-07-08', 'Canis Familiaris', 'Pastor Alemán', 'Negro y fuego', 'Verdes', 'Male', '1', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (5, 4, '1389451828', 'Nieve', '2014-07-26', 'Canis Familiaris', 'Alaskan Malamute', 'Blanco y gris', 'Azules', 'Male', '1', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (6, 5, '7069698747', 'Croqueta', '2019-12-28', 'Canis Familiaris', 'Bulldog Inglés', 'Marrón y blanco', 'Marrones', 'Female', '0', '');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (7, 6, '5256960873', 'Pelusa', '2020-01-01', 'Felis Catus', 'Angora Turco', 'Blanco', 'i: Azul, d: Amarillo', 'Female', '0', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (8, 7, '7219947844', 'Link', '2012-04-11', 'Felis Catus', 'Común Europeo', 'Naranja Atigrado', 'Amarillos', 'Male', '1', '');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (9, 8, '5509332557', 'Forito', '2012-04-01', 'Felis Catus', 'Común Europeo', 'Blanco y gris atigrado', 'Verdes', 'Male', '1', '');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (10, 9, '8996348643', 'Malfoy', '2017-12-30', 'Pogona Vitticeps', 'Red', 'Rojo', 'Negro', 'Male', '0', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.');
insert into patient (responsible_id, family_id, chip, name, birthday, species, race, color, eyes, gender, sterilised, info) values (1, 2, '0061601942', 'Ringtone', '2019-11-26', 'Nymphicus Hollandicus', '', 'Blanca y Amarilla', 'Marrones', 'Female', '0', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.');

-- Creación de ALERGIAS (ALLERGIE)
INSERT INTO `allergie`(`substance`) VALUES ('Ácaros del polvo');
INSERT INTO `allergie`(`substance`) VALUES ('Soja');
INSERT INTO `allergie`(`substance`) VALUES ('Saliva de la pulga');

-- Creación del REGISTRO DE ALERGIAS (ALLERGIES_LOG)
INSERT INTO `allergies_log`(`patient_id`, `allergie_id`, `date_time`, `description`) VALUES (2,1,'2022-02-26 10:41:19','Reacción leve');

-- Creación de DIAGNÓSTICOS (DIAGNOSIS)
INSERT INTO `diagnosis`(`name`) VALUES ('Gastroenteritis');
INSERT INTO `diagnosis`(`name`) VALUES ('Parvovirus');
INSERT INTO `diagnosis`(`name`) VALUES ('Otitis');
INSERT INTO `diagnosis`(`name`) VALUES ('Alergia cutánea');
INSERT INTO `diagnosis`(`name`) VALUES ('Parásitos Externos: Pulgas');

-- Creación de PROVEEDORES (SUPPLIER)
INSERT INTO `supplier`(`postal_code_id`, `code`, `category`, `name`, `email`, `phone`, `address`, `info`, `tax`) VALUES (28020, 'ROYALCANIN_ESP','Nutrición','Royal Canin España S.A.',null,'+34 900 504 673','Plaza de Carlos Trias Bertrán, 4','','0');
INSERT INTO `supplier`(`postal_code_id`, `code`, `category`, `name`, `email`, `phone`, `address`, `info`, `tax`) VALUES (46210, 'PIENSOSMARI','Varios','Piensos Marí S.L.','administracion@piensosmari.es','+34 961 590 114','Carrer de la Creu, 5','','0');
INSERT INTO `supplier`(`postal_code_id`, `code`, `category`, `name`, `email`, `phone`, `address`, `info`, `tax`) VALUES (39311, 'CEMAVE','Varios','CEMAVE Sanidad Animal S.L.','pedidosonline@cemave.com','+34 942 82 31 36','Poligono Mies de Molladar Nave C4','','0');

-- Creación de PRODUCTOS (PRODUCT)
INSERT INTO `product`(`supplier_id`, `code`, `category`, `subcategory`, `name`, `dose`, `price`, `species`, `stock`, `lot`, `expiration`, `life`) VALUES ('1','ROYAL_KITTEN_STR_2.5','Alimento Seco', 'Cachorro','Royal Canin Kitten Sterilised 2.5kg','2.5kg','26.99','Felis Catus','30','L456','2030-08-02',null);
INSERT INTO `product`(`supplier_id`, `code`, `category`, `subcategory`, `name`, `dose`, `price`, `species`, `stock`, `lot`, `expiration`, `life`) VALUES ('2','ADVANTIX_4PIP_0-4KG','Antiparasitario Externo', 'Pequeños','Advantix Box 0-4kg 4x0.4ml','0.4ml','17.06','Canis Familiaris','15','4856B8','2030-08-02','365');
INSERT INTO `product`(`supplier_id`, `code`, `category`, `subcategory`, `name`, `dose`, `price`, `species`, `stock`, `lot`, `expiration`, `life`) VALUES ('3','NOBIVAC_RABIA','Vacuna', 'Rabia','Novibac Rabia 1ml','1ml','10.00','Varios','85','84hh383','2030-08-02','365');

-- Creación de SERVICIOS (SERVICE)
INSERT INTO `service`(`category`, `name`, `price`) VALUES ('Exploración','Exploración Geriátrica','15.34');
INSERT INTO `service`(`category`, `name`, `price`) VALUES ('Cirujía','Esterilización','85.57');
INSERT INTO `service`(`category`, `name`, `price`) VALUES ('Laboratorio','Bioquímica','9.98');
INSERT INTO `service`(`category`, `name`, `price`) VALUES ('Imagen','Radiografía','73.94');


