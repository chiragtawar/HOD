/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a', // Slate 900 (Deep Navy)
                    light: '#334155',
                },
                accent: {
                    DEFAULT: '#d4af37', // Gold
                    hover: '#b5952f',
                },
                secondary: '#64748b', // Slate 500
                cream: '#f8fafc',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
