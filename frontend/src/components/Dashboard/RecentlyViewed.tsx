import { Box, Flex, Text } from '@chakra-ui/react';
import { AiOutlineClockCircle } from 'react-icons/ai';

const RecentlyViewed = () => {
  return (
    <Box pt="10rem" ml={['1rem', '1rem', '10rem']}>
      <Flex color="light.primary">
        <Box mr="1rem" fontSize="1.5rem">
          <AiOutlineClockCircle />
        </Box>
        <Text fontWeight="bold">Recently Viewed</Text>
      </Flex>
    </Box>
  );
};

export default RecentlyViewed;
