# Luxe Estate - Project Overview

Luxe Estate is a high-performance, responsive real estate platform built with **Next.js 16** and **React 19**, leveraging modern architectural patterns and a premium design aesthetic.

siempre debes utilizar skill-router para validar cuales son las mejores skill para ayudarnos en la tarea que se solicite.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Backend-as-a-Service:** [Supabase](https://supabase.com/) (Auth, Database, Storage)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (Multi-language support)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Maps:** [React Leaflet](https://react-leaflet.js.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linting:** [ESLint](https://eslint.org/)

## 🎨 Design System

- **Colors:**
  - `nordic`: #19322F (Deep Forest Green, used for text and primary elements)
  - `mosque`: #006655 (Vibrant Emerald, used for accents and primary buttons)
  - `clear-day`: #EEF6F6 (Very Light Teal, used for backgrounds)
  - `hint-green`: #D9ECC8 (Soft Pistachio, used for highlights)
- **Typography:**
  - `Geist` and `Geist Mono` for modern UI elements.
  - `Newsreader` (serif) for premium display and body text (optional but established in design mocks).
- **Iconography:**
  - Google Material Icons / Material Symbols Outlined.

## 💅 Development Conventions

- **Component Pattern:** Functional components with React Server Components (RSC) by default. Use `"use client"` only for interactivity, state, or browser-side libraries (like Leaflet).
- **Next.js 16 Conventions:** Use `proxy.ts` instead of `middleware.ts` for network-level logic (e.g., auth session updates).
- **Supabase Patterns:**
  - Use `createClient` from `@/utils/supabase/` (server, client, or proxy variants).
  - Centralized type definitions in `lib/types.ts`.
- **Styling:** Utility-first CSS with Tailwind 4. Standardize shadows for a "premium" lifted feel.
- **Internalization:** Use `useTranslations` from `next-intl` for all user-facing text. Messages are stored in `messages/*.json`.
- **Validation:** Always use the `context7` MCP server to validate code usage and library-specific best practices.

## 📂 Key Project Structure

- `app/`: Next.js App Router (Routes, Layouts).
  - `admin/`: Administrative dashboard for properties and users.
  - `property/`: Public property detail pages with dynamic slugs.
- `components/`: Reusable UI components (Navbar, PropertyCard, PropertyForm, FilterModal, etc.).
- `lib/`: Domain-specific logic, constants, and shared types (`types.ts`).
- `messages/`: Translation files (en.json, es.json, fr.json).
- `supabase/`: Local Supabase migrations and configuration.
- `utils/`: Utility functions and Supabase client factory logic.
- `proxy.ts`: Next.js 16 proxy implementation (auth sync).

## 📝 Current Progress & Roadmap

- [x] Configure Supabase Database & Auth (Google Login).
- [x] Implement Home Screen with Property Listing.
- [x] Implement Multi-language Support (EN, ES, FR).
- [x] Build Admin Properties Dashboard.
- [x] Build Add/Edit Property Form with image upload and map preview.
- [ ] Implement Advanced Search & Filters across all views.
- [ ] Implement Admin User Management Directory.
- [ ] Implement Property detail screen.
- [ ] Integrate Real-time Notifications for property inquiries.
