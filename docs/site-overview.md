# Kalooda — Site Functionality and Structure

This document describes how the application works and how the repository is organized. The live app is branded **Kalooda**; some README text may still reference **SweetDrop**.

## What the site is

A full-stack sweets / cheesecake storefront with:

- A **public shop** (catalog, cart, checkout).
- **Customer accounts** (Supabase Auth, profiles, order history, server-backed cart when signed in).
- An **admin area** (orders, drivers, catalog management for super admins).
- A **driver-facing acceptance flow** via a tokenized link.
- An **AI chat** endpoint (OpenAI with a fallback).
- **English / Arabic** UI with RTL support and a locale cookie.
- **PWA** registration and a web app manifest for installability.

**Stack:** Next.js 16 (App Router under `src/app`), React 19, Tailwind CSS 4, Supabase (DB + auth + realtime), OpenAI for chat.

---

## High-level architecture

| Layer | Role |
|--------|------|
| `src/app/**` | Routes: pages, layouts, Route Handlers (`api/*`). |
| `src/components/**` | Reusable UI (header, cart, chatbot, admin catalog fields, etc.). |
| `src/contexts/**` | Global client state: cart, language, customer auth, admin auth. |
| `src/lib/**` | Supabase clients (server, customer browser, admin browser), auth helpers, product mapping, locale. |
| `src/types/**` | Shared TypeScript types (e.g. `database.ts`, `profile.ts`). |
| `supabase/migrations/` | Schema when using live Supabase (see README for table list). |

The root layout wraps the app in providers and reads a **locale cookie** so `lang` and `dir` (LTR/RTL) are correct on first paint. See `src/app/layout.tsx` (`LanguageProvider`, `AuthProvider`, `AdminAuthProvider`, `CartProvider`, `PWARegister`).

---

## Routes and user-facing functionality

### Storefront (`/`)

- Loads **categories** and **products** from `/api/categories` and `/api/products`.
- **Category chips** and **search** filter the grid; bilingual fields (`name_ar`, `description_ar`) participate in search.
- **Featured** block when not searching/filtering.
- **Header** opens the cart drawer; **footer** and **chatbot** are on the page.
- Uses `useAuth` for signed-in state (e.g. account links) and `useLanguage` for copy.

### Cart and checkout

- **`CartProvider`** holds line items and totals; it can sync with **`/api/cart`** for logged-in users (guest behavior uses local storage / `src/lib/guest-cart-constants.ts`).
- **`/checkout`**: submits **`POST /api/orders`** with customer name/phone (from profile or form), line items, and total. Orders require a **session**; incomplete profile returns **`PROFILE_INCOMPLETE`**. Success clears the remote cart and shows order confirmation.

### Customer auth and account

- **`/sign-in`**, **`/sign-up`**: email/password and OAuth (see `src/contexts/auth-context.tsx`).
- **`/api/auth/customer-session`**: server view of the customer session for the client bootstrap.
- **`/auth/callback`**, **`/auth/callback/customer`**, **`/auth/callback/admin`**: OAuth / magic-link returns split by audience.
- **`/auth/sign-out`**: sign-out route.
- **`/auth-error`**: error surface for auth failures.
- **`/account`**, **`/account/orders`**: profile and order history (backed by APIs such as **`/api/orders/mine`**).

### Admin (`/admin`)

- **`src/app/admin/layout.tsx`**: full chrome except on **`/admin/sign-in`** (standalone sign-in). Nav includes **Dashboard** and, for **`super_admin`**, **Functions** (catalog / operational tools).
- **`/admin`**: dashboard loads orders (**`GET /api/orders`** — role-protected), products, drivers; subscribes to **Supabase Realtime** on `orders` for live updates and visual “flash” on changes.
- **`/admin/functions`**: **super-admin** surface for managing products, categories, drivers, orders (CRUD-style UI calling the various APIs).

### Delivery driver flow (`/delivery/accept/[orderId]`)

- Public page that reads **`?token=...`**.
- **`GET /api/orders/[orderId]?token=...`**: loads order details if the token is valid.
- Driver enters name and accepts → **`PATCH /api/orders/[orderId]/status?token=...`** with body such as `{ status: "preparing" }` (enforcement lives in the API).

---

## API surface (Route Handlers)

| Path | Purpose |
|------|--------|
| `/api/categories`, `/api/products` | Catalog for storefront (and admin reads). |
| `/api/products/[id]/availability` | Same-day availability updates. |
| `/api/cart` | Authenticated **`cart_items`** sync. |
| `/api/orders` | **GET**: admins; **POST**: authenticated customers create orders. |
| `/api/orders/mine` | Customer’s orders. |
| `/api/orders/[orderId]` | Order detail (admin or tokenized driver access). |
| `/api/orders/[orderId]/status` | Status updates (admin and/or token rules). |
| `/api/drivers` | Driver list / management for admin. |
| `/api/chat` | Chatbot backend (OpenAI + fallback). |
| `/api/uploads/catalog` | Catalog image uploads (admin). |
| `/api/auth/customer-session` | Session info for the storefront client. |

Authorization is centralized in `src/lib/require-role.ts` (`requireSession`, `requireRole`), using the service role on the server where appropriate.

---

## Data: mock vs live

- With **Supabase** env vars configured, the app uses **Postgres** for products, orders, profiles, cart rows, drivers, etc.
- Without them, the app can run in **mock mode** using in-memory data (`src/data/mock.ts`) and polling-style admin behavior (see README).

---

## Cross-cutting concerns

- **i18n:** `LanguageProvider` + `src/lib/translations.ts`; `LanguageSwitcher` updates preference (cookie + UI).
- **Typography / branding:** Display fonts, Arabic font (Noto Sans Arabic), dark green / gold palette on the marketing shell; admin uses distinct “admin canvas” styling.
- **PWA:** `public/manifest.json`, `PWARegister`, and root `metadata` / `viewport` in `layout.tsx`.

---

## Project file map (App Router)

```
src/app/
├── page.tsx                    # Storefront catalog
├── layout.tsx                  # Root layout, providers, fonts, locale
├── checkout/page.tsx
├── sign-in/page.tsx
├── sign-up/page.tsx
├── account/page.tsx
├── account/orders/page.tsx
├── auth-error/page.tsx
├── auth/
│   ├── callback/route.ts
│   ├── callback/customer/route.ts
│   ├── callback/admin/route.ts
│   └── sign-out/route.ts
├── admin/
│   ├── layout.tsx
│   ├── page.tsx                # Order dashboard
│   ├── sign-in/page.tsx
│   └── functions/page.tsx      # Super-admin catalog & ops
├── delivery/accept/[orderId]/page.tsx
└── api/
    ├── categories/route.ts
    ├── products/route.ts
    ├── products/[id]/availability/route.ts
    ├── cart/route.ts
    ├── chat/route.ts
    ├── drivers/route.ts
    ├── uploads/catalog/route.ts
    ├── auth/customer-session/route.ts
    └── orders/
        ├── route.ts
        ├── mine/route.ts
        ├── [orderId]/route.ts
        └── [orderId]/status/route.ts
```

---

## Environment variables

See **README.md** for `NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_SERVICE_ROLE_KEY`, and `OPENAI_API_KEY`. The chatbot can use a keyword fallback when OpenAI is not configured.
