# Tanzschule Family & Friends – Frontend

Web frontend for the Tanzschule Family & Friends dance school website.

## Tech Stack

- **Angular 21** (Standalone Components, Signals, Lazy Loading)
- **Angular Material (M3)** with custom orange/cyan theme
- **Vitest** for unit testing
- **SCSS** with CSS custom properties
- **nginx** for production serving

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Starts the dev server on `http://localhost:4200` with API proxy to `http://localhost:8080`.

### Build

```bash
npm run build
```

Output in `dist/tanzschule-family-and-friends-ui/`.

### Tests

```bash
npm test           # single run
npm run test:watch # watch mode
```

### Docker

```bash
docker compose -f docker-compose-tanzschule-family-and-friends-ui.yml up --build -d
```

## Pages

| Route             | Page                | Description                          |
|--------------------|---------------------|--------------------------------------|
| `/news`           | Neuigkeiten         | News slideshow (from API)            |
| `/courses`        | Kurse               | Course overview                      |
| `/events`         | Veranstaltungen     | Events                               |
| `/vouchers`       | Gutscheine          | Vouchers / gift cards                |
| `/gallery`        | Galerie             | Photo gallery with events (from API) |
| `/about-us`       | Über uns            | About the dance school & team        |
| `/faq`            | FAQ                 | Frequently asked questions (from API)|
| `/contact`        | Kontakt             | Contact info & contact form (via API)|
| `/legal-notice`   | Impressum           | Legal notice                         |
| `/privacy-policy` | Datenschutz         | Privacy policy                       |

## Admin UI

The admin area is only accessible via URL — it is not linked from the public navigation.

| Route              | Description                                          |
|--------------------|------------------------------------------------------|
| `/admin/login`     | Admin login (username + password)                    |
| `/admin/faq`       | FAQ management (CRUD + reorder)                      |
| `/admin/gallery`   | Gallery management (events CRUD, image upload/delete/reorder) |
| `/admin/news`      | News management (CRUD, image upload, reorder)                 |

Authentication uses JWT tokens from the backend (`POST /api/auth/login`).

## Project Structure

```
src/app/
├── core/
│   ├── guards/          # authGuard
│   ├── interceptors/    # authInterceptor (JWT Bearer)
│   ├── models/          # TypeScript interfaces (FaqResponse, GalleryEventResponse, ContactRequest, ...)
│   └── services/        # AuthService, FaqService, GalleryEventService, NewsService, ContactService
├── admin/
│   ├── admin-login/     # Login page
│   ├── admin-layout/    # Layout with sidebar
│   ├── admin-faq/       # FAQ management (create, edit, delete, reorder)
│   ├── admin-gallery/   # Gallery management (events CRUD, image upload/delete/reorder)
│   └── admin-news/      # News management (CRUD, image upload, reorder)
├── pages/
│   ├── news/            # News slideshow page
│   ├── gallery/         # Public gallery with events and lightbox
│   ├── about-us/        # Team page with member cards
│   ├── contact/         # Contact info + contact form (sends email via API)
│   ├── faq/             # Public FAQ with accordion
│   ├── ...
│   └── privacy-policy/
├── app.ts               # Root component (toolbar, sidenav, footer)
├── app.routes.ts        # Route definitions
└── app.config.ts        # Providers (router, http, animations)
```

## Backend Connection

- **Development**: Angular dev server proxies `/api` requests to `localhost:8080` (`proxy.conf.json`)
- **Production**: nginx proxies `/api` requests to the `tanzschule-service` Docker container
