# Colombus Coffee Catalog

Luxury-forward, bilingual (English/Arabic) catalog experience for the Colombus coffee brand built with Next.js App Router, TailwindCSS, shadcn/ui, Prisma (PostgreSQL), and next-intl. Includes a full public site plus an admin dashboard with category/product/branch/career management and request inboxes.

## Features

- Locale-aware routes (`/en` / `/ar`) powered by next-intl with RTL support and Latin digits preserved for numerals.
- Catalog-only flows (no checkout) with hero animations, featured products, category views, product detail, branches with lazy embeds, and corporate pages (About, Contact, Careers).
- Public forms (Contact + Career applications) validated with Zod/react-hook-form and stored via Prisma.
- Admin dashboard with cookie-based sessions (bcrypt + HMAC), CRUD for categories, products (with uploads), branches, and career slots, plus request viewers.
- Homepage hero slider auto-scrolls curated imagery that you can upload/manage from the admin Hero Images section.
- File uploads saved outside the repo under `UPLOAD_DIR` with a guarded `/uploads/*` route for serving assets.
- Prisma schema + seeding for starter content (admin user, categories, products, branches, careers).

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env` and update:
     - `DATABASE_URL` – PostgreSQL connection string (e.g. `postgresql://user:pass@localhost:5432/colombus?schema=public`).
     - `SESSION_SECRET` – long random string used to sign admin cookies.
     - `UPLOAD_DIR` – absolute OS path *outside* the repo, e.g. `D:/hostinger/uploads`.
     - `ENABLE_CAPTCHA` – leave `false` for dev; when `true`, server routes expect a `captchaToken`.
     - `NEXT_PUBLIC_APP_URL` – origin used for sitemap generation.

3. **Prepare uploads directory**
   ```bash
   mkdir -p D:/hostinger/uploads
   ```
   Ensure the Node process has read/write permissions. Hostinger runners can point `UPLOAD_DIR` to a persistent mount so media and CVs survive deploys. Upload APIs only store relative paths (e.g. `products/2026/01/file.jpg`) so the `/uploads/[...path]` route can serve files safely.

4. **Database & Prisma**
   ```bash
   npx prisma migrate dev
   npm run prisma:seed
   ```
   Make sure your PostgreSQL server is running and the `colombus` database exists (e.g. `createdb -O my_user colombus` before migrating).
   Seeds will create:
   - Admin user `admin` / `admin123`
   - 2 categories, 6 products with translations/media, 2 branches, 2 career slots

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000/en` (or `/ar`). Admin lives under `/admin` and requires the seeded credentials.

## Upload Workflows

- **Products** – Admin dashboard > Products accepts JPG/PNG/WebP (<=5 MB each). Files are stored under `${UPLOAD_DIR}/products/YYYY/MM/` and referenced by relative paths. Product cards display images via `/uploads/...`.
- **Career CVs** – Public Career form accepts PDF/DOC/DOCX (<=10 MB) storing paths under `${UPLOAD_DIR}/jobs/YYYY/MM/`. Admin job applications table exposes download links through `/uploads/*`.
- **Branches** – Accepts either remote URLs or relative `/uploads` paths (upload via SSH/SFTP or reuse files dropped into `UPLOAD_DIR`).
- `/uploads/[...path]` streams assets through `resolveUploadPath`, blocking traversal while reading from `UPLOAD_DIR`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js in development |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint checks |
| `npm run prisma:migrate` | Apply dev migrations |
| `npm run prisma:seed` | Seed reference data |

## Additional Notes

- Suggested products show up to four active siblings from the same category; empty states are allowed.
- Captcha support is a placeholder – toggle `ENABLE_CAPTCHA=true` to require a `captchaToken` field before integrating your preferred provider.
- Sitemap is generated dynamically from categories/products via `app/sitemap.ts`.
- ESLint + Prettier ensure consistent formatting; Tailwind design tokens live under `tailwind.config.ts`.
