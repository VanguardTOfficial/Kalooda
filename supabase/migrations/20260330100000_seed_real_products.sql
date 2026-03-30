-- Replace demo/mock data with real products from business owner

-- Clear demo data (orders reference product names in JSONB, not FKs, so they must go too)
delete from deliveries;
delete from orders;
delete from products;
delete from categories;

-- Insert real categories with bilingual names
insert into categories (name, slug, image_url, name_ar) values
  ('Baked Cheeses',   'baked-cheeses',   null, 'اجبان مخبوزة'),
  ('Personal Serving', 'personal-serving', null, 'وجبة شخصية'),
  ('Biscuits',         'biscuits',         null, 'بسكوت');

-- Insert real products
insert into products (
  category_id, name, name_ar, description, description_ar,
  price, stock_quantity, ingredients, ingredients_ar, allergens
) values
  (
    (select id from categories where slug = 'baked-cheeses'),
    'Japanese Baked Cheesecake',
    'الجبنة اليابانية المخبوزة',
    'Lightly sweet',
    'خفيفة الحلاوة',
    100, 100,
    'Eggs, cheese mix, sugar',
    'بيض، خليط اجبان، سكر',
    '{"eggs","dairy"}'
  ),
  (
    (select id from categories where slug = 'baked-cheeses'),
    'San Sebastian Slice',
    'قطعة سان سبستيان',
    'Creamy, rich',
    'كريمية، دسمة',
    30, 100,
    'Eggs, cheese mix, sugar',
    'بيض، خليط اجبان، سكر',
    '{"eggs","dairy"}'
  ),
  (
    (select id from categories where slug = 'personal-serving'),
    'Tres Leches',
    'ترلتشي',
    null,
    null,
    12, 100,
    'Vanilla sponge, milk, sugar, caramel, cream',
    'اسفنج فانيل، حليب، سكر، كراميل، كريما',
    '{"dairy"}'
  ),
  (
    (select id from categories where slug = 'biscuits'),
    'Quarter Kilo Maqrouta',
    'ربع كيلو مقروطة',
    'Kinder',
    'كندر',
    35, 100,
    'Butter dough, filling spread',
    'عجينة زبدة، ممراح',
    '{"dairy","gluten"}'
  );
