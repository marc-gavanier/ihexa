ALTER TABLE "client" ALTER COLUMN "firstname" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "client" ALTER COLUMN "lastname" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "client" drop column "search_text";--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "search_text" text GENERATED ALWAYS AS (lower(immutable_unaccent(coalesce(firstname, '') || ' ' || coalesce(lastname, '') || ' ' || coalesce(denomination_sociale, '') || ' ' || street || ' ' || city || ' ' || zipcode))) STORED;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "type" varchar(10) DEFAULT 'B2C' NOT NULL;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "denomination_sociale" varchar(400);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "forme_juridique" varchar(20);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "siret" varchar(14);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "tva_intracommunautaire" varchar(13);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "email" varchar(320);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "phone" varchar(16);--> statement-breakpoint
ALTER TABLE "client" ADD CONSTRAINT "client_siret_unique" UNIQUE("siret");