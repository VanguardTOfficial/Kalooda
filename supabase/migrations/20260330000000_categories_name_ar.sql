-- Add Arabic name column to categories for bilingual support
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_ar text;
