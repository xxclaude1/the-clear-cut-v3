# The Clear Cut V3 — Product Requirements Document

## 1. Vision & Brand

The Clear Cut V3 is a premium Australian moissanite jewelry e-commerce store. The website is a faithful adaptation of Mejuri's current (2026) live website — ultra-clean luxury minimalism, editorial photography, sophisticated typography, and a shopping experience that feels like browsing a curated gallery.

**Design DNA:** Mejuri's exact current aesthetic. Warm white backgrounds. Display serif headings for editorial weight. Clean grotesque sans-serif for UI and body. Full-bleed lifestyle photography. 4-column product grids with minimal gaps. Quick-add "ADD +" product cards. Horizontal-scroll carousels. Black announcement and footer bars. Generous white space throughout.

**Tone:** Sophisticated. Confident. Gender-neutral. Modern luxury. Not salesy, not precious, not overly feminine. Editorial and refined. Think: a gallery curator describing their collection.

**Current product:** The Tennis Bracelet — one product to start, more added over time.

---

## 2. Global Design System

### 2.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-warm` | `#F5F5F0` | Product card image areas, subtle section backgrounds |
| `--color-bg-cream` | `#FAF9F6` | Newsletter section, alternate section bg |
| `--color-text` | `#1A1A1A` | Primary text, headings, product names |
| `--color-text-secondary` | `#6B6B6B` | Descriptions, captions, material text |
| `--color-text-muted` | `#999999` | Placeholders, disabled states |
| `--color-border` | `#E8E8E5` | Dividers, card borders, input borders |
| `--color-border-dark` | `#1A1A1A` | Focus states, active variant borders |
| `--color-btn-primary-bg` | `#1A1A1A` | Primary button background |
| `--color-btn-primary-text` | `#FFFFFF` | Primary button text |
| `--color-btn-primary-hover` | `#333333` | Primary button hover |
| `--color-announcement-bg` | `#1A1A1A` | Announcement bar |
| `--color-announcement-text` | `#FFFFFF` | Announcement bar text |
| `--color-footer-bar-bg` | `#1A1A1A` | Footer bottom bar |
| `--color-footer-bar-text` | `#FFFFFF` | Footer bottom bar text |
| `--color-overlay` | `rgba(0,0,0,0.4)` | Modal/drawer overlays |
| `--color-badge-bg` | `#FFFFFF` | Product badge background |
| `--color-sale` | `#1A1A1A` | Sale price (struck-through original in gray) |

**Rule:** Pure white/black/warm neutrals only. No pink, blue, or colored accents. All color comes from product photography. The palette should feel warm and sophisticated, not cold and clinical.

### 2.2 Typography

Mejuri's live site uses a refined pairing: a premium display serif for editorial moments and a clean grotesque sans-serif for everything functional. We adapt this using high-quality open-source equivalents.

**Font Stack:**
- **Display serif:** `"DM Serif Display", "Georgia", serif` — for hero headings, editorial section titles, large display text
- **Sans-serif (primary):** `"Inter", "Helvetica Neue", "Arial", sans-serif` — weights 400, 500, 600, 700. For navigation, product names, buttons, body text, prices, all UI
- **Monospace (accent):** `"IBM Plex Mono", "Courier New", monospace` — weight 400. For announcement bar, editorial details, material descriptions

**Font loading:** Google Fonts. Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`. Load DM Serif Display 400, Inter 400/500/600/700, IBM Plex Mono 400/500. `font-display: swap`.

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Letter-Spacing | Transform | Line-Height |
|---------|------|--------|----------------|---------------|----------------|-----------|-------------|
| Hero heading (large) | DM Serif Display | 400 | 52px | 32px | 0.02em | uppercase | 1.1 |
| Section heading (H2) | Inter | 700 | 28px | 22px | 0.06em | uppercase | 1.2 |
| Subsection (H3) | Inter | 700 | 20px | 18px | 0.04em | uppercase | 1.2 |
| Brand name (wordmark) | Inter | 700 | 18px | 16px | 0.12em | uppercase | 1.0 |
| Nav links | Inter | 500 | 12px | 12px | 0.04em | uppercase | 1.0 |
| Body text | Inter | 400 | 15px | 14px | 0 | none | 1.7 |
| Body large | Inter | 400 | 17px | 15px | 0 | none | 1.7 |
| Product name (card) | Inter | 700 | 12px | 11px | 0.03em | uppercase | 1.3 |
| Product name (PDP) | Inter | 700 | 18px | 16px | 0.02em | uppercase | 1.3 |
| Price (card) | Inter | 700 | 13px | 12px | 0 | none | 1.3 |
| Price (PDP) | Inter | 700 | 18px | 16px | 0 | none | 1.3 |
| Strikethrough price | Inter | 400 | 13px | 12px | 0 | none | 1.3 |
| Button text | Inter | 500 | 12px | 12px | 0.06em | uppercase | 1.0 |
| Quick-add button | Inter | 500 | 12px | 11px | 0.04em | uppercase | 1.0 |
| Eyebrow / label | Inter | 500 | 11px | 10px | 0.08em | uppercase | 1.0 |
| Caption / small | Inter | 400 | 12px | 11px | 0 | none | 1.5 |
| Material text (card) | Inter | 400 | 11px | 10px | 0 | none | 1.5 |
| Announcement bar | IBM Plex Mono | 400 | 12px | 11px | 0.02em | none | 1.0 |
| Footer links | Inter | 400 | 13px | 12px | 0 | none | 1.8 |
| Footer heading | Inter | 600 | 14px | 13px | 0 | none | 1.0 |
| Filter bar text | Inter | 500 | 12px | 11px | 0.03em | uppercase | 1.0 |
| Product count | IBM Plex Mono | 400 | 12px | 11px | 0 | none | 1.0 |
| Badge text | Inter | 500 | 10px | 9px | 0.04em | uppercase | 1.0 |
| Editorial overlay heading | DM Serif Display | 400 | 36px | 24px | 0.01em | uppercase | 1.15 |
| Editorial overlay body | IBM Plex Mono | 400 | 14px | 13px | 0 | none | 1.6 |
| Editorial CTA link | Inter | 600 | 13px | 12px | 0.04em | uppercase | 1.0 |

### 2.3 Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2xs` | 4px | Micro gaps (badge padding, icon spacing) |
| `--space-xs` | 8px | Tight gaps, inline spacing |
| `--space-sm` | 16px | Between related items |
| `--space-md` | 24px | Between elements, page side padding (desktop) |
| `--space-lg` | 40px | Between groups |
| `--space-xl` | 64px | Section padding (mobile) |
| `--space-2xl` | 80px | Section padding (desktop) |
| `--space-3xl` | 120px | Large section spacing |
| `--page-max-width` | 1440px | Content max width |
| `--page-padding` | 24px desktop / 16px mobile | Side gutters |
| `--grid-gap` | 1px | Gap between product grid cards |
| `--card-gap` | 2px | Gap in editorial image grids |

