
INSERT INTO `Users` (`username` , `password`) VALUES ('user1','user1');
INSERT INTO `Users` (`username` , `password`) VALUES ('user2','user2');
INSERT INTO `Users` (`username` , `password`) VALUES ('user3','user3');
INSERT INTO `Users` (`username` , `password`) VALUES ('user4','user4');

INSERT INTO `friends` (`id_1` , `id_2`) VALUES (1,2);
INSERT INTO `friends` (`id_1` , `id_2`) VALUES (1,3);
INSERT INTO `friends` (`id_1` , `id_2`) VALUES (3,4);


INSERT INTO `Shopping_list` (`owner_id` , `name`,`shared_with_friends`) VALUES (1,'list1',FALSE);
INSERT INTO `Shopping_list` (`owner_id` , `name`,`shared_with_friends`) VALUES (1,'list2',FALSE );
INSERT INTO `Shopping_list` (`owner_id` , `name`,`shared_with_friends`) VALUES (2,'list3',FALSE );
INSERT INTO `Shopping_list` (`owner_id` , `name`,`shared_with_friends`) VALUES (1,'sharedList1',TRUE );
INSERT INTO `Shopping_list` (`owner_id` , `name`,`shared_with_friends`) VALUES (1,'sharedList2',TRUE );


INSERT INTO `Items` (`shopping_list_id`, `quantity`, `quantity_type`, `name`) VALUES (1, 1, 'db', 'item1');
INSERT INTO `Items` (`shopping_list_id`, `quantity`, `quantity_type`, `name`) VALUES (1, 1, 'db', 'item2');
INSERT INTO `Items` (`shopping_list_id`, `quantity`, `quantity_type`, `name`) VALUES (1, 1, 'db', 'item3');


INSERT INTO `Recipes` (`name`) VALUES ('recipe1');
INSERT INTO `Recipes` (`name`) VALUES ('recipe2');


INSERT INTO `Items` (`recipe_id`, `quantity`, `quantity_type`, `name`) VALUES (1, 1, 'db', 'item4');
INSERT INTO `Items` (`recipe_id`, `quantity`, `quantity_type`, `name`) VALUES (1, 1, 'db', 'item5');
INSERT INTO `Items` (`recipe_id`, `quantity`, `quantity_type`, `name`) VALUES (2, 1, 'db', 'item6');


insert into `Shopping_list_for_recipes` (`recipe_id`,`shopping_list_id`) VALUES (1,1);
insert into `Shopping_list_for_recipes` (`recipe_id`,`shopping_list_id`) VALUES (2,1);
insert into `Shopping_list_for_recipes` (`recipe_id`,`shopping_list_id`) VALUES (2,2);