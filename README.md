# DS Prints — Transaction Calculator (TransCalc)

Next.js 14 (App Router) + TypeScript + Tailwind CSS rebuild of the original
vanilla HTML/CSS/JS TransCalc POS app.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Push to GitHub and import into Vercel, or run:

```bash
npm run build
npm start
```

## Notes

- All data (services, group colors, orders) persists to `localStorage`,
  same as the original — no backend required.
- Native `window.confirm()` / `alert()` dialogs were replaced with custom
  in-app modals/toasts (`ConfirmDialog`, `SuccessToast`, `AlertToast`),
  since browsers block/deprecate those calls inside cross-origin iframes
  (e.g. when embedded in the DS Prints App Tools hub).
- The Copy Summary button tries the Clipboard API first and falls back to
  a manual `execCommand('copy')` if clipboard access is blocked.
- Color palette lives in `tailwind.config.ts` under `ink`, `press`,
  `paper`, `success`, `danger` — change hex values there to re-theme.
