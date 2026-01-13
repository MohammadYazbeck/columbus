-- Drop the obsolete price column now that pricing is no longer displayed or stored
ALTER TABLE "Product" DROP COLUMN IF EXISTS "priceSyp";
