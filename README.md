# Monocomb

Studio site for Monocomb: web design, development and automation.

The idea: a bad hair day for your website. Visitors land on a tangle they comb clean with the pointer, browse "strands" (live, playable website elements), collect the ones they like into their comb, and send that collection as the start of a brief.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.tsx` puts the sections in order.
- `components/Hero.tsx` is the comb canvas.
- `components/Strands.tsx` holds the strand demos and the "Your comb" brief tray. Add a strand by writing a small demo component and adding it to `STRANDS`.
- `components/Receipts.tsx` has placeholder client results.
- `app/globals.css` holds the palette and type tokens.
