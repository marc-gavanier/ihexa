CREATE EXTENSION IF NOT EXISTS pg_trgm;--> statement-breakpoint
CREATE OR REPLACE FUNCTION immutable_unaccent(text) RETURNS text AS $$
  SELECT unaccent($1);
$$ LANGUAGE sql IMMUTABLE;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "search_text" text GENERATED ALWAYS AS (lower(immutable_unaccent(firstname || ' ' || lastname || ' ' || street || ' ' || city || ' ' || zipcode))) STORED;--> statement-breakpoint
CREATE INDEX "client_search_text_trgm_idx" ON "client" USING gin ("search_text" gin_trgm_ops);
