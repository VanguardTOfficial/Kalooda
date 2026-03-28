# SweetDrop — Fresh Sweets, Delivered Fast

A full-stack MVP for a sweets shop with real-time delivery tracking, built with **Next.js 15**, **Tailwind CSS**, **Supabase**, and **OpenAI**.

## Features

| Feature | Description |
|---|---|
| **Product Catalog** | Grid-based storefront with category filtering and search |
| **Cart System** | Client-side cart with add/remove/quantity controls (React Context) |
| **Checkout** | Creates orders with customer details |
| **AI Chatbot** | Floating chat powered by GPT-4o-mini; answers allergy & ingredient questions |
| **Delivery Flow** | Shareable link (`/delivery/accept/[orderId]`) for drivers to accept deliveries |
| **Admin Dashboard** | Real-time order table with status management and driver link sharing |
| **PWA** | Installable on mobile devices for drivers |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local with your keys (see below)

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront, and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | For live DB | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For live DB | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | For live DB | Supabase service role key (server-side only) |
| `OPENAI_API_KEY` | For AI chat | OpenAI API key (GPT-4o-mini) |

> **Note:** The app works fully with mock data when Supabase credentials are not configured. The chatbot has a built-in keyword fallback when no OpenAI key is set.

## Mock Mode vs Live Mode

- **Mock mode** (default): Uses in-memory data from `src/data/mock.ts`. The admin dashboard polls every 3 seconds for updates.
- **Live mode**: Connect Supabase for persistent storage and real-time updates via Postgres changes. Run `supabase/migrations/001_initial_schema.sql` to create tables and seed data.

## Database Schema

Run the migration at `supabase/migrations/001_initial_schema.sql` against your Supabase project:

- **categories** — Product categories (Chocolates, Gummies, etc.)
- **products** — Items with price, ingredients, and allergens array
- **orders** — Customer orders with status tracking (pending → assigned → out_for_delivery → delivered)
- **deliveries** — Driver acceptance records linked to orders

## Delivery Loop

1. Customer completes checkout → order status = `pending`
2. Admin copies the delivery link and sends it to drivers (via WhatsApp, SMS, etc.)
3. First driver to click "Accept" updates order status to `assigned`
4. Admin dashboard flashes green and updates in real-time (Supabase Realtime or polling)

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Storefront catalog
│   ├── checkout/page.tsx                 # Checkout flow
│   ├── admin/page.tsx                    # Admin dashboard
│   ├── delivery/accept/[orderId]/page.tsx # Driver acceptance page
│   └── api/
│       ├── chat/route.ts                 # AI chatbot endpoint
│       ├── orders/route.ts               # GET/POST orders
│       └── orders/[orderId]/status/route.ts # PATCH order status
├── components/                           # UI components
├── contexts/cart-context.tsx             # Cart state management
├── data/mock.ts                          # Mock seed data
├── lib/                                  # Supabase clients
└── types/database.ts                     # TypeScript interfaces
```

## Tech Stack

- **Next.js 15** (App Router) — Full-stack React framework
- **Tailwind CSS v4** — Utility-first styling
- **Supabase** — Postgres database + Realtime subscriptions
- **OpenAI GPT-4o-mini** — Allergy-aware product chatbot
- **Lucide React** — Icon library
- **PWA** — Service worker + manifest for installable mobile experience
