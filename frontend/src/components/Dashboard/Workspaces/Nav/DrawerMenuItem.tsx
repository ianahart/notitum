import { Flex } from '@chakra-ui/react';

interface IDrawerMenuItemProps {
  children?: JSX.Element;
}

const DrawerMenuItem = ({ children }: IDrawerMenuItemProps) => {
  return (
    <Flex
      borderRadius={8}
      padding="0.25rem"
      cursor="pointer"
      _hover={{ background: '#4b4b4d' }}
      mt="1rem"
    >
      {children}
    </Flex>
  );
};

export default DrawerMenuItem;
