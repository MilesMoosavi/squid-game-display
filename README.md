# Squid Game Display

An interactive recreation of the prize money and player count display from Netflix's Squid Game series, built with SvelteKit and TailwindCSS.

![Original Squid Game display from Netflix series](/src/lib/assets/images/show.jpg)
*Original display from Squid Game (S1)*

![Still screenshot of the playercount at 456](/src/lib/assets/images/app.jpg)
![Scrolling demo from playercount 456 to 1](/src/lib/assets/gifs/scroll_demo.gif)
*Current progress of the implementation*

## Current Features

- **Dynamic Number Displays**
  - Synchronized player count (1-456) and cash prize (₩0-45.6B) displays
  - Interactive scrolling controls with hover effects
  - Custom underline bars for each digit
  - Authentic Squid Game font styling
  - Responsive scaling based on viewport size

- **Real-time Calculations**
  - Automatic prize money adjustments based on player eliminations
  - ₩100,000,000 per player calculation
  - Bi-directional synchronization between displays

## Planned Features

- **Animation Enhancements**
  - Upper horizontal bars with expansion effects
  - Scroll-into-bar animations for digits
  - Smooth transition effects

- **Interactive Elements**
  - Player node visualization
  - Click-to-eliminate functionality
  - Visual feedback for player elimination

- **Sound Design**
  - Digit scrolling sound effects
  - Stop/impact sound effects
  - Player elimination sounds

## Technical Details

- **Framework**: SvelteKit
- **Styling**: TailwindCSS
- **Font**: Custom `squid-prize-money.otf`
- **Display Resolution**: 21:9 aspect ratio

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Configuration

The display can be configured through the `CONFIG` object in `+page.svelte`:

- Player count range: 1-456
- Prize money range: ₩0-45.6B
- Prize per player: ₩100M

## Contributing

This project is still in active development. See `recap.md` for detailed implementation plans and feature roadmap.
