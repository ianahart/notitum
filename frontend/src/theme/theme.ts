import { extendTheme } from '@chakra-ui/react';
import '@fontsource/bangers';
import '@fontsource-variable/open-sans';
import { colors } from './colors';
import { fonts } from './fonts';

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
  fonts,
  colors,
});
