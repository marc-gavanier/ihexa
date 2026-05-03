CREATE TABLE "seller" (
	"company_name" varchar(400) NOT NULL,
	"legal_form" varchar(10) NOT NULL,
	"siren" varchar(9) NOT NULL,
	"siret" varchar(14) PRIMARY KEY NOT NULL,
	"street" varchar(255) NOT NULL,
	"zipcode" varchar(5) NOT NULL,
	"city" varchar(255) NOT NULL,
	"insee_code" varchar(5) NOT NULL,
	"vat_regime" varchar(20) NOT NULL,
	"vat_number" varchar(13),
	"tax_debit_option" boolean,
	"rcs_registration" varchar(255),
	"share_capital" integer,
	"email" varchar(255) NOT NULL,
	"phone" varchar(15),
	"website" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "client" drop column "search_text";--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "search_text" text GENERATED ALWAYS AS (lower(immutable_unaccent(firstname || ' ' || lastname || ' ' || street || ' ' || city || ' ' || zipcode))) STORED;