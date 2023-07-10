import { Box, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import NavMenu from './NavMenu';

interface IStarredProps {
  updateMenu: (open: boolean, name?: string) => void;
  menu: { open: boolean; name: string };
}

const Starred = ({ updateMenu, menu }: IStarredProps) => {
  const starredRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <NavMenu
        menuRef={menuRef}
        menu={menu}
        handleMenuOpen={updateMenu}
        refEl={starredRef}
        title="Starred"
        minH="150px"
        top="30px"
      >
        <Text color="#fff">recent here</Text>
      </NavMenu>
    </Box>
  );
};

export default Starred;
