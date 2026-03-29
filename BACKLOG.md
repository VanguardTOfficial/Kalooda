# SweetDrop — Backlog

## In Progress

## Up Next

### 1. Drivers list in admin dashboard
- Add a drivers section to the current admin dashboard page
- Display all available drivers with name and phone number
- Store drivers in Supabase `drivers` table (id, name, phone, created_at)
- Add migration for the new table

### 2. Split admin into two pages
- **Dashboard** (`/admin`) — current order management view (no changes)
- **Functions** (`/admin/functions`) — super admin panel with:
  - Add / edit / remove products
  - Add / edit / remove drivers
  - Toggle product availability (mark as unavailable for today)
  - Future: manage categories, promotions, etc.

### 3. Full frontend redesign
- New theme, color palette, and typography
- New logo / brand identity
- Redesign all pages: storefront, checkout, admin, delivery driver page
- Keep layout structure but refresh visual style

### 4. Seed real products from business owner into Supabase
- Collect product list from business owner (name, description, price, category, allergens, stock)
- Write a new migration or seed script to insert into Supabase `products` table
- Replace current mock/demo products

## Backlog

## Done
