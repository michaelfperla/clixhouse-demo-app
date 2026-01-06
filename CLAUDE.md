# CLIXHOUSE Demo PWA

## About This Project
A demo Progressive Web App (PWA) for CLIXHOUSE to show potential restaurant clients in Guasave, Sinaloa. Used for in-person sales pitches to demonstrate the value of having their own branded ordering app.

## Purpose
When Michael walks into a restaurant, he can:
1. Open this demo on his phone
2. Let them tap around and see how it works
3. Say "Imagínate esto con TU logo y menú"
4. Close the deal

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **PWA**: next-pwa
- **Hosting**: Vercel
- **URL**: demo.clixhouse.com (planned)

## Core Features

### MVP (Must Have)
- [ ] Menu display with categories
- [ ] Item detail view with photos
- [ ] Cart functionality
- [ ] Order confirmation screen
- [ ] "Add to home screen" prompt
- [ ] Loyalty points display
- [ ] Mobile-first responsive design

### Nice to Have
- [ ] Swappable branding (logo, colors)
- [ ] Push notification demo
- [ ] QR code generator
- [ ] Order history
- [ ] Promo banner

## Design Principles
1. **Mobile-first** - This will only be shown on phones
2. **Fast** - Must feel snappy, no loading spinners
3. **Mexican aesthetic** - Warm colors, feels local not corporate
4. **Simple** - Restaurant owners aren't tech savvy

## Branding (Demo Mode)
- Name: "Demo Restaurante" or "Tu Restaurante"
- Colors: Warm orange/red (easily swappable)
- Logo: Placeholder that screams "your logo here"

## Commands
```bash
bun install      # Install dependencies
bun dev          # Start dev server (localhost:3000)
bun build        # Build for production
bun start        # Start production server
```

## Runtime
- **Package Manager**: Bun
- **Runtime**: Bun

## File Structure
```
/app
  /page.tsx           # Home/Menu page
  /item/[id]/page.tsx # Item detail
  /cart/page.tsx      # Cart view
  /order/page.tsx     # Order confirmation
  /points/page.tsx    # Loyalty points
/components
  /Menu.tsx
  /MenuItem.tsx
  /Cart.tsx
  /Header.tsx
  /BottomNav.tsx
  /AddToHomeScreen.tsx
/lib
  /menu-data.ts       # Fake menu items
  /cart-store.ts      # Cart state (Zustand or context)
/public
  /icons              # PWA icons
  /images             # Food photos
```

## Development Notes
- Use placeholder food images (Unsplash or generated)
- Menu items should be realistic Mexican food
- Prices in MXN
- All text in Spanish

## Related Project
This demo supports the outreach system at:
`C:\Users\micha\Desktop\clixhouse-outreach`
