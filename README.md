# template-platform

Next.js frontend paired with [**template-services**](https://github.com/JoseAngelChepo/template-services). Public landing, auth, and protected dashboard.

**First time here?** Full local setup (clone both repos, MongoDB on macOS, env vars): [**template-local-setup**](https://github.com/JoseAngelChepo/template-local-setup) Claude Agent Skill.

**Claude Code** — in your agent’s chat, send:

```text
set up https://raw.githubusercontent.com/JoseAngelChepo/template-local-setup/main/SKILL.md
```

**This repo is a reusable starter template** — meant to be forked and extended by humans and **AI coding agents**. Placeholder branding (`YourApp`, `App`) and localhost defaults are intentional; replace them before production.

## Routes

| Path | Access |
|------|--------|
| `/` | Public landing |
| `/sign-in`, `/sign-up` | Auth |
| `/dashboard` | Authenticated (post-login home) |
| `/auth/google/callback` | OAuth callback (public) |

Locale prefixes `/en` and `/es` are stripped by `src/proxy.ts`; locale is stored in the `NEXT_LOCALE` cookie.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Requires **template-services** running on `http://localhost:3001`. See the [local setup skill](https://github.com/JoseAngelChepo/template-local-setup) for the full walkthrough.

## Environment

| Variable | Default (dev) |
|----------|----------------|
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api/v1` |
| `NEXT_PUBLIC_API_BASIC_AUTH` | *(unset — set `username:password` if your API requires HTTP Basic on unauthenticated requests)* |

See [`.env.example`](./.env.example). Never commit `.env` or `.env.local`.

## Docs

| Topic | File |
|-------|------|
| Local setup (clone, MongoDB, env) | [template-local-setup](https://github.com/JoseAngelChepo/template-local-setup) |
| Backend (sibling repo) | [template-services](https://github.com/JoseAngelChepo/template-services) |
| Components & styling | [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) |
| Landing sections | [`docs/LANDING.md`](./docs/LANDING.md) |
| Fonts | [`docs/FONTS.md`](./docs/FONTS.md) |

## Scripts

```bash
npm run dev          # development server
npm run dev:clean    # clear .next cache, then dev
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

---

## For AI agents

Read this section first when working in this repo (Cursor, Copilot, Claude, etc.). **Canonical rules** for Cursor live under [`.cursor/rules/`](./.cursor/rules/) and are applied automatically when present:

| Rule file | Purpose |
|-----------|---------|
| [`template-requirements.mdc`](./.cursor/rules/template-requirements.mdc) | Fork checklist, landing/i18n/favicon, component layout, agent behavior |
| [`template-context.mdc`](./.cursor/rules/template-context.mdc) | Monorepo layout, routes, env, API client, styling |

### What this template is

- A **starter**, not a finished product. Do not treat placeholders as production values.
- **Frontend only** — HTTP contracts, DTOs, validation, and status codes live in sibling repo **`template-services`**. Read that repo before inventing API shapes.
- **Scope to keep:** landing, auth UI, session cookies, dashboard shell, i18n helpers. Do **not** reintroduce old product domains (arena, challenges, admin panels, etc.) unless the user explicitly asks.

### Repository layout (where to change things)

```
src/
  app/                    # Routes only — thin pages; avoid marketing copy here
  components/
    ui/                   # Generic primitives (Button, Loader)
    auth/                 # AuthGuard, SignIn/SignUp, GoogleAuthButton
    layout/               # HomeShell (authenticated placeholder)
    landing/              # Marketing sections + LandingPage composer
  content/landing.ts      # All landing copy (primary marketing strings)
  config/env.ts           # NEXT_PUBLIC_* URLs and optional Basic auth
  data/
    api/server/           # Axios client, auth cookies, createServices (auth only)
    providers/            # ServicesProvider — session + auth methods
  messages/en.json, es.json
  proxy.ts                # Locale prefix redirect + NEXT_LOCALE cookie
  i18n/client.ts
docs/                     # COMPONENTS, LANDING, FONTS
```

### Agent workflow (typical tasks)

1. **Rebrand / copy** — `src/content/landing.ts`, `src/messages/*.json`, `src/app/layout.tsx` metadata, `package.json` `name`, `--app-*` in `src/app/globals.css`.
2. **New marketing section** — add section under `src/components/landing/sections/`, wire in `LandingPage.tsx`, strings in `landing.ts` (not hardcoded in the section).
3. **New authenticated feature** — new folder `src/components/<feature>/` (3+ related files), new route under `src/app/`, extend `AuthGuard` public routes only if the page must be public.
4. **New API calls** — extend `src/data/api/server/index.ts` + `ServicesProvider`; confirm endpoints in **template-services** first.
5. **Third-party UI** (animations, 21st.dev, etc.) — isolated wrapper in `ui/` or `<feature>/`; never paste large snippets into `layout.tsx`, `providers.tsx`, or `globals.css`.

### Hard rules

- **Minimize diff scope** — match existing patterns (`@/` imports, `ServicesProvider`, `AuthGuard`, `createServices`).
- **Landing:** do not scatter copy across random components; do not grow `src/app/page.tsx` beyond importing `LandingPage`. See [`docs/LANDING.md`](./docs/LANDING.md).
- **Do not commit:** `.env`, `.env.local`, `node_modules/`, `.next/`, `*.tsbuildinfo`, user-specific paths from build caches.
- **Security:** no hardcoded secrets; use `.env.example` for documented vars only. Authorization for protected data must not rely only on client `AuthGuard` or `proxy.ts` — enforce on the API.
- **Dependencies:** prefer few, justified deps; isolate UI-effect libraries in wrappers. Keep `next` and `eslint-config-next` on patched minors (see [Vercel security releases](https://github.com/vercel/next.js/security/advisories)).

### Before launch (remind the user)

| Area | What to change |
|------|----------------|
| Brand & SEO | `src/app/layout.tsx`, `package.json` `name` |
| Favicon | `src/app/favicon.ico` (and optional `icon.png` / `apple-icon.png`) — see `template-requirements.mdc` |
| Copy & i18n | `landing.ts`, `src/messages/*.json` (keep `en` / `es` keys in sync) |
| Theme & fonts | `globals.css` (`--app-*`), `src/config/fonts.ts` |
| Env & API | `NEXT_PUBLIC_*` in deployment + **template-services** |
| Footer / legal | Replace placeholder `#` links in landing footer |

### Public routes (AuthGuard)

These paths are allowed without a session: `/`, `/sign-up`, `/sign-in`, `/auth/google/callback`. Any new public route must be added to `publicRoutes` in `src/components/auth/AuthGuard.tsx`.

### When unsure

1. Check **template-services** for API behavior.
2. Read **`template-requirements.mdc`** for fork and styling rules.
3. Read **`docs/COMPONENTS.md`** before adding or moving components.
