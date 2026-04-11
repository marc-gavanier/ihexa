CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TABLE "client" (
	"id" uuid PRIMARY KEY NOT NULL,
	"firstname" varchar(100) NOT NULL,
	"lastname" varchar(100) NOT NULL,
	"street" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"zipcode" varchar(5) NOT NULL
);
