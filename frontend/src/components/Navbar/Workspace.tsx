import { Box, Text } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import NavMenu from './NavMenu';

const Workspace = () => {
  const [workspaceOpen, setWorkSpaceOpen] = useState(false);
  const workSpaceRef = useRef<HTMLDivElement>(null);

  const handleWorkSpaceOpen = (open: boolean) => {
    setWorkSpaceOpen(open);
  };

  return (
    <Box>
      <NavMenu
        menuOpen={workspaceOpen}
        handleMenuOpen={handleWorkSpaceOpen}
        refEl={workSpaceRef}
        title="Workspace"
        minH="unset"
        top="30px"
      >
        <Text color="#fff">workspace here</Text>
      </NavMenu>
    </Box>
  );
};

export default Workspace;
