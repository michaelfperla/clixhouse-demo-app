# 🎨 Visual Design Mockups

## How Each Concept Looks (Code Examples)

---

## 🔥 Concept 1: Bold Marketplace

### Card Component Example
```tsx
<div className="relative overflow-hidden rounded-3xl shadow-lg">
  {/* Full-width photo background */}
  <div className="relative h-48 bg-gradient-to-br from-red-500 to-orange-600">
    <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}

    {/* Price badge */}
    <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold">
      $45 MXN
    </div>

    {/* Content overlay at bottom */}
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <h3 className="font-bebas text-2xl uppercase tracking-wide">
        Tacos al Pastor
      </h3>
      <p className="text-sm text-gray-200 mt-1">
        Con piña, cebolla y cilantro
      </p>
    </div>

    {/* Floating add button */}
    <button className="absolute bottom-4 right-4 bg-white text-red-600 w-12 h-12 rounded-full shadow-lg hover:scale-110 transition">
      +
    </button>
  </div>
</div>
```

### Color Updates Needed
```js
// tailwind.config.ts
primary: {
  500: '#dc2626', // Red instead of orange
  600: '#b91c1c',
}
secondary: {
  500: '#16a34a', // Green
  600: '#15803d',
}
```

---

## 🎯 Concept 2: Clean Minimalist

### Card Component Example
```tsx
<div className="flex items-center gap-4 py-4 border-b border-slate-200 active:bg-slate-50 transition">
  {/* Icon circle on left */}
  <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
    <span className="text-3xl">🌮</span>
  </div>

  {/* Content in middle */}
  <div className="flex-1 min-w-0">
    <h3 className="font-medium text-slate-900 text-base tracking-tight">
      Tacos al Pastor
    </h3>
    <p className="text-sm text-slate-500 mt-0.5 truncate">
      Con piña, cebolla y cilantro
    </p>
  </div>

  {/* Price and button on right */}
  <div className="flex items-center gap-3 flex-shrink-0">
    <span className="font-bold text-lg text-slate-900">$45</span>
    <button className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl leading-none">
      +
    </button>
  </div>
</div>
```

### Layout Changes
```tsx
// Replace grid with list
<div className="space-y-0"> {/* No gap, borders divide */}
  {filteredItems.map((item) => (
    <MenuItem key={item.id} item={item} />
  ))}
</div>
```

---

## 🌮 Concept 3: Authentic Mexican

### Card Component Example
```tsx
<div className="relative bg-amber-50 rounded-2xl overflow-hidden border-2 border-orange-600 shadow-md">
  {/* Decorative corner pattern */}
  <div className="absolute top-0 right-0 w-12 h-12 bg-orange-600 opacity-10"
       style={{clipPath: 'polygon(100% 0, 0 0, 100% 100%)'}}>
  </div>

  {/* Emoji badge with texture */}
  <div className="h-32 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative">
    <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center shadow-md">
      <span className="text-4xl">🌮</span>
    </div>

    {/* Popular badge with star */}
    {item.popular && (
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
        ⭐ Popular
      </div>
    )}
  </div>

  {/* Content */}
  <div className="p-3 bg-amber-50">
    <h3 className="font-quicksand font-bold text-gray-900 text-base">
      Tacos al Pastor
    </h3>
    <p className="text-sm text-gray-600 mt-1">
      Con piña y cilantro
    </p>

    <div className="flex items-center justify-between mt-3">
      <span className="text-orange-700 font-extrabold text-lg">$45</span>
      <button className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
        Agregar
      </button>
    </div>
  </div>
</div>
```

### Background Pattern
```tsx
// In menu page
<div className="min-h-screen bg-amber-100 relative">
  {/* Subtle tile pattern */}
  <div className="absolute inset-0 opacity-5"
       style={{backgroundImage: 'url(/tile-pattern.svg)', backgroundSize: '100px'}}>
  </div>

  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

---

## ✨ Concept 4: Modern Glass

### Card Component Example
```tsx
<div className="relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/40 border border-white/60 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
  {/* Gradient blob instead of emoji */}
  <div className="h-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 opacity-60 blur-2xl transform scale-150">
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-sm opacity-80">
      </div>
    </div>

    {/* Popular shimmer badge */}
    {item.popular && (
      <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm">
        ✨ Popular
      </div>
    )}
  </div>

  {/* Glass content area */}
  <div className="p-4 backdrop-blur-xl bg-white/60">
    <h3 className="font-poppins font-semibold text-gray-900 text-sm tracking-tight">
      Tacos al Pastor
    </h3>

    <div className="flex items-center justify-between mt-3">
      <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        $45
      </span>
      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105">
        +
      </button>
    </div>
  </div>
</div>
```

### Animated Gradient Background
```tsx
<div className="min-h-screen relative overflow-hidden">
  {/* Animated gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 animate-gradient">
  </div>

  {/* Floating gradient orbs */}
  <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20 animate-float">
  </div>
  <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}>
  </div>

  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

---

## 📐 Typography Setup for Each Concept

### Concept 1: Bold Marketplace
```tsx
// app/layout.tsx
import { Bebas_Neue, Inter } from 'next/font/google'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// tailwind.config.ts
fontFamily: {
  bebas: ['var(--font-bebas)'],
  sans: ['var(--font-inter)'],
}
```

### Concept 2: Clean Minimalist
```tsx
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-dm-sans)'],
}
```

### Concept 3: Authentic Mexican
```tsx
import { Quicksand, Open_Sans, Caveat } from 'next/font/google'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

// tailwind.config.ts
fontFamily: {
  quicksand: ['var(--font-quicksand)'],
  sans: ['var(--font-opensans)'],
  handwritten: ['var(--font-caveat)'],
}
```

### Concept 4: Modern Glass
```tsx
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-poppins)'],
}
```

---

## 🎨 Quick Color Reference

### Concept 1: Bold Marketplace
```css
--primary: #dc2626 (Red)
--secondary: #16a34a (Green)
--accent: #eab308 (Yellow)
```

### Concept 2: Clean Minimalist
```css
--primary: #0f172a (Slate-900)
--accent: #f97316 (Orange-500)
--muted: #94a3b8 (Slate-400)
```

### Concept 3: Authentic Mexican
```css
--primary: #c2410c (Terra cotta)
--secondary: #059669 (Emerald)
--accent: #dc2626 (Red)
--background: #fef3c7 (Cream)
```

### Concept 4: Modern Glass
```css
--gradient-1: linear-gradient(#8b5cf6, #d946ef) (Purple-Pink)
--gradient-2: linear-gradient(#06b6d4, #3b82f6) (Cyan-Blue)
--gradient-3: linear-gradient(#f59e0b, #f97316) (Amber-Orange)
```

---

## 🚀 Implementation Checklist

For whichever concept you choose, I'll update:

- [ ] `tailwind.config.ts` - New color palette
- [ ] `app/layout.tsx` - New Google Fonts
- [ ] `app/globals.css` - New animations/utilities
- [ ] `app/menu/page.tsx` - New layout structure
- [ ] Create new card component or update inline
- [ ] Update category pills styling
- [ ] Update header/points badge
- [ ] Test on mobile viewport

**Ready to implement? Which concept should I build?**

Or would you like me to create a live preview page where you can toggle between all 4 concepts?
