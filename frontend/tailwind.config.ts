import type { Config } from "tailwindcss";

const config = {
  theme: {
    screens: {
      mobile: "360px",
      xs: "576px",
      "mini-tablet": "568px",
      tablet: "768px",
      sm: "992px",
      md: "1200px",
      lg: "1440px",
      xl: "1920px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        inherit: "inherit",
      },
      fontFamily: {
        unbounded: ["var(--font-unbounded)"],
        manrope: ["var(--font-manrope)"],
        manropeSemibold: ["var(--font-manrope-semibold)"],
      },
      boxShadow: {
        hover: "0 4px 10px 0 rgba(0, 0, 0, 0.25)",
        default: "0 0 10px 0 rgba(0, 0, 0, .15)",
        "shadow-hover-for-card": "0 2px 10px 0 rgba(0, 0, 0, 0.2)",
      },
      colors: {
        gray: "var(--gray)",
        notificationGreen: "var(--notification-green)",
        notificationBlue: "var(--notification-blue)",
        notificationRed: "var(--notification-red)",
        goldenReview: "var(--golden-review)",
        orangeDefault: "var(--orange-default)",
        grayDefault: "var(--gray-default)",
        lightGray: "var(--light-gray)",
        darkblue: "hsl(var(--darkblue))",
        purpleBg: "hsl(var(--purple-bg))",
        yellowGreen: "hsl(var(--yellow-green-bg))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        smoky: "hsl(var(--smoky))",
        background: "hsl(var(--bg))",
        foreground: "hsl(var(--foreground))",
        bluelink: "hsl(var(--bluelink))",
        inactive: "hsl(var(--typography-inactive))",
        error: "hsl(var(--typography-error))",
        darkgrey: "hsl(var(--typography-secondary))",
        primary: {
          DEFAULT: "hsl(var(--typography-primary))",
          primary: "hsl(var(--primary))",
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
        "black-color": "var(--black-color)",
        "smoke-color": "var(--smoke-color)",
        "dark-gray": "var(--dark-gray)",
        "blue-links": "var(--blue-links)",
        progress: {
          DEFAULT: "hsl(var(--progress))",
          foreground: "hsl(var(--progress-foreground))",
          green: "hsl(var(--progress-green))",
        },
        button: {
          hoverBlack: "hsl(var(--button-hover-black))",
          pressedBlack: "hsl(var(--button-active-black))",
        },
        stroke: {
          DEFAULT: "hsl(var(--stroke-default))",
          hover: "hsl(var(--stroke-hover))",
          active: "hsl(var(--stroke-active))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        loading1: {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(0)" },
        },
        loading2: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-100%)" },
          "75%": { transform: "translateY(0)" },
        },
        loading3: {
          "0%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        loading1: "loading1 1s infinite",
        loading2: "loading2 1s infinite",
        loading3: "loading3 1s infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      transitionDuration: {
        "600": "600ms",
      },
    },
  },
} satisfies Config;

export default config;
