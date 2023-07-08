import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box textAlign="center" p="0.25rem" className="footer" as="footer">
      <Text color="text.primary">&copy; 2023 Ian Hart</Text>
    </Box>
  );
};

export default Footer;
