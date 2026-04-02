# SweetDrop — Backlog

## In Progress

## Up Next

### 1. Role-based page separation & access control

**Description**
Enforce strict route protection so that customers can only access customer pages, admins can only access admin pages, and super admins can access both admin pages and admin-functions pages. Unauthorized or unauthenticated users must be blocked from restricted routes, including direct URL access.

**Technical notes**
- Add a Next.js **middleware** (`src/middleware.ts`) that runs on every request:
  - Read the Supabase session from cookies.
  - Define route groups:
    - **Public**: `/sign-in`, `/sign-up`, `/` (storefront), `/checkout`, `/delivery/accept/*`.
    - **Auth-required (customer)**: `/orders` (future order-history page), any future customer-only routes.
    - **Admin**: `/admin` — requires `role = 'admin'` or `role = 'super_admin'`.
    - **Super Admin**: `/admin/functions` — requires `role = 'super_admin'`.
  - Unauthenticated users hitting a protected route → redirect to `/sign-in`.
  - Authenticated users without the required role → redirect to their role-appropriate home (`/` for customers, `/admin` for admins).
- In the **admin layout** (`src/app/admin/layout.tsx`), add a server-side session + role check as a second layer of defense; render a 403 or redirect if the role doesn't match.
- Protect **API routes** (`src/app/api/*`): admin-only endpoints (drivers CRUD, product mutations, order-status updates) must verify the caller's session and role before executing. Return `401` for unauthenticated and `403` for unauthorized requests.
- Hide navigation links that the user's role cannot access (e.g., customers never see an "Admin" link; admins don't see the "Functions" tab unless they are super admins).
- Ensure the `/admin/functions` tab in the admin nav is only visible and accessible to super admins.

**Acceptance criteria**
- [ ] Unauthenticated users cannot access `/admin`, `/admin/functions`, or any auth-required customer page; they are redirected to `/sign-in`.
- [ ] Authenticated customers accessing `/admin` or `/admin/functions` via direct URL are redirected to `/`.
- [ ] Authenticated admins can access `/admin` but are redirected away from `/admin/functions`.
- [ ] Authenticated super admins can access both `/admin` and `/admin/functions`.
- [ ] Admin API routes return `401` when called without a valid session and `403` when called by a user without the required role.
- [ ] The admin layout "Functions" tab is only visible to super admins.
- [ ] Customers see no admin navigation links anywhere in the customer UI.
- [ ] Middleware correctly handles edge cases: expired sessions, missing profiles, unknown roles.
- [ ] All redirects preserve the current locale / language setting.

**Dependencies**
- Authentication & authorization (done).

---

### 2. Input validation & error handling
- Validate all form fields on the client side (required fields, correct types, length limits, numeric ranges)
- Show clear, user-friendly error messages for invalid input (e.g. empty name, non-numeric price, missing phone number)
- Validate on the server side / API routes as well — never trust client input
- Handle edge cases: submitting empty forms, special characters, extremely long strings, negative numbers, zero quantities
- Show feedback for async failures (network errors, Supabase errors) — not just silent failures
- Prevent duplicate submissions (disable submit button while a request is in flight)
- Cover all user-facing forms: checkout, sign-up, sign-in, add/edit product, add driver, order actions

---

### 3. Realtime new order notifications in admin dashboard
- The admin dashboard already subscribes to Supabase Realtime for order/delivery updates, but verify it reliably reflects **new** incoming orders without requiring a page refresh
- Confirm the Supabase Realtime channel is subscribing to `INSERT` events on the `orders` table, not just `UPDATE`
- Add a visible indicator (badge, sound, or toast) when a new order arrives so the admin doesn't miss it
- Test across multiple devices/tabs to confirm no missed events or stale state
- Ensure the subscription reconnects automatically after a network drop

---

