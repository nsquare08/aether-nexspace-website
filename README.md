# Aether Nexspace — Official Website

Official product website and Microsoft Store landing SPA for **Aether Nexspace**, developed and published by **NSquare**.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- GSAP & ScrollTrigger (scroll narrative and staggered entrance motion)
- Motion (`motion/react`) for UI micro-interactions and transitions
- Three.js obsidian orbital ambient canvas
- Lucide Icons & self-hosted `@fontsource` typography (`Space Grotesk`, `Inter`, `JetBrains Mono`)

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Microsoft Store Configuration

Store availability is controlled centrally in `src/config/store.ts`:

- `STORE_URL`: Official Microsoft Store listing URL (leave empty while undergoing certification)
- `STORE_STATUS`: `'coming_soon' | 'live'`
- `PRODUCT_VERSION`: Current desktop application release string

Once Microsoft Store certification finishes, set `STORE_URL` to the live Store product URL and update `STORE_STATUS` to `'live'`, then redeploy.

## License

Copyright © 2026 NSquare. All rights reserved.
