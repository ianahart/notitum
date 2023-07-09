import { Box, Text } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import NavMenu from './NavMenu';

const Recent = () => {
  const [recentOpen, setRecentOpen] = useState(false);
  const recentRef = useRef<HTMLDivElement>(null);

  const handleRecentOpen = (open: boolean) => {
    setRecentOpen(open);
  };

  return (
    <Box>
      <NavMenu
        menuOpen={recentOpen}
        handleMenuOpen={handleRecentOpen}
        refEl={recentRef}
        title="Recent"
        minH="unset"
        top="30px"
      >
        <Text color="#fff">recent here</Text>
      </NavMenu>
    </Box>
  );
};

export default Recent;
