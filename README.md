# Mandi Bhav Jankari (Next.js)

Unified Next.js 15 application that combines the original React frontend and the
Node.js / Express backend of `Mandi_bhav_28-11-24` into a single project.

## What was migrated

- React Router pages -> Next.js **App Router** pages under `app/`
- React components -> Reused as **Client Components** under `components/`
- Express routes (`/admin/*`, `/login`) -> Next.js **API routes** under `app/api/`
  (still reachable on the original paths thanks to `next.config.mjs` rewrites)
- Sequelize + SQLite models, services, repositories, utils -> moved to `lib/`
- `react-helmet` SEO -> Next.js **Metadata API** (per `page.js`)
- `react-router-dom` navigation -> `next/link` + `next/navigation`
- Static images / favicon / sitemap -> `public/`
- Daily APMC fetch cron (6 AM IST) -> initialised via `instrumentation.js`

## Getting started

```bash
npm install
npm run dev
```

The app runs on http://localhost:3000.

API endpoints stay backward-compatible:

- `POST /admin/login`, `POST /login`
- `GET  /admin/getAllApmc`
- `GET  /admin/getAllApmcPrice`
- `GET  /admin/getApmcPriceByName?name=...`
- `GET  /admin/getApmcDailyData` (manually triggers the APMC fetch)
- ... and the rest of the original admin routes.

## Environment

See `.env.local` for the full list. Important keys:

| key | purpose |
| --- | --- |
| `JWT_SECRET_KEY` | Secret used to sign / verify admin JWTs |
| `APMC_API_BASE` | External APMC base URL |
| `DISABLE_CRON` | Set to `1` to skip the daily APMC cron in dev |

## Folder layout

```
mandi/
  app/                  # routes (frontend pages + /api/* backend)
    api/                # Next.js Route Handlers (Express replacement)
    (pages...)/page.js  # frontend pages
    layout.js           # global header/footer/toast
  components/           # React components (client-side)
  lib/                  # backend logic (db, models, services, ...)
  public/               # images, favicon, manifest, sitemap, robots, faq
  styles/               # global CSS (App.css)
  instrumentation.js    # boot hook (initialises DB + cron)
  next.config.mjs
```
