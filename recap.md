# Prize Money Scroller Project Recap and Features

## Key Features to Implement:

1. **Prize Money Scrolling Display**:
   - A digit display where numbers scroll dynamically up or down.
   - Trigger sound effects when digits move and stop.
   - Use a custom font called `squid-prize-money.otf` for the digit styling.
   - Add animations for the bars:
     - **Upper bar**: Appears dynamically during digit scrolling with a horizontal expansion effect.
     - **Lower bar**: Always visible after the page loads for the first time.

2. **Interactive Player Nodes**:
   - Display circles on the screen, each representing a "player."
   - Clicking (or click-and-holding) on a player eliminates them:
     - Play an animation of a red slashing X appearing over the circle.
     - Update the prize money (increase) and player count (decrease) dynamically.

3. **User Input Options**:
   - Allow users to input:
     - The number of players.
     - The initial prize money.
   - Dynamically adjust the digit display and player circles based on these inputs.

4. **Hover Interactions for Digits**:
   - Add a subtle glow outline effect when hovering over any digit
   - When hovering over a digit:
     - Scrolling up increases the digit value
     - Scrolling down decreases the digit value
   - The glow effect should match the Squid Game aesthetic

5. **Drag Gesture for Digits**:
   - Allow users to click and drag vertically on a digit to scroll it dynamically, mimicking a slot machine flick.

6. **Sound Effects**:
   - Add sound effects that play:
     - When digits scroll.
     - When digits stop moving.

---

## Project Structure

```
src/
├── lib/
│   ├── assets/
│   │   └── images/
│   │       ├── show.jpg
│   │       └── app.png
│   ├── components/
│   │   ├── digits/
│   │   │   ├── DigitStyle.svelte    # Individual digit styling and animations
│   │   │   └── DigitDisplay.svelte   # Legacy digit component
│   │   ├── CashPrize.svelte         # Cash prize display component
│   │   ├── Labels.svelte            # Korean/English label pairs
│   │   └── PlayerCount.svelte       # Player count display component
│   └── styles/
├── routes/
│   ├── +page.svelte                 # Main page with game configuration
│   └── +layout.svelte              # Root layout with global styles
├── app.css                         # Global styles and Tailwind config
└── app.d.ts                        # TypeScript declarations
```

---

## General Notes for Development:

- Use **TailwindCSS** for styling:
  - Leverage utility classes for responsive design.
  - For animations, use Tailwind's animation utilities or lightweight animation libraries like GSAP if necessary.
- Animations:
  - Focus on smooth transitions for the bars (horizontal expansion) and digit scrolling.
  - Design the elimination animation for player nodes (e.g., red X) with ease-in-out effects.
- Future Additions:
  - Enhance responsiveness only if the design requires it (e.g., container expansion for mobile devices).
  - Revisit Container Queries or similar plugins if complex resizing becomes necessary.

---

This should guide GitHub Copilot as you start implementing your project's core features.
