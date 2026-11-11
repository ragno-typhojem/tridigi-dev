# TriDigi — Economic Policy Simulator

CEIT 435 / Group 11. A single-player, browser-based educational game about monetary and fiscal policy.

## Stack
React, TypeScript, Vite, Firebase Authentication (anonymous), Cloud Firestore, Cloud Functions, Firebase Hosting, Vitest.

## Quick start
1. Install Node.js 22+ and run `npm install`.
2. Run `npm run dev` for an offline UI demo (no Firebase configuration needed).
3. Create a Firebase project. Register a web app; enable **Anonymous** sign-in in Authentication, create Firestore, and enable Cloud Functions (billing plan may be required).
4. Copy `.env.example` to `.env` and fill in Firebase web app configuration.
5. Replace `REPLACE_WITH_FIREBASE_PROJECT_ID` in `.firebaserc` with your Firebase project ID.
6. Run `npm install --prefix functions` and `npm run build` and `npm run build --prefix functions`.
7. Install CLI: `npm install -g firebase-tools`, run `firebase login`, then `firebase deploy`.

## Game loop
Choose a scenario → review indicators → set policy → simulate quarter → read debrief → repeat. Three 4-quarter levels: monetary, fiscal, crisis. The formulas and crisis data are **illustrative placeholders**, pending economics-team approval. The project milestones contain an inconsistent 8-turn completion criterion alongside 3×4-quarter scope; this starter implements 3×4 and should be confirmed by the team.

## Cloud data and security
- `users/{uid}/runs/{runId}` stores saved runs.
- Firestore rules allow only the signed-in owner to read their runs; writes happen through a callable Cloud Function.
- `verified:false` means records are **untrusted client-supplied outcomes**, not authoritative economic scores. For graded scores, move turn simulation and validation to the server.
- No service account keys belong in Git. `.env` is ignored; Firebase web configuration is public, while authorization is enforced by Auth, rules and Functions.
- Without Firebase credentials, game runs in demo mode, and cloud saves are disabled.

## Structure
- `src/lib/engine.ts` — pure economic simulation contract
- `src/data/scenarios.json` — scenario metadata
- `src/main.tsx` — basic playable UI and turn manager
- `functions/src/index.ts` — authenticated save endpoint
- `firestore.rules` — per-user read access
- `.github/workflows/ci.yml` — tests and build

## Collaboration
Use `main` for reviewed changes and branches like `feature/dashboard`, `feature/economic-engine`, `feature/scenarios`. Open pull requests; assign reviewers. Keep economic coefficients reviewed by the economic researcher. This is an initial scaffold, not a completed course deliverable.
