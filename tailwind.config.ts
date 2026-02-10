import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FF5757",
                secondary: "#FF8787",
                "bg-dark": "#0A0A0A",
                "bg-secondary": "#181818",
                "bg-card": "#1A1A1A",
                "gray-dark": "#2A2A2A",
                "gray-light": "#3A3A3A",
                "text-color": "#FFFFFF",
                "text-muted": "#B0B0B0",
            },
            fontFamily: {
                display: ["Poppins", "sans-serif"],
                body: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "12px",
                lg: "16px",
            },
            boxShadow: {
                glow: "0 0 20px rgba(255, 87, 87, 0.3)",
                md: "0 4px 20px rgba(0, 0, 0, 0.1)",
                lg: "0 10px 40px rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
};

export default config;
