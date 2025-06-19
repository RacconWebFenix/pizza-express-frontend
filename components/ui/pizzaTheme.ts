import { defaultSystem } from "@chakra-ui/react";

// Paleta inspirada em pizzaria: vermelho, amarelo, marrom, verde e tons quentes
export const pizzaSystem = {
  ...defaultSystem,
  theme: {
    ...defaultSystem,
    colors: {
      ...defaultSystem,
      brand: {
        50: "#fff5e6",
        100: "#ffe0b2",
        200: "#ffcc80",
        300: "#ffb74d",
        400: "#ffa726",
        500: "#ff9800", // Laranja pizza
        600: "#f57c00",
        700: "#e65100",
        800: "#a04000", // Marrom massa
        900: "#6d2c00",
      },
      tomato: {
        500: "#e53935", // Vermelho tomate
      },
      cheese: {
        500: "#fff176", // Amarelo queijo
      },
      basil: {
        500: "#43a047", // Verde manjericão
      },
      crust: {
        500: "#bcaaa4", // Bege/marrom claro massa
      },
    },
    fonts: {
      heading: "'Baloo 2', 'Arial', sans-serif",
      body: "'Baloo 2', 'Arial', sans-serif",
    },
  },
};
