import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ICardButtonProps {
  title: string;
  icon: ReactNode;
}

const CardButton = ({ title, icon }: ICardButtonProps) => {
  return (
    <Flex
      cursor="pointer"
      _hover={{ opacity: '0.8' }}
      my="0.5rem"
      p="0.5rem"
      bg="#383636"
      borderRadius={4}
      alignItems="center"
      color="light.primary"
    >
      <Box mr="0.5rem">{icon}</Box>
      <Text fontSize="0.9rem">{title}</Text>
    </Flex>
  );
};

export default CardButton;
