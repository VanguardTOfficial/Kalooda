# SweetDrop — Backlog

## In Progress

## Up Next

### 1. Full frontend redesign
- New theme, color palette, and typography
- New logo / brand identity
- Redesign all pages: storefront, checkout, admin, delivery driver page
- Keep layout structure but refresh visual style

### 2. Customer order history page
- Customer can view current (active) and past (completed) orders
- Show relevant order details: order number, date, items, quantities, total price, and status
- Distinguish between active orders (e.g. pending, preparing, out for delivery) and past orders (delivered, cancelled)
- Accessible from the customer-facing side (e.g. via a "My Orders" link)

## Done

### Seed real products from business owner into Supabase
- ~~Collected product list from business owner (4 products, 3 categories, bilingual)~~
- ~~Migration `20260330100000_seed_real_products.sql` replaces demo data with real products~~
- ~~Pushed migration to remote Supabase~~

### Split admin into two pages
- ~~**Dashboard** (`/admin`) — order management + product availability toggles~~
- ~~**Functions** (`/admin/functions`) — super admin panel with:~~
  - ~~Add / edit / remove products with bilingual support (English & Arabic)~~
  - ~~Tabbed English / Arabic fields for `name`, `description`, `ingredients`~~
  - ~~Migration: added `name_ar`, `description_ar`, `ingredients_ar`, `unavailable_today` columns~~
  - ~~Manage drivers (moved from dashboard)~~
  - ~~Toggle product availability (mark as unavailable for today)~~
- ~~Shared admin layout with Dashboard / Functions tab navigation~~
- ~~Storefront uses Arabic fields when locale is `ar`, filters out unavailable products~~
- ~~Pushed migration to remote Supabase~~

### Drivers list in admin dashboard
- ~~Add a drivers section to the current admin dashboard page~~
- ~~Display all available drivers with name and phone number~~
- ~~Store drivers in Supabase `drivers` table (id, name, phone, created_at)~~
- ~~Add migration for the new table~~
- ~~Add / remove drivers from the admin UI~~
- ~~Push `drivers` migration to remote Supabase~~
