
INSERT INTO productTypes (name) VALUES ('Phone Case');

Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Frozen HTC10','HTC10-frozen.png',40,5.99,'Let it go! Let it go! feel the magic every day with this case featuring our favourite Disney ice princess');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Star Wars HTC10','HTC10-StarWars.png',21,5.99,'May the force be with you! Kylo Ren is menacing on this space-aged case');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Silicon Valley HTC10','HTC10-SiliconV.png',0,5.49,'Join the Pied Piper team with this case from the hillarious comedy smash!');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Avengers HTC10','HTC10-Avengers.png',34,5.49,'ASSEMBLE! Join your favourite super heroes');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Game of thrones HTC10','HTC10-GOT.png',1,5.99,'You know nothing Jon Snow!');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Star Wars iPhone','IPhone6-StarWars.png',5,4.99,'May the force be with you! Kylo Ren is menacing on this space-aged case');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Silicon Valley iPhone','IPhone6-SiliconeV.png',0,4.99,'Join the Pied Piper team with this case from the hillarious comedy smash!');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Avengers iPhone','IPhone6-Avengers.png',23,4.99,'ASSEMBLE! Join your favourite super heroes');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Game of thrones iPhone','IPhone6-GOT.png',12,4.49,'You know nothing Jon Snow!');
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('Frozen iPhone','IPhone6-frozen.png',9,4.49,'Let it go! Let it go! feel the magic every day with this case featuring our favourite Disney ice princess');

Insert INTO products (name,imageUrl,availableStock,price) Values ('Tie Fighter iPhone 6','IPhone6-TFighter.png',40,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Beach Fight iPhone 6','IPhone6-StarWarsBeach.png',21,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Rey iPhone 6','IPhone6-Rey.png',14,5.49);
Insert INTO products (name,imageUrl,availableStock,price) Values ('PoeiPhone 6','IPhone6-Poe.png',34,5.49);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Millennium Falcon iPhone 6','IPhone6-MF.png',24,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Jakku iPhone 6','IPhone6-Jakku.png',34,4.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('BB8 iPhone 6','IPhone6-BB8.png',53,4.99);

Insert INTO products (name,imageUrl,availableStock,price) Values ('Beach Fight HTC 10','HTC10-StarWarsSand.png',40,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Rey HTC 10','HTC10-Rey.png',21,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Poe HTC 10','HTC10-Poe.png',14,5.49);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Millennium Falcon HTC 10','HTC10-MF.png',34,5.49);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Jakku HTC 10','HTC10-Jakku.png',34,4.99);
Insert INTO products (name,imageUrl,availableStock,price,description) Values ('BB8 HTC 10','HTC10-BB8.png',53,4.99,'BB8!!! Everyones favourite ball shaped droid');

INSERT INTO `workers` (`id`, `firstname`, `lastname`, `email`, `password`, `active`, `createdAt`, `updatedAt`)
VALUES
	(3, 'Worker', 'Person', 'worker@sky.uk', '$2a$08$zgzNy4j36Lr6uCNd7nHvTOd/4spkz1LpjVMV662eAm.KgFE77WNnm', 0, '2016-07-29 09:39:55', '2016-07-29 09:39:55'),
	(4, 'Worker2', 'Person', 'worker2@sky.uk', '$2a$08$z7YSfBuN14OPf3CkOkaTB.af71ebyqqP0UlqqHlc9DqnwYgRZX1we', 0, '2016-07-29 09:40:18', '2016-07-29 09:40:18');


