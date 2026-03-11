**Rada Route Ace — Quick Start & Project Overview**

- **Project:** Rada Route Ace (React + Vite) — frontend dashboard for riders/orders/maps.
- **Location:** [rada-route-ace](rada-route-ace)

**Project Summary**
- **Description:** A React + Vite dashboard using Tailwind + Radix UI. Features: authentication, orders management, rider tracking, maps (Google Maps), analytics cards, and Firebase integration.
- **Main entry:** [rada-route-ace/src/main.tsx](rada-route-ace/src/main.tsx#L1)
- **Key pages/components:**
  - **Pages:** `Dashboard`, `Orders`, `Riders`, `Reports`, `Settings`, `Login`, `Signup` ([rada-route-ace/src/pages](rada-route-ace/src/pages))
  - **Maps:** `CustomerMap`, `LiveMap` ([rada-route-ace/src/components](rada-route-ace/src/components))
  - **UI library:** shadcn + Radix components under [rada-route-ace/src/components/ui](rada-route-ace/src/components/ui)
  - **Firebase helper:** [rada-route-ace/src/lib/firebase.ts](rada-route-ace/src/lib/firebase.ts#L1)
- **Package manifest:** [rada-route-ace/package.json](rada-route-ace/package.json#L1-L60)
- **Bundler:** Vite (development server + build)

**High-level Flow**
- App bootstraps in `main.tsx` and mounts the router.
- `Sidebar` provides navigation to pages. Pages fetch/update data via Firebase and `@tanstack/react-query`.
- Orders and riders data are displayed in `OrdersTable`, `OrderList`, and Rider pages; maps show live locations via Google Maps.
- Auth is handled via Firebase; Firebase config is in `src/lib/firebase.ts` and environment variables (if used) in `.env.local`.

**Prerequisites (what you must install)**
- **Git:** to clone the repository.
- **Node.js (LTS):** Recommend Node 18 or 20 (Windows installer or nvm-windows). `npm` is included with Node.
- **Optional package managers:** `npm` (default) or `bun` (project contains `bun.lockb` — bun is optional). Use `npm` unless you prefer `bun`.
- **Editor (recommended):** Visual Studio Code with extensions: ESLint, TypeScript, Tailwind CSS IntelliSense.

**Clone and prepare repository**
Open PowerShell (or terminal) and run:

```powershell
# Clone the repo (replace remote URL)
git clone https://github.com/<your-org>/<repo>.git
cd <repo>/rada-route-ace
```

**Install dependencies**
- Using npm (recommended):

```powershell
npm install
```

- Or using bun (if installed):

```powershell
bun install
```

**Run development server**

```powershell
npm run dev
# or with bun
bun run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

**Build & preview**

```powershell
npm run build
npm run preview
```

**Environment & Firebase setup**
- There is a `.env.local` in the project root (may be empty). If the app expects Firebase config via environment variables, create or update `.env.local` with the required keys.
- Alternatively, check and update [rada-route-ace/src/lib/firebase.ts](rada-route-ace/src/lib/firebase.ts#L1) to include your Firebase `apiKey`, `authDomain`, `projectId`, etc.
- Without valid Firebase keys some features (auth, DB, maps-related live data) will fail or show placeholder content.

**Common issues & troubleshooting**
- If `npm run dev` fails: ensure Node version is compatible (use `node -v`).
- Delete `node_modules` + `package-lock.json` (or `bun.lockb`) and reinstall if corrupted:

```powershell
rm -r node_modules
rm package-lock.json
npm install
```

- If Firebase-related errors appear, double-check credentials/config in `src/lib/firebase.ts` and any `.env.local` variables.
- If a port conflict occurs, set Vite port via `VITE_PORT` or run `npm run dev -- --port 5174`.
