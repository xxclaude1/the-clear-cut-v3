# The Clear Cut V3 — Project Guide

## Overview
Premium moissanite jewelry e-commerce store on Shopify. Australian market. Design is a pixel-perfect adaptation of Mejuri's current (2026) website — ultra-clean, editorial, luxury minimalism. White space, sophisticated serif/sans-serif typography, image-driven layouts. One product to start (tennis bracelet), expanding over time.

**V3 is a complete fresh build. No code, design, or copy from V2.**

## Store Details
- **Store URL:** the-clear-cut-2.myshopify.com
- **Brand Name:** The Clear Cut
- **Currency:** AUD
- **Country:** Australia
- **GitHub Repo:** xxclaude1/the-clear-cut-v3

## Shopify API Access
```
Store: the-clear-cut-2.myshopify.com
Client ID: fcad569de4ca7d86a7fbe87ed7dcfd82
Secret: (stored locally — do not commit to git)
Token endpoint: POST /admin/oauth/access_token with grant_type=client_credentials
Token expires: 24 hours
API version: 2024-10
Theme ID: 152507187388 (Horizon — current published theme)
```

## Design Direction (Mejuri 2026 Adaptation)

### Aesthetic
- **Ultra-clean luxury minimalism** — Mejuri's current live site aesthetic
- Generous white space, editorial photography, sophisticated type pairings
- Serif headings (display weight) paired with clean sans-serif body text
- Black and white with warm neutral tones from photography only
- Large full-bleed imagery, split hero compositions
- Product cards on warm gray backgrounds with "ADD +" quick-add
- Announcement bar cycling messages with arrow navigation
- No loading screens, no heavy animations — fast, editorial, snappy

### Color Scheme
- **Background:** `#FFFFFF` (pure white)
- **Card/image backgrounds:** `#F5F5F0` (warm off-white, barely perceptible)
- **Primary text:** `#1A1A1A` (near-black)
- **Secondary text:** `#6B6B6B` (warm gray)
- **Muted text:** `#999999` (placeholders, disabled)
- **Borders/dividers:** `#E8E8E5` (warm light gray)
- **Buttons:** `#1A1A1A` bg, `#FFFFFF` text
- **Announcement bar:** `#1A1A1A` bg, white text
- **Footer bottom bar:** `#1A1A1A` bg, white text
- **No pink. No colored accents. No gradients.** Color comes exclusively from product photography.

### Typography
Mejuri uses a refined two-font pairing: a display serif for editorial impact and a clean grotesque sans-serif for everything else.

- **Display/Headings:** `"Freight Big Pro", "Georgia", serif` — used for large editorial headings, hero text, section titles. Light/Book weight for elegance.
- **UI/Body/Nav/Product names:** `"Neue Haas Grotesk Display Pro", "Helvetica Neue", "Arial", sans-serif` — used for navigation, buttons, product names, prices, body text, captions. Weights 400/500/700.
- **Monospace (editorial accents):** `"Courier New", monospace` — used sparingly for announcement bar text and small editorial details.

**Key typography rules:**
- Headings are uppercase with wide letter-spacing
- Product names are uppercase, tight, bold sans-serif
- Body text is clean sans-serif, generous line-height
- Buttons are uppercase sans-serif with letter-spacing
- Announcement bar uses monospace for editorial texture

### Layout Principles
- Header: Logo left (wordmark), nav center, search/account/cart right
- Navigation: ALL JEWELRY · GIFTS · NEW IN · BEST SELLERS · COLLECTIONS · MATERIALS
- Full-bleed hero sections with 2-column split layouts
- 4-column product grids with 1-2px gaps
- Horizontal-scroll product carousels with arrow navigation
- Category image strips for sub-navigation
- Split editorial sections (image + text side by side)
- "Stores & Services" lifestyle sections with 3-column image grid
- Membership/newsletter CTA banner
- 4-column footer with comprehensive link structure
- Black bottom bar with legal, social, and locale info
- Mobile: hamburger menu, 2-column grids, stacked sections

## Current Product: Tennis Bracelet
- **Price:** $499.00 AUD
- **Finish:** 18ct White Gold / Yellow Gold / Rose Gold Plated
- **Lengths:** 15.5 / 16.5 / 18.0 (Standard) / 19.0 / 20.5 / 21.5 cm

## Value Propositions
- Free Express Shipping Australia-Wide
- 30-Day Returns
- Lifetime Warranty
- Certificate of Authenticity
- Ethically Sourced & Conflict-Free

## Build Approach
- Shopify store with custom Dawn-based theme
- Build in phases, review each before moving to next
- Push changes to GitHub → auto-syncs to Shopify
- See PRD.md for full specifications and build phases

## Copy Style Guide
- **Tone:** Sophisticated, confident, gender-neutral. Modern luxury. Not precious or overly feminine.
- **Headings:** Short, punchy, editorial. Uppercase serif for hero/editorial, uppercase sans for sections.
- **Body:** Clean, informative, concise. No exclamation marks. Periods over commas.
- **CTAs:** Action-oriented, underlined link style (e.g., "SHOP PUZZLE RINGS", "STACKING GUIDE")
- Position moissanite as: fine jewelry that happens to be ethical and lab-created
- Never use "fake diamond" or "diamond alternative" — position as its own category

## Technical Notes
- **Platform:** Shopify with custom Liquid theme (Dawn fork)
- **CSS:** Vanilla CSS with design tokens as custom properties. No Tailwind, no preprocessors.
- **JS:** Vanilla JS. No frameworks. IntersectionObserver for scroll reveals.
- **Fonts:** Self-hosted or Google Fonts equivalent (DM Serif Display + Inter as open-source alternatives to Freight Big Pro + Neue Haas Grotesk)
- **Images:** Shopify CDN. Lazy loading. WebP.
- **Checkout:** Shopify native checkout (Dawn theme based)