INSERT INTO productInfo (productID, infoName, infoValue) VALUES (1, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (2, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (3, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (4, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (5, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (6, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (7, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (8, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (9, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (10, "PhoneType", "iPhone 6");

INSERT INTO productInfo (productID, infoName, infoValue) VALUES (11, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (12, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (13, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (14, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (15, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (16, "PhoneType", "iPhone 6");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (17, "PhoneType", "iPhone 6");

INSERT INTO productInfo (productID, infoName, infoValue) VALUES (18, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (19, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (20, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (21, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (22, "PhoneType", "HTC 10");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (23, "PhoneType", "HTC 10");



INSERT INTO productInfo (productID, infoName, infoValue) VALUES (1, "ShowName", "Frozen");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (2, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (3, "ShowName", "Silicon Valley");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (4, "ShowName", "Avengers");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (5, "ShowName", "Game Of Thrones");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (6, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (7, "ShowName", "Silicon Valley");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (8, "ShowName", "Avengers");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (9, "ShowName", "Game Of Thrones");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (10, "ShowName", "Frozen");

INSERT INTO productInfo (productID, infoName, infoValue) VALUES (11, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (12, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (13, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (14, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (15, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (16, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (17, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (18, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (19, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (20, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (21, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (22, "ShowName", "Star Wars");
INSERT INTO productInfo (productID, infoName, infoValue) VALUES (23, "ShowName", "Star Wars");


INSERT INTO `users` (`id`, `email`, `password`, `address1`, `address2`, `address3`, `postcode`, `firstName`, `lastName`, `updatedAt`, `createdAt`, `userRole`)
VALUES
	(2, 'tgbanister@gmail.com', '$2a$08$EvbEiyUVQF2/EN1vhxwhO.9TytgboEXWvETmIMfRak/WLBM35Y9l2', '10', 'Grove Rd', 'Uppermill', 'OL3 6ED', 'Tom', 'Banister', '2016-07-29 09:33:26', '2016-07-29 09:33:26', 'customer'),
	(3, 'gsangha494@gmail.com', '$2a$08$nxmwT9YVwJNKbNNZvAm1R.RSx8B2/vt6QmhKlQ5sLFl2Uq1DCxDNi', '312', 'New St', 'Old Town', 'OL29RD', 'Gary', 'Sangha', '2016-07-29 09:36:33', '2016-07-29 09:36:33', 'customer'),
	(4, 'tech@sky.uk', '$2a$08$36HELCJA1cr55bBDSn4crOaoC4zLZdU1WAHfZHDaLcpj5Jp8j3KBu', '312', 'New St', 'Old Town', 'OL29RD', 'Mark', 'Griffiths', '2016-07-29 09:37:54', '2016-07-29 09:37:54', 'tech_support');


INSERT INTO `orders` (`id`, `status`, `orderDate`, `dispatchDate`, `userID`, `workerID`, `createdAt`, `updatedAt`)
VALUES
	(12, 'allocated, pending accpetance', '1970-01-01 00:00:00', NULL, 2, NULL, '2016-07-27 14:11:57', '2016-07-27 14:11:57'),
	(13, 'allocated, pending accpetance', '1970-01-01 00:00:00', NULL, 2, NULL, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(14, 'allocated, pending accpetance', '1970-01-01 00:00:00', NULL, 2, NULL, '2016-07-27 15:06:09', '2016-07-27 15:06:09');

INSERT INTO `productOrders` (`id`, `orderID`, `productID`, `createdAt`, `updatedAt`)
VALUES
	(31, 12, 1, '2016-07-27 14:11:57', '2016-07-27 14:11:57'),
	(32, 12, 1, '2016-07-27 14:11:57', '2016-07-27 14:11:57'),
	(33, 12, 2, '2016-07-27 14:11:57', '2016-07-27 14:11:57'),
	(34, 13, 2, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(35, 13, 2, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(36, 13, 2, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(37, 13, 1, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(38, 13, 1, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(39, 13, 1, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(40, 13, 1, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(41, 14, 1, '2016-07-27 15:06:09', '2016-07-27 15:06:09'),
	(42, 14, 1, '2016-07-27 15:06:09', '2016-07-27 15:06:09'),
	(43, 14, 1, '2016-07-27 15:06:09', '2016-07-27 15:06:09'),
	(44, 14, 2, '2016-07-27 15:06:09', '2016-07-27 15:06:09'),
	(45, 14, 2, '2016-07-27 15:06:09', '2016-07-27 15:06:09');
