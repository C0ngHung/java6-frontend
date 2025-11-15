/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background-light": "#FFFFFF",
        "background-dark": "#121212",
        "secondary-background": "#F5F5F5",
        "text-primary": "#000000",
        "text-secondary": "#7D8184",
        // Admin Dashboard colors
        "accent-green": "#228B22",
        "panel-light": "#ffffff",
        "panel-dark": "#2a2a1a",
        "text-light": "#333333",
        "text-dark": "#e0e0d1",
        "border-light": "#f0f2f5",
        "border-dark": "#3a3a2a",
        // Shadcn colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#DB4444",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        none: "0",
        sm: "0.125rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}

