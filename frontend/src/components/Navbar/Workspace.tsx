import { Box, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import NavMenu from './NavMenu';

interface IWorkspaceProps {
  updateMenu: (open: boolean, name?: string) => void;
  menu: { open: boolean; name: string };
}

const Workspace = ({ updateMenu, menu }: IWorkspaceProps) => {
  const workSpaceRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <NavMenu
        menu={menu}
        handleMenuOpen={updateMenu}
        refEl={workSpaceRef}
        menuRef={menuRef}
        title="Workspace"
        top="30px"
        minH="150px"
      >
        <Text color="#fff">workspace here</Text>
      </NavMenu>
    </Box>
  );
};

export default Workspace;
