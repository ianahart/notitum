import { Box, Heading, Text } from '@chakra-ui/react';

const ManageAccountHeader = () => {
  return (
    <Box>
      <Heading color="black.primary" fontSize="1.3rem">
        Profile and visibility
      </Heading>
      <Text fontSize="0.9rem" my="0.25rem" color="text.primary">
        Manage your personal information, and control which information other people see.
      </Text>
    </Box>
  );
};

export default ManageAccountHeader;
