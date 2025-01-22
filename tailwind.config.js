/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'squid': ['SquidPrizeMoney', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 15px rgba(183, 216, 197, 0.8)'
      }
    }
  },
  plugins: []
};