### 2.4 Buttons

**Primary (ADD TO CART, CHECK OUT, SHOP NOW):**
- Background: `var(--color-btn-primary-bg)`
- Text: `var(--color-btn-primary-text)`, Inter 500, 12px, letter-spacing 0.06em, uppercase
- Padding: 16px 32px
- Border: none
- Border-radius: 0 (sharp corners — like Mejuri)
- Hover: background `var(--color-btn-primary-hover)`, transition 200ms ease
- Active: `transform: scale(0.98)`, 100ms
- Full-width variant: `width: 100%`

**Outline (JOIN NOW FOR FREE, secondary actions):**
- Background: `#FFFFFF`
- Border: 1px solid `#1A1A1A`
- Text: `#1A1A1A`, Inter 500, 12px, uppercase
- Padding: 14px 28px
- Hover: fills to `#1A1A1A` bg, white text, 200ms
- Active: same scale effect

**Quick Add (product cards — "ADD +"):**
- Text: "ADD +", Inter 500, 12px, letter-spacing 0.04em, uppercase
- Color: `#1A1A1A`
- Background: `#FFFFFF`
- Border-top: 1px solid `var(--color-border)`
- Full width of card, centered
- Padding: 12px 0
- Hover: background `var(--color-bg-warm)`

**Link CTA (SHOP PUZZLE RINGS, STACKING GUIDE, LEARN MORE):**
- Text: Inter 600, 13px, uppercase, letter-spacing 0.04em
- Color: `#1A1A1A`
- Text decoration: underline
- Underline offset: 3px
- Hover: opacity 0.6, transition 200ms
- This is the primary CTA style inside editorial/hero sections

### 2.5 Animations & Transitions

Minimal and fast. Mejuri's site feels snappy and editorial — no heavy animations, no loading screens, no curtain reveals.

**Global easing:** `cubic-bezier(0.16, 1, 0.3, 1)`

**Page load:** Simple opacity fade-in. `opacity: 0 → 1`, 300ms.

**Scroll reveal:**
- `.reveal`: starts at `opacity: 0, translateY(16px)`
- On viewport entry (15% visible): `opacity: 1, translateY(0)`, 500ms, easing
- Stagger children: 50ms delay each
- One-time only (unobserve after reveal)

**Hover — Links/CTAs:** `opacity: 1 → 0.6`, 200ms ease

**Hover — Product card images:** `scale(1) → scale(1.03)`, 400ms ease, overflow hidden on container

**Hover — Buttons:** Background/color transition, 200ms ease

**Cart drawer:** Slide from right `translateX(100%) → 0`, 350ms easing. Overlay fades 250ms.

**Mobile menu:** Slide from left `translateX(-100%) → 0`, 350ms easing. Links stagger in 40ms each.

**Accordion expand:** `max-height` animation, 300ms ease. Plus icon swaps to minus.

**Header scroll shadow:** After 1px scroll, `box-shadow: 0 1px 0 rgba(0,0,0,0.06)`, 200ms ease.

**Announcement bar message rotation:** Crossfade, 400ms, auto-rotate every 5 seconds.

**Carousel/slider:** Horizontal scroll with snap points. Arrow buttons fade in/out.

### 2.6 Scrollbar
- Width: 6px
- Track: transparent
- Thumb: `#D4D4D4`, border-radius: 3px
- Thumb hover: `#AAAAAA`

### 2.7 Selection
- Background: `#1A1A1A`
- Text: `#FFFFFF`

---

## 3. Components

### 3.1 ANNOUNCEMENT BAR

