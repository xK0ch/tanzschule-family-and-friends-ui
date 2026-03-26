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
| `/news`           | Neuigkeiten         | Homepage with news                   |
| `/courses`        | Kurse               | Course overview                      |
| `/events`         | Veranstaltungen     | Events                               |
| `/vouchers`       | Gutscheine          | Vouchers / gift cards                |
| `/gallery`        | Galerie             | Photo gallery                        |
| `/about-us`       | Über uns            | About the dance school               |
| `/faq`            | FAQ                 | Frequently asked questions (from API)|
| `/contact`        | Kontakt             | Contact information                  |
| `/legal-notice`   | Impressum           | Legal notice                         |
| `/privacy-policy` | Datenschutz         | Privacy policy                       |

## Admin UI

The admin area is only accessible via URL — it is not linked from the public navigation.

| Route            | Description                              |
|------------------|------------------------------------------|
| `/admin/login`   | Admin login (username + password)        |
| `/admin/faq`     | FAQ management (CRUD + reorder)          |

Authentication uses JWT tokens from the backend (`POST /api/auth/login`).

## Project Structure

```
src/app/
├── core/
│   ├── guards/          # authGuard
│   ├── interceptors/    # authInterceptor (JWT Bearer)
│   ├── models/          # TypeScript interfaces (FaqResponse, LoginRequest, ...)
│   └── services/        # AuthService, FaqService
├── admin/
│   ├── admin-login/     # Login page
│   ├── admin-layout/    # Layout with sidebar
│   └── admin-faq/       # FAQ management (create, edit, delete, reorder)
├── pages/
│   ├── news/            # 10 public pages, each lazy-loaded
│   ├── courses/
│   ├── events/
│   ├── ...
│   └── privacy-policy/
├── app.ts               # Root component (toolbar, sidenav, footer)
├── app.routes.ts        # Route definitions
└── app.config.ts        # Providers (router, http, animations)
```

## Backend Connection

- **Development**: Angular dev server proxies `/api` requests to `localhost:8080` (`proxy.conf.json`)
- **Production**: nginx proxies `/api` requests to the `tanzschule-service` Docker container
