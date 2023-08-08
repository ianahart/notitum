import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ICardButtonProps {
  title: string;
  icon: ReactNode;
  theme?: string;
}

const CardButton = ({ title, icon, theme = 'dark' }: ICardButtonProps) => {
  return (
    <Flex
      cursor="pointer"
      _hover={{ opacity: '0.8' }}
      my="0.5rem"
      p="0.5rem"
      bg={`${theme === 'dark' ? '#383636' : 'light.primary'}`}
      borderRadius={4}
      alignItems="center"
      color={`${theme === 'dark' ? 'light.primary' : 'bg.tertiary'}`}
    >
      <Box mr="0.5rem">{icon}</Box>
      <Text fontSize="0.9rem">{title}</Text>
    </Flex>
  );
};

export default CardButton;
