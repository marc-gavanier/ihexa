CREATE TABLE "payment_terms" (
	"starting_point" varchar(20) NOT NULL,
	"days" integer NOT NULL,
	"end_of_month" boolean NOT NULL,
	"penalty_rate" real NOT NULL,
	"discount_tag" varchar(20) NOT NULL,
	"discount_rate" real,
	"discount_delay_threshold" integer,
	"payment_methods" varchar(255) NOT NULL,
	"iban" varchar(34)
);
