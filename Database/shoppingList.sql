CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `Friends` (
  `id_1` int,
  `id_2` int
);

CREATE TABLE `Shopping_list` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `owner_id` int,
  `name` varchar(255),
  `shared_with_friends` tinyint
);

CREATE TABLE `Items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `shopping_list_id` int,
  `quantity` int,
  `quantity_type` varchar(255),
  `name` varchar(255)
);

CREATE TABLE `Recipes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `Shopping_list_for_recipes` (
  `recipe_id` int,
  `shopping_list_id` int
);

ALTER TABLE `Friends` ADD FOREIGN KEY (`id_1`) REFERENCES `Users` (`id`);

ALTER TABLE `Friends` ADD FOREIGN KEY (`id_2`) REFERENCES `Users` (`id`);

ALTER TABLE `Shopping_list` ADD FOREIGN KEY (`owner_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Items` ADD FOREIGN KEY (`shopping_list_id`) REFERENCES `Shopping_list` (`id`);

ALTER TABLE `Shopping_list_for_recipes` ADD FOREIGN KEY (`recipe_id`) REFERENCES `Recipes` (`id`);

ALTER TABLE `Shopping_list_for_recipes` ADD FOREIGN KEY (`shopping_list_id`) REFERENCES `Shopping_list` (`id`);
