import { Flex } from '@chakra-ui/react';

interface IAvatarProps {
  abbreviation: string;
}

const Avatar = ({ abbreviation }: IAvatarProps) => {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      color="#fff"
      mx="0.25rem"
      bg="primary.blue"
      borderRadius="50%"
      height="35px"
      width="35px"
    >
      {abbreviation}
    </Flex>
  );
};

export default Avatar;
