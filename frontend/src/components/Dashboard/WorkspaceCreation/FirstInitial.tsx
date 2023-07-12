import { Box, Flex } from '@chakra-ui/react';

interface IFirstInitialProps {
  initial: string;
}

const FirstInitial = ({ initial }: IFirstInitialProps) => {
  return (
    <Flex color="light.primary" alignItems="center">
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        width="35px"
        height="35px"
        borderRadius={8}
        background=" radial-gradient(circle, rgba(78,79,235,1) 29%, rgba(6,143,255,1) 100%)"
        mr="1rem"
        fontSize="1.5rem"
      >
        {initial}
      </Box>
    </Flex>
  );
};

export default FirstInitial;
