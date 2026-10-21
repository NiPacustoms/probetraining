# DJK Spvgg Herten – Jugendteams & Kontakte

Trainer- und Kontaktübersicht aller Jugendmannschaften (Saison 26/27) an der Kampfbahn Katzenbusch.
Eltern finden ihren Jahrgang und kontaktieren den Trainer direkt per Anruf.

**Stack:** React 19 · Vite 8 · Tailwind 4 · Motion – reine statische Seite, kein Server nötig.

## Lokal

```bash
npm install
npm run dev        # http://localhost:3000
```

## Veröffentlichen

```bash
npm run build      # Ergebnis liegt in dist/
```

`dist/` auf jeden statischen Host legen (Vercel, Netlify, Cloudflare Pages, GitHub Pages, normaler Webspace).

## Pflege

- `src/data/youthTeams.ts` – **alle Teams, Jahrgänge, Trainingszeiten, Trainer & Telefonnummern**
- `src/components/DigitalContactDirectory.tsx` – Suche, Filter, Karten-/Tabellenansicht
- `src/components/TeamCard.tsx` – einzelne Teamkarte

Nicht eingebundene Alt-Komponenten aus AI Studio (`Hero`, `TeamOverview`, `LocationKatzenbusch`, `FaqSection`, `Navbar`, `Footer`, `ClubFeatures`) liegen noch in `src/components/`.