**Position:** Fixed at very top, above header. `z-index: 110`.
**Height:** 36px
**Background:** `#1A1A1A`

**Content:** Rotating messages with left/right arrow navigation (exactly like Mejuri).
- Left/right chevron arrows: thin, white, 10px, positioned at edges
- Message text: IBM Plex Mono 400, 12px, letter-spacing 0.02em, white, centered
- Auto-rotates every 5 seconds, manual navigation via arrows
- Smooth crossfade transition between messages (400ms)

**Messages:**
1. "Free Shipping On All Intl. Orders $150+"
2. "Free Express Shipping Australia-Wide"
3. "30-Day Returns On All Orders"

**Mobile:** Same layout, slightly smaller text (11px).

### 3.2 HEADER

**Position:** Sticky below announcement bar. `z-index: 100`.
**Background:** `#FFFFFF`
**Height:** ~60px
**Padding:** 0 24px (desktop), 0 16px (mobile)
**Border-bottom:** none initially (shadow appears on scroll)

**Layout:** Flexbox, three zones:

**Left zone:**
- Logo wordmark: "THE CLEAR CUT" — Inter 700, 18px, letter-spacing 0.12em, uppercase, `#1A1A1A`
- Links to homepage

**Center zone (desktop ≥ 769px):**
- Nav links in a horizontal row:
  - ALL JEWELRY · NEW IN · BEST SELLERS · COLLECTIONS · MATERIALS
- Inter 500, 12px, letter-spacing 0.04em, uppercase, `#1A1A1A`
- Gap: 28px between links
- Hover: opacity 0.6, 200ms

**Right zone (desktop):**
- Search: magnifying glass icon (20px) + "SEARCH" text label — Inter 500, 12px, uppercase
- Account: person outline icon (20px, stroke 1.5px)
- Wishlist: heart outline icon (20px, stroke 1.5px) — *optional for V3 launch*
- Cart: bag outline icon (20px, stroke 1.5px)
  - Count badge: small circle, `#1A1A1A` bg, white text, 9px, positioned top-right offset

**Right zone (mobile):**
- Hamburger icon (two horizontal lines, 20px wide, 1.5px stroke, 6px gap)
- Cart bag icon with count badge

**Scroll behavior:** After 1px scroll: `box-shadow: 0 1px 0 rgba(0,0,0,0.06)`, 200ms ease.

### 3.3 MOBILE MENU

**Trigger:** Hamburger tap
**Slide from left:** `translateX(-100%) → 0`, 350ms easing
**Background:** `#FFFFFF`, full viewport width and height
**Z-index:** 200

**Layout:**
- Top bar: "THE CLEAR CUT" wordmark left + X close button right (same height as header)
- Below: vertical nav links, left-aligned, generous spacing
- Links: ALL JEWELRY · NEW IN · BEST SELLERS · COLLECTIONS · MATERIALS · STORES & SERVICES
- Inter 500, 24px, uppercase, `#1A1A1A`
- Gap between links: 28px
- Links stagger in from `translateY(8px)` + `opacity: 0`, 40ms delay each
- Bottom: Search link, Account link, smaller text

### 3.4 CART DRAWER

**Trigger:** Cart icon click
**Slide from right:** `translateX(100%) → 0`, 350ms easing
**Overlay:** `rgba(0,0,0,0.4)`
**Width:** 420px desktop, 100% mobile

**Header:**
- "YOUR CART" — Inter 700, 14px, uppercase, letter-spacing 0.04em
- X close button (20px, thin stroke)
- Item count in parentheses
- Border-bottom: 1px `var(--color-border)`
- Padding: 20px 24px

**Empty state:** "Your cart is empty." centered, Inter 400, 15px, `var(--color-text-secondary)`

**With items:**
- Each item row: flex layout
  - Image: 80px square, bg `var(--color-bg-warm)`, border-radius 0
  - Info: Product name (Inter 600, 13px, uppercase) + variant text (Inter 400, 12px, `#6B6B6B`)
  - Quantity: minus/plus buttons with number between
  - Price: Inter 600, 14px, right-aligned
  - Remove: small X button

**Footer (sticky bottom):**
- Border-top: 1px `var(--color-border)`
- "SUBTOTAL" label + price — Inter 700, 16px, flex space-between
- "CHECK OUT" full-width primary button, height 52px
- "Shipping calculated at checkout." — Inter 400, 12px, `#6B6B6B`, centered

### 3.5 PRODUCT CARD (Grid Item)

Matches Mejuri's current product card layout exactly.

**Card structure:**
```
┌─────────────────────────────┐
│                             │
│       Product Image         │
│     (centered on warm       │
│      off-white bg)          │
│                             │
│   [BADGE: "ONLY A FEW LEFT"]│ ← top-right corner badge
├─────────────────────────────┤
│          ADD +              │ ← Quick add row
├─────────────────────────────┤
│ PRODUCT NAME                │ ← Inter 700, 12px, uppercase
│ $499                        │ ← Inter 700, 13px
│ ●● 18k Gold Vermeil        │ ← Color dots + Inter 400, 11px
└─────────────────────────────┘
```

