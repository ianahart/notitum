import { extendTheme } from '@chakra-ui/react';
import '@fontsource/bangers';
import '@fontsource-variable/open-sans';

export const theme = extendTheme({
  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset',
          },
        },
      },
    },
  },
  fonts: {
    heading: `'Bangers', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  colors: {
    black: {
      primary: '#484648',
      secondary: '#200F21',
    },
    text: {
      primary: '#718096',
      secondary: '#444447',
      tertiary: '#403d40',
    },
    light: {
      primary: '#e4e3e3',
    },
    cover: {
      primary: 'rgba(54, 54, 54, 0.8)',
    },
  },
});
