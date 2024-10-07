// theme/theme.ts
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/norwester';  // Or your chosen font

const customTheme = extendTheme({
    fonts: {
        heading: "'Norwester', sans-serif",  // Apply for headings
        body: "'Norwester', sans-serif",     // Apply for body text
        },
  colors: {
    primary: {
      100: 'rgba(78, 211, 255, 0.1)',  // Lighter shades if needed
      200: 'rgba(78, 211, 255, 0.2)',
      300: 'rgba(78, 211, 255, 0.3)',
      400: 'rgba(78, 211, 255, 0.4)',
      500: 'rgba(78, 211, 255, 1)',    // Main primary color
      600: 'rgba(78, 211, 255, 0.8)',  // Darker shades if needed
      700: 'rgba(78, 211, 255, 0.7)',
    },
    secondary: {
      100: 'rgba(255, 201, 210, 0.1)',  // Lighter shades if needed
      200: 'rgba(255, 201, 210, 0.2)',
      300: 'rgba(255, 201, 210, 0.3)',
      400: 'rgba(255, 201, 210, 0.4)',
      500: 'rgba(255, 201, 210, 1)',    // Main secondary color
      600: 'rgba(255, 201, 210, 0.8)',  // Darker shades if needed
      700: 'rgba(255, 201, 210, 0.7)',
    },
  },
});

export default customTheme;