**Image area:**
- Aspect ratio: 1:1 (square)
- Background: `var(--color-bg-warm)` (#F5F5F0)
- Product image centered within, ~80% of card width, object-fit contain
- Hover: `scale(1.03)`, 400ms ease, container overflow hidden
- Optional badges (positioned top-right, inside image area):
  - "ONLY A FEW LEFT" / "BACK IN STOCK" / "NEW" / "LEAVING SOON" / "FLAT BACK AVAILABLE"
  - Inter 500, 10px, uppercase, letter-spacing 0.04em
  - `#1A1A1A` text on white bg with small padding

**Quick add button:**
- Full card width
- Text: "ADD +", centered
- Border-top: 1px `var(--color-border)`
- Padding: 12px 0
- Inter 500, 12px, uppercase, letter-spacing 0.04em
- Background: white
- Hover: bg `var(--color-bg-warm)`
- Click: adds default variant to cart, text → "ADDED ✓" for 1.5s

**Info area (below quick add):**
- Padding: 10px 0 16px
- Product name: Inter 700, 12px, uppercase, letter-spacing 0.03em, `#1A1A1A`
- Price: Inter 700, 13px, `#1A1A1A`
  - If on sale: original price struck through in gray + "From" prefix if multiple prices + bold sale price
- Material/variant line: Inter 400, 11px, `#6B6B6B`
  - Preceded by color swatch dots (8px circles with 1px border, representing available finishes)

**Grid layout:**
- Desktop: 4 columns
- Tablet (769-1024px): 3 columns
- Mobile (<769px): 2 columns
- Gap: 1px (tight grid — cards nearly touch, like Mejuri)

### 3.6 PRODUCT BADGES

Positioned top-right of product card image area.

| Badge | When |
|-------|------|
| NEW | Product added within last 14 days |
| BACK IN STOCK | Previously sold out, now available |
| ONLY A FEW LEFT | Inventory < 5 |
| LEAVING SOON | Product being discontinued |
| FLAT BACK AVAILABLE | Earring-specific feature badge |

Style: Inter 500, 10px, uppercase, `#1A1A1A` on white bg, padding 4px 8px, positioned 8px from top-right.

---

## 4. Pages

### 4.1 HOMEPAGE

The homepage is image-driven and editorial, matching Mejuri's current homepage exactly.

#### Section 1: Hero (Split Image Grid)

Like Mejuri's "START YOUR STACK" hero. Two large images side by side filling the viewport width.

**Layout:** 2-column grid, no gap, each column 50% viewport width
**Height:** ~75vh desktop, auto mobile (stacks)

**Left column:**
- Large editorial/product image (e.g., close-up jewelry photography or illustrated product art)
- Text overlay positioned bottom-left with padding 40px:
  - Heading: DM Serif Display 400, 44px, uppercase, `#1A1A1A` (or white depending on image)
  - Body: IBM Plex Mono 400, 14px, one-line description
  - CTA: Underlined text link — "SHOP NOW", Inter 600, 13px, uppercase

**Right column:**
- Large lifestyle/model image (close-up, hands wearing jewelry, etc.)
- No text overlay — pure imagery

**Mobile:** Stack vertically. Left column (with text overlay) first, right column image below. Each ~50vh.

#### Section 2: Editorial Banner (Split — "THE ART OF THE STACK" style)

Two lifestyle images side by side, each with text overlay. Auto-rotating carousel with pause button.

**Layout:** 2-column grid, no gap
**Height:** ~60vh desktop

**Each column:**
- Full-bleed lifestyle photography
- Bottom-left text overlay with padding 32px:
  - Heading: DM Serif Display 400, 32px, uppercase
  - Body: IBM Plex Mono 400, 14px, 2-line max
  - CTA: Underlined link, Inter 600, 13px, uppercase

**Content:**
- Left: "THE MOISSANITE DIFFERENCE" / "See the brilliance up close." / "LEARN MORE"
- Right: "EVERYDAY ELEGANCE" / "Fine jewelry designed for real life." / "SHOP ALL"

**Carousel controls:** Pause/play button bottom-right (circle, 32px), left/right dots indicator.

#### Section 3: Trending Products (Horizontal Scroll Carousel)

**Heading:** "TOP 15 TRENDING PRODUCTS" — Inter 700, 28px, uppercase, letter-spacing 0.06em, left-aligned
**Padding:** 80px top, 64px bottom, 24px sides

**Layout:** Horizontal scrolling row of product cards
- Desktop: 4 cards visible, scrollable for more
- Carousel navigation: left/right circle arrow buttons at row edges
- Scroll snap to card boundaries
- Mobile: 1.5 cards visible, swipeable, dots indicator

Product cards use standard component (Section 3.5).

#### Section 4: Stores & Services

Like Mejuri's "STORES & SERVICES" section.

**Heading:** "STORES & SERVICES" — Inter 700, 28px, uppercase, letter-spacing 0.06em
**Subheading:** "Discover our thoughtfully designed stores across Australia." — Inter 400, 15px, `#6B6B6B`

**Layout:** 3-column image grid with text below each
**Gap:** 8px between columns

**Each card:**
- Large rectangular lifestyle image (aspect ~4:3)
- Below image:
  - Title: Inter 700, 16px, uppercase (e.g., "OUR STORES", "STYLING GUIDE", "GIFT CONCIERGE")
  - Description: Inter 400, 14px, `#6B6B6B`, 2 lines max
  - CTA: Underlined link — Inter 600, 13px, uppercase (e.g., "VISIT OUR STORES", "LEARN MORE")

#### Section 5: Sustainability / Brand Story

Like Mejuri's "OUR SUSTAINABILITY PROGRESS" section.

**Background:** `#1A1A1A`
**Padding:** 64px 40px
**Layout:** Two columns — heading/CTA left, body text right

**Left:**
- Heading: "OUR COMMITMENT" — Inter 700, 24px, uppercase, `#FFFFFF`
- CTA link: "LEARN MORE" — Inter 600, 13px, uppercase, underlined, white

**Right:**
- Body text: Inter 400, 15px, `#E8E8E5`, line-height 1.7
- Content: Brand story about ethical sourcing, lab-created moissanite, sustainability, community impact

#### Section 6: Newsletter / Membership Banner

Like Mejuri's "BECOME A MEMBER" section.

**Background:** `#F5F5F0`
**Padding:** 48px 40px
**Layout:** Flex row — branding/text left, CTA button right
**Border-top:** 1px `var(--color-border)`

**Left:**
- Brand badge: "THE CLEAR CUT+" — Inter 700, 14px + bold
- Text: "Join The Clear Cut for free and discover exclusive access to our biggest drops, promotions, members-only products, and more." — Inter 400, 14px, `#6B6B6B`

**Right:**
- "JOIN NOW FOR FREE" — outline button (white bg, black border, black text)
- Padding: 14px 28px

#### Section 7: Footer

**Structure:** Two parts — content footer (white bg) and bottom bar (black bg).

**Content Footer:**
- Padding: 64px 24px
- 4-column grid (stacks on mobile into accordion or 2-column layout)

**Column 1: Help**
- Heading: "Help" — Inter 600, 14px
- Links: FAQs · Order Status · Shipping & Delivery · Returns & Exchanges · Warranty · Gift Card · Contact Us
- Inter 400, 13px, `#6B6B6B`, line-height 1.8
- Hover: opacity 0.6

**Column 2: Stores & Services**
- Heading: "Stores & Services" — Inter 600, 14px
- Links: Our Stores · Styling Appointments · Corporate Events & Gifting

**Column 3: Resources**
- Heading: "Resources" — Inter 600, 14px
- Links: Jewelry Care · Size Guides · How To Guide · Blog · Our Materials

**Column 4: About The Clear Cut**
- Heading: "About The Clear Cut" — Inter 600, 14px
- Links: Our Mission · Sustainability · Careers

**Certifications row:** Below columns, logos of ethical/sustainability certifications (if applicable). Small grayscale logos, 40px height.

**Bottom Bar:**
- Background: `#1A1A1A`
- Padding: 24px
- Left: "Country & Language: 🌐 Australia (AUD) | English" — Inter 400, 12px, white
- Center/right: "Privacy Policy" · "Terms And Conditions" · "© 2026 The Clear Cut" — Inter 400, 12px, white
- Social icons: Instagram · Pinterest · X (Twitter) — white, 16px

---

### 4.2 COLLECTION PAGE (Shop All)

Matches Mejuri's current shop-all page.

**Page heading:** "SHOP ALL" — Inter 700, 36px, uppercase, left-aligned, padding: 24px 0

#### Category Image Bar
Horizontal scrollable row of category thumbnail images immediately below the heading.

**Each category:**
- Rectangular image, aspect ~3:4, ~120px wide
- Label overlaid at bottom: Inter 600, 11px, uppercase, white text on dark overlay gradient
- Categories: SHOP ALL · EARRINGS · RINGS · BRACELETS · NECKLACES · CHARMS + PENDANTS · TENNIS JEWELRY
- Scroll snapping, ~8px gap between images
- Active category: slight border or opacity change
- Hover: image darkens slightly

#### Filter Bar
Below category images.

**Layout:** Flex row, space-between
**Left side:** Filter buttons — "CATEGORY" · "MATERIAL" · "ALL FILTERS"
- Inter 500, 12px, uppercase, letter-spacing 0.03em
- Clickable, open dropdown/drawer
- Gap: 16px between filter buttons

**Right side:**
- Product count: "(851 Products)" — IBM Plex Mono 400, 12px, `#6B6B6B`
- "SORT" dropdown — Inter 500, 12px, uppercase

**Separator:** Border-bottom 1px `var(--color-border)` on the entire bar.
**Padding:** 12px 0

#### Product Grid
- 4 columns (3 tablet, 2 mobile)
- Gap: 1px
- Standard product cards (Section 3.5)
- Infinite scroll with "Loading more..." text at bottom (IBM Plex Mono 400, 13px, `#6B6B6B`, centered)

#### "More Ways to Shop" Section
Below main grid, a smaller curated section.

**Heading:** "MORE WAYS TO SHOP" — Inter 700, 24px, uppercase
**Layout:** 4-column product card grid or horizontal scroll
**Shows:** 4-8 curated product picks

---

### 4.3 PRODUCT PAGE (PDP)

Split layout. Image gallery left, product info right.

**Layout:** Two columns — gallery left (55%), info right (45%)
**Mobile:** Stack — gallery full width on top, info below

**Left column — Image Gallery:**
- Main image: large, aspect ratio maintained, bg `var(--color-bg-warm)`
- Below main: thumbnail row (4 thumbnails, 72px each, 6px gap)
- Active thumbnail: border 2px `#1A1A1A`
- Inactive: border 1px `var(--color-border)`
- Click thumbnail → swap main image instantly (no animation)
- Main image hover: `scale(1.04)`, overflow hidden
- Mobile: horizontal swipeable gallery with dot indicators below

**Right column — Product Info:**
- Padding: 0 0 0 48px (desktop), 24px 16px (mobile)
- Sticky on desktop (follows scroll until bottom of gallery)

1. **Breadcrumb** *(optional)*: "Home / Bracelets / Tennis Bracelet" — Inter 400, 12px, `#6B6B6B`

2. **Product title:** Inter 700, 20px, uppercase, letter-spacing 0.02em
   - Margin-bottom: 12px

3. **Price:** Inter 700, 20px
   - If on sale: original struck through in gray + sale price bold
   - Margin-bottom: 20px

4. **Description:** Inter 400, 15px, line-height 1.7, `#1A1A1A`
   - Short, punchy sentences. Periods not commas. Editorial tone.
   - Margin-bottom: 24px

5. **Variant: Finish**
   - Label: "Finish" — Inter 500, 14px
   - Pill buttons: Inter 400, 12px, uppercase, padding 10px 20px, border 1px `var(--color-border)`, border-radius 0
   - Selected: border 2px `#1A1A1A`
   - Hover: border-color `#1A1A1A`
   - Margin-bottom: 20px

6. **Variant: Length**
   - Same pill style as Finish
   - Default selected: "18.0 cm (Standard)"
   - Margin-bottom: 24px

7. **ADD TO CART button:**
   - Full width, primary style, height 52px
   - On click: text → "ADDED ✓" for 1.5s, cart drawer opens
   - Margin-bottom: 12px

8. **Trust line:**
   - "Free shipping · 30-day returns · Lifetime warranty"
   - Centered, Inter 400, 12px, `#6B6B6B`
   - Margin-bottom: 32px

9. **Accordions:**
   - Each: full-width row, label left + plus/minus icon right
   - Label: Inter 600, 14px, uppercase
   - Border-top: 1px `var(--color-border)`
   - Padding: 20px 0
   - Content: Inter 400, 14px, `#6B6B6B`, line-height 1.7

   **Sections:**
   - **DESCRIPTION** — Full product story, editorial copy
   - **TECHNICAL DETAILS** — Specs table
   - **SHIPPING & RETURNS** — Delivery + return info
   - **CARE GUIDE** — Maintenance instructions

**Technical Details Table (inside accordion):**

| Label | Value |
|-------|-------|
| Stone | VVS Moissanite |
| Cut | Round Brilliant |
| Hardness | 9.25 Mohs |
| Fire | 0.104 (2.4x Diamond) |
| Refractive Index | 2.65 |
| Setting | S925 Sterling Silver, 18K Gold Plated |
| Closure | Secure Box Clasp |

Each row: Inter 400, 13px, flex space-between, border-bottom 1px `var(--color-border)`, padding 10px 0.

---

### 4.4 CART PAGE

**URL:** /cart
**Heading:** "YOUR CART" — Inter 700, 32px, uppercase

**Layout:** Max-width 960px, centered. Same styling as cart drawer but with more breathing room.

**Table header (desktop):** "PRODUCT" · "QUANTITY" · "TOTAL" — Inter 500, 12px, uppercase, `#6B6B6B`

**Each item row:** Image (100px square, bg warm) + title/variant + quantity ± controls + line price + remove X

**Bottom section:**
- "SUBTOTAL" + price — Inter 700, 18px, flex space-between
- "CHECK OUT" primary button (width 320px, right-aligned)
- "Shipping calculated at checkout." — Inter 400, 12px, `#6B6B6B`

**Empty cart:**
- "Your cart is empty." — Inter 400, 16px, `#6B6B6B`, centered
- "CONTINUE SHOPPING" — outline button, centered below

---

### 4.5 FAQ PAGE

**Heading:** "FREQUENTLY ASKED QUESTIONS" — Inter 700, 32px, uppercase, centered
**Max-width:** 720px, centered
**Padding-top:** 80px

**Accordion list:** Same styling as product page accordions.

**Questions:**
1. What is moissanite?
2. How does moissanite compare to diamond?
3. Will moissanite lose its sparkle over time?
4. What does VVS clarity mean?
5. What is 18K gold plated sterling silver?
6. How do I choose my bracelet length?
7. Do you offer free shipping?
8. What is your return policy?
9. Do you provide a warranty?
10. How should I care for my jewelry?
11. Do you ship internationally?
12. Is my payment secure?

*(See Copy Bank section for full answers)*

---

### 4.6 CONTACT PAGE

**Heading:** "CONTACT US" — Inter 700, 32px, uppercase, centered
**Subtext:** "We'd love to hear from you." — Inter 400, 15px, `#6B6B6B`, centered
**Max-width:** 600px, centered
**Padding-top:** 80px

**Form fields:**
- Name: text input
- Email: email input
- Subject: dropdown or text
- Message: textarea (min-height 150px)
- "SEND MESSAGE" primary button, full width

**Input style:** Border 1px `var(--color-border)`, padding 14px 16px, Inter 400, 14px, border-radius 0, focus: border-color `#1A1A1A`

**Below form:** "hello@theclearcut.com.au" — Inter 400, 14px, underlined. "We typically respond within 24 hours." — Inter 400, 13px, `#6B6B6B`

---

### 4.7 POLICY PAGES

Shared layout: max-width 720px, centered, padding-top 80px.

- Heading: Inter 700, 32px, uppercase, centered
- Body: Inter 400, 15px, line-height 1.8, `#1A1A1A`
- H3 subheadings: Inter 700, 18px, uppercase

**Pages:** Shipping Policy, Return & Refund Policy, Privacy Policy, Terms of Service

---

## 5. Product Data (Shopify)

### Tennis Bracelet

```
Title: The Tennis Bracelet
Vendor: The Clear Cut
Product type: Bracelets
Tags: moissanite, tennis bracelet, jewelry, bracelet, bestseller
Status: active
Price: $499.00 AUD
```

**Option 1: Finish**
- 18ct White Gold Plated
- 18ct Yellow Gold Plated
- 18ct Rose Gold Plated

**Option 2: Length**
- 15.5 cm / 16.5 cm / 18.0 cm (Standard) / 19.0 cm / 20.5 cm / 21.5 cm

**Description (HTML):**
```html
<p>Round brilliant-cut moissanite. VVS clarity. Set in 18ct gold plated sterling silver. More fire than diamond, harder than sapphire. Built for everyday elegance — designed to last a lifetime.</p>
```

**SEO:**
- Title: The Tennis Bracelet — The Clear Cut
- Description: VVS moissanite tennis bracelet in 18ct gold. 2.4x more fire than diamond. Free express shipping Australia-wide. $499 AUD.
- Handle: the-tennis-bracelet

---

## 6. Copy Bank

### Announcement Bar (rotating)
1. "Free Express Shipping Australia-Wide"
2. "30-Day Returns On All Orders"
3. "Lifetime Warranty Included"

### Homepage Hero
- Heading: "START YOUR COLLECTION"
- Body: "Our Tennis Bracelets are waiting."
- CTA: "SHOP TENNIS BRACELETS"

### Editorial Banner
- Left: "THE MOISSANITE DIFFERENCE" / "See the brilliance up close." / "LEARN MORE"
- Right: "EVERYDAY ELEGANCE" / "Fine jewelry designed for real life." / "SHOP ALL"

### Stores & Services
- Card 1: "OUR STORES" / "Your new favourite place to shop and stay a while." / "VISIT OUR STORES"
- Card 2: "STYLING GUIDE" / "Expert one-on-one stacking and styling advice." / "BOOK AN APPOINTMENT"
- Card 3: "GIFT CONCIERGE" / "Find the perfect piece for every occasion." / "LEARN MORE"

### Sustainability Section
- Heading: "OUR COMMITMENT"
- Body: "Our journey mirrors that of the jewelry we create — crafted through collaboration and constant evolution. We're here to transform fine jewelry into everyday moments, empower our community, and drive meaningful change."

### Newsletter/Membership
- Badge: "THE CLEAR CUT+"
- Heading: "BECOME A MEMBER"
- Body: "Join The Clear Cut+ for free and discover exclusive access to our biggest drops, promotions, members-only products, and more."
- CTA: "JOIN NOW FOR FREE"

### Product Page — Tennis Bracelet
- Description: "Round brilliant-cut moissanite. VVS clarity. Set in 18ct gold plated sterling silver. More fire than diamond, harder than sapphire. Built for everyday elegance — designed to last a lifetime."
- Accordion — Description: "A statement of quiet luxury. Our Tennis Bracelet features 40 round brilliant-cut VVS moissanite stones, each hand-set in a classic four-prong setting. The stones are mounted on a S925 sterling silver base with a thick 18-karat gold plating for lasting warmth and durability. Secured with a box clasp and double safety catch."
- Accordion — Shipping: "Free express shipping on all Australian orders via Australia Post. Typical delivery: 2-5 business days with full tracking. International shipping available at checkout."
- Accordion — Returns: "30-day return window from date of delivery. Items must be unworn and in original packaging. Free return shipping within Australia. Full refund processed within 5-7 business days."
- Accordion — Care: "Clean with warm soapy water and a soft brush. Avoid harsh chemicals, chlorine, and abrasive surfaces. Store in the provided jewelry box when not wearing. Polish gently with included microfiber cloth."

### Reviews
1. "I've received more compliments on this bracelet than any piece of jewelry I own. The sparkle is unreal." — Sarah M., Sydney
2. "My partner thought it was a diamond. The quality exceeded every expectation." — Emma L., Melbourne
3. "Arrived beautifully packaged with a certificate of authenticity. Truly premium." — Jessica K., Brisbane
4. "I was skeptical about moissanite but this completely changed my mind. Stunning." — Lauren T., Perth

### FAQ Answers
1. **What is moissanite?** Moissanite is a lab-created gemstone composed of silicon carbide. Originally discovered in a meteor crater by Nobel Prize-winning chemist Dr. Henri Moissan, it is now expertly crafted in laboratories to produce stones of exceptional brilliance and clarity.

2. **How does moissanite compare to diamond?** Moissanite scores 9.25 on the Mohs hardness scale (diamond is 10), has 2.4 times more fire (rainbow flashes), and a higher refractive index (2.65 vs 2.42). To the naked eye, they are virtually indistinguishable.

3. **Will moissanite lose its sparkle over time?** No. Moissanite's optical properties are permanent. It will not cloud, fade, or change colour over time. Its brilliance and fire are inherent to the stone's crystalline structure.

4. **What does VVS clarity mean?** VVS stands for Very Very Slightly Included. Inclusions are invisible to the naked eye and can only be detected under 10x magnification. Our stones are completely eye-clean.

5. **What is 18K gold plated sterling silver?** Our pieces feature a thick layer of 18-karat gold electroplated over a S925 sterling silver base. This provides the warmth of solid gold with excellent durability for everyday wear.

6. **How do I choose my bracelet length?** Measure your wrist with a flexible tape measure, then add 1-2cm for a comfortable fit. 18.0cm (Standard) fits most wrists. If between sizes, size up.

7. **Do you offer free shipping?** Yes. All Australian orders include free express shipping via Australia Post. Typical delivery is 2-5 business days with full tracking.

8. **What is your return policy?** 30-day return window from date of delivery. Items must be unworn and in original packaging. Free return shipping within Australia. Full refunds within 5-7 business days.

9. **Do you provide a warranty?** Every piece comes with a lifetime manufacturer warranty covering defects in materials and craftsmanship. We guarantee our moissanite stones will maintain their optical properties for life.

10. **How should I care for my jewelry?** Clean with warm soapy water and a soft brush. Avoid harsh chemicals, chlorine, and abrasive surfaces. Store in the provided jewelry box when not wearing.

11. **Do you ship internationally?** Yes. International shipping is available at checkout. Rates and delivery times vary by destination.

12. **Is my payment secure?** We use Shopify's secure checkout with full SSL encryption and 3D Secure authentication. We accept Visa, Mastercard, American Express, and Apple Pay.

---

## 7. Build Phases

Each phase is reviewed before moving to next. Changes pushed to GitHub → synced to Shopify.

| Phase | What | Key Deliverables |
|-------|------|-----------------|
| 1 | Foundation | Global CSS (design tokens, typography, reset), base layout (theme.liquid), Google Fonts loading, meta tags, favicon |
| 2 | Header + Footer | Announcement bar (rotating messages), sticky header (logo/nav/icons), mobile menu, cart drawer, full footer (content + black bottom bar) |
| 3 | Homepage | Hero split image grid, editorial banner, trending products carousel, stores & services section, sustainability section, membership banner |
| 4 | Collection Page | Shop-all with category image bar, filter bar (category/material/sort), 4-column product grid, product cards with quick-add, infinite scroll |
| 5 | Product Page | Split layout PDP — image gallery with thumbnails, variant selectors (finish/length), add-to-cart, trust line, accordions with details |
| 6 | Cart Page | Full cart page with quantity controls, empty state, checkout button |
| 7 | Supporting Pages | FAQ accordion page, Contact form page |
| 8 | Policies | Shipping, Returns, Privacy, Terms |
| 9 | Polish & QA | Cross-browser testing, mobile QA, performance audit, SEO meta/OG tags, accessibility pass, favicon |

---

## 8. SEO & Meta

### Homepage
- `<title>`: The Clear Cut — Fine Moissanite Jewelry Australia
- `<meta name="description">`: Fine moissanite jewelry for every day. Lab-created stones set in sterling silver and 18K gold. Free express shipping Australia-wide.

### Collection Page
- `<title>`: Shop All — The Clear Cut
- `<meta name="description">`: Browse our collection of fine moissanite jewelry. Tennis bracelets, earrings, rings, and necklaces in 18K gold. Free shipping Australia-wide.

### Product Page
- `<title>`: The Tennis Bracelet — The Clear Cut
- `<meta name="description">`: VVS moissanite tennis bracelet. 2.4x more fire than diamond. S925 sterling silver with 18K gold plating. Free shipping and 30-day returns. $499 AUD.

### All Pages
- `<meta name="theme-color" content="#ffffff">`
- Canonical URLs on every page
- Open Graph tags: og:title, og:description, og:image, og:url, og:type
- Preconnect: fonts.googleapis.com, fonts.gstatic.com
- Structured data: Organization, Product (on PDP), BreadcrumbList

---

## 9. Technical Notes

- **Platform:** Shopify with custom Liquid theme (Dawn fork)
- **CSS:** Vanilla CSS with design tokens as CSS custom properties. No Tailwind, no SCSS, no preprocessors. Single `base.css` file with sections.
- **JS:** Vanilla JS. No frameworks. IntersectionObserver for scroll reveals. Event delegation. Custom carousel with scroll-snap.
- **Fonts:** Google Fonts — DM Serif Display 400, Inter 400/500/600/700, IBM Plex Mono 400/500. Preload critical weights. `font-display: swap`.
- **Images:** Shopify CDN. Lazy loading below-fold. WebP with fallbacks. Responsive srcset.
- **Checkout:** Shopify native (Dawn-based). Customization via checkout branding API if needed.
- **Performance targets:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Accessibility:** WCAG 2.1 AA. Focus states, alt text, semantic HTML, aria labels.