### 4. AI chatbot — product availability & allergen awareness
- A basic chatbot using GPT-4o-mini already exists and receives live product data in its system prompt
- Enhance it to also reflect **real-time availability** (i.e., products marked `unavailable_today = true` should be excluded or flagged in responses)
- Ensure allergen and ingredient queries return accurate, up-to-date answers based on actual DB values (not stale injected data)
- Refresh the product data injected into the system prompt on each request rather than caching it
- Add bilingual support — chatbot should respond in the same language the user is writing in (Arabic or English)

---

### 5. Error visibility & monitoring on Vercel (free tier)
- Vercel free tier only retains logs for 1 hour — investigate options for longer-lived error reporting
- **Options to evaluate:**
  - **Sentry** (free tier) — captures exceptions with stack traces, user context, and breadcrumbs; integrates with Next.js in a few lines
  - **LogFlare / Axiom** — Vercel's log drain partners; Axiom has a free tier and a native Vercel integration for streaming all logs
  - **Vercel Analytics + Speed Insights** — already available on free tier for performance data, not errors
- Goal: when something breaks in production, know *what* failed, *where*, and ideally *which user/order* was affected
- At minimum, add structured `console.error` calls with context (order ID, route, user action) so whatever logging solution is chosen captures useful data

---

### 6. Image upload UI in admin panel
- Admin can currently only paste a URL for product images — add a proper file upload field
- Upload to Supabase Storage `products` bucket
- Enforce constraints: JPEG/PNG/WebP, max 2 MB, aspect ratio guidance (5:4)
- Replace existing URL text field with file picker + preview
- On edit product, show current image with option to replace

---

## Done

### Image storage & optimization
- Created Supabase Storage `products` bucket (public, 2 MB limit, JPEG/PNG/WebP)
- Uploaded 4 product images and linked `image_url` in DB
- Switched `ProductCard` from `<img>` to `next/image` with `fill` + `sizes` (Vercel CDN caches & optimizes)
- Added shimmer placeholder while image loads

### Non-blocking page rendering
- Removed full-page loading gate — hero, CTA, and section headings render instantly
- Inline skeleton placeholders for category pills, featured cards, and browse grid while data loads

### Full frontend redesign
- New theme, color palette, and typography
- New logo / brand identity
- Redesigned all pages: storefront, checkout, admin, delivery driver page, sign-in, sign-up

### Customer order history page
- `/account/orders` — shows active and past orders with order number, date, total, and status
- Accessible via account area

### Authentication & authorization
- Sign-up and sign-in flows using Supabase Auth (`@supabase/ssr`, cookie-based sessions)
- `AuthProvider` context exposes `user`, `profile`, `signIn`, `signUp`, `signOut`, `loading`
- Role-based redirect after sign-in (customers → `/`, admins → `/admin`)
- `profiles` table with auto-insert trigger on new sign-up (default role: `customer`)

### Seed real products from business owner into Supabase
- Collected product list from business owner (4 products, 3 categories, bilingual)
- Migration `20260330100000_seed_real_products.sql` replaces demo data with real products
- Pushed migration to remote Supabase

### Split admin into two pages
- **Dashboard** (`/admin`) — order management + product availability toggles
- **Functions** (`/admin/functions`) — super admin panel with:
  - Add / edit / remove products with bilingual support (English & Arabic)
  - Tabbed English / Arabic fields for `name`, `description`, `ingredients`
  - Migration: added `name_ar`, `description_ar`, `ingredients_ar`, `unavailable_today` columns
  - Manage drivers (moved from dashboard)
  - Toggle product availability (mark as unavailable for today)
- Shared admin layout with Dashboard / Functions tab navigation
- Storefront uses Arabic fields when locale is `ar`, filters out unavailable products
- Pushed migration to remote Supabase

### Drivers list in admin dashboard
- Add a drivers section to the current admin dashboard page
- Display all available drivers with name and phone number
- Store drivers in Supabase `drivers` table (id, name, phone, created_at)
- Add migration for the new table
- Add / remove drivers from the admin UI
- Push `drivers` migration to remote Supabase
