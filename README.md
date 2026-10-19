# MyPortfolio

Portfolio personale di Fabio Antonio Saccone (Software Tester & QA Automation Engineer), con grafica ispirata al terminale e testi in italiano e inglese.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router · Vercel (hosting e analytics)

## Comandi

```bash
npm install
npm run dev      # server di sviluppo
npm run lint     # ESLint
npm run build    # type-check + build di produzione in dist/
npm run preview  # anteprima della build
```

## Struttura

- `src/App.tsx`: routing e stato della lingua. Route `/` (home) e `/cv/:lang` (CV stampabile).
- `src/components/`: componenti UI (Hero, TestRepository, Curriculum, ...).
- `src/data/config.ts`: dati personali, social e tech stack.
- `src/data/translations.ts`: testi in italiano e inglese e contenuto del CV.
- `src/data/experiences.ts`: esperienze lavorative mostrate come "test case".
- `vercel.json`: rewrite verso `index.html` per le route dell'SPA.
