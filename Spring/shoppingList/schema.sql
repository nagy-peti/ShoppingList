CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "password" varchar
);

CREATE TABLE "Friends" (
  "id_1" int,
  "id_2" int
);

CREATE TABLE "Shopping_list" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" int,
  "name" varchar,
  "shared_with_friends" boolean
);

CREATE TABLE "Items" (
  "id" SERIAL PRIMARY KEY,
  "shopping_list_id" int,
  "quantity" int,
  "quantity_type" varchar,
  "name" varchar
);

CREATE TABLE "Recipes" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "Shopping_list_for_recipes" (
  "recipe_id" int,
  "shopping_list_id" int
);

ALTER TABLE "Friends" ADD FOREIGN KEY ("id_1") REFERENCES "Users" ("id");

ALTER TABLE "Friends" ADD FOREIGN KEY ("id_2") REFERENCES "Users" ("id");

ALTER TABLE "Shopping_list" ADD FOREIGN KEY ("owner_id") REFERENCES "Users" ("id");

ALTER TABLE "Items" ADD FOREIGN KEY ("shopping_list_id") REFERENCES "Shopping_list" ("id");

ALTER TABLE "Shopping_list_for_recipes" ADD FOREIGN KEY ("recipe_id") REFERENCES "Recipes" ("id");

ALTER TABLE "Shopping_list_for_recipes" ADD FOREIGN KEY ("shopping_list_id") REFERENCES "Shopping_list" ("id");
