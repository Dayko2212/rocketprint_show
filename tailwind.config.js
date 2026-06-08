/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    DEFAULT: "#ff7800",
                    hover: "#ffaa00",
                },
                accent: {
                    blue: "var(--accent-blue)",
                    light: "var(--accent-light)",
                },
                card: {
                    bg: "var(--card-bg)",
                    border: "var(--card-border)",
                    shadow: "var(--card-shadow)",
                },
                surface: {
                    accent: "var(--surface-accent)",
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
