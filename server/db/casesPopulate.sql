
INSERT INTO productTypes (name) VALUES ('Phone Case');

Insert INTO products (name,imageUrl,availableStock,price) Values ('Frozen HTC10','HTC10-frozen.png',40,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Star Wars HTC10','HTC10-StarWars.png',21,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Sillicon Valley HTC10','HTC10-SiliconV.png',0,5.49);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Avengers HTC10','HTC10-Avengers.png',34,5.49);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Game of thrones HTC10','HTC10-GOT.png',1,5.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Star Wars iPhone','IPhone6-StarWars.png',5,4.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Sillicon Valley iPhone','IPhone6-SiliconeV.png',0,4.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Avengers iPhone','IPhone6-Avengers.png',23,4.99);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Game of thrones iPhone','IPhone6-GOT.png',12,4.49);
Insert INTO products (name,imageUrl,availableStock,price) Values ('Frozen iPhone','IPhone6-frozen.png',9,4.49);

Insert INTO workers (firstname, lastname, email, password, active) Values ('tom','banister','tgbanister@gmail.com','password',false);
Insert INTO workers (firstname, lastname, email, password, active) Values ('tim','miles','tmiles@gmail.com','password',false);

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


INSERT INTO `users` (`id`, `email`, `password`, `address1`, `address2`, `address3`, `postcode`, `firstName`, `lastName`, `updatedAt`, `createdAt`, `userRole`)
VALUES
	(1, 'tgbanister@gmail.com', '$2a$08$yDQxZGAVVqFJ.vrSR1XVCeHiV8yfvgxVUXpbzM70zRmeq3qR42NcS', '9 Test Drive', 'Super Town', NULL, 'OL3 6KD', 'tom', 'banister', '2016-07-27 13:33:50', '2016-07-27 13:33:50', 'customer');


INSERT INTO `orders` (`id`, `status`, `orderDate`, `dispatchDate`, `userID`, `workerID`, `createdAt`, `updatedAt`)
VALUES
	(12, 'allocated, pending accpetance', '1970-01-01 00:00:00', NULL, 1, NULL, '2016-07-27 14:11:57', '2016-07-27 14:11:57'),
	(13, 'allocated, pending accpetance', '1970-01-01 00:00:00', NULL, 1, NULL, '2016-07-27 15:04:42', '2016-07-27 15:04:42'),
	(14, 'allocated, pending accpetance', '1970-01-01 00:00:00', NULL, 1, NULL, '2016-07-27 15:06:09', '2016-07-27 15:06:09');

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
