// theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";

const customConfig = {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e4f0ff" },
          100: { value: "#b3c8ff" },
          200: { value: "#809fff" },
          300: { value: "#4d77ff" },
          400: { value: "#1a4fff" },
          500: { value: "#0036e6" },
          600: { value: "#002ab4" },
          700: { value: "#001e82" },
          800: { value: "#001350" },
          900: { value: "#000720" },
        },
      },
      fonts: {
        heading: { value: `'Roboto', sans-serif` },
        body: { value: `'Roboto', sans-serif` },
      },
    },
  },
};

export const system = createSystem(defaultConfig, customConfig);
