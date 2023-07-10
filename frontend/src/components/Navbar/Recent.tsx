import { Box, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import NavMenu from './NavMenu';

interface IRecentProps {
  updateMenu: (open: boolean, name?: string) => void;
  menu: { open: boolean; name: string };
}

const Recent = ({ menu, updateMenu }: IRecentProps) => {
  const recentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <NavMenu
        menu={menu}
        menuRef={menuRef}
        handleMenuOpen={updateMenu}
        refEl={recentRef}
        title="Recent"
        minH="150px"
        top="30px"
      >
        <Text color="#fff">recent here</Text>
      </NavMenu>
    </Box>
  );
};

export default Recent;
