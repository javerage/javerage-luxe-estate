# Luxe Estate - Project Overview

Luxe Estate is a modern web application built with **Next.js 16** and **React 19**. While currently in its initial boilerplate state, the project is structured to leverage the latest web technologies for a high-performance, responsive real estate platform.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linting:** [ESLint](https://eslint.org/)
- Siempre utiliza context7 para poder validar el uso actual del código que se este sugiriendo

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18.17 or later recommended).

### Installation

```bash
npm install
```

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 📂 Project Structure

- `app/`: Contains the application's routes, layouts, and components (Next.js App Router).
  - `layout.tsx`: The root layout shared across all pages.
  - `page.tsx`: The main entry point (Home page).
  - `globals.css`: Global CSS styles including Tailwind imports.
- `public/`: Static assets such as images and icons.
- `next.config.ts`: Configuration for Next.js.
- `tsconfig.json`: TypeScript configuration.
- `tailwind.config.mjs` / `postcss.config.mjs`: Tailwind CSS and PostCSS configuration.

## 💅 Development Conventions

- **Component Pattern:** Use functional components with React Server Components (RSC) by default. Use `"use client"` only when necessary for interactivity or browser APIs.
- **Styling:** Utilize utility-first CSS with Tailwind CSS 4.
- **Typography:** The project uses `Geist` and `Geist Mono` fonts, optimized via `next/font`.
- **Linting:** Follow the standard Next.js ESLint configuration. Run `npm run lint` to check for issues.
- **Naming:** Use PascalCase for components and camelCase for functions and variables.

## 📝 TODO

- [ ] Define core real estate entities (Properties, Agents, Users).
- [ ] Implement property search and filtering.
- [ ] Design and build responsive UI components (Navbar, Footer, Property Cards).
- [ ] Integrate a database/backend for property listings.
