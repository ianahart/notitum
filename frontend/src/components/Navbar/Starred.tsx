import { Box, Text } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import NavMenu from './NavMenu';

const Starred = () => {
  const [starredOpen, setStarredOpen] = useState(false);
  const starredRef = useRef<HTMLDivElement>(null);

  const handleStarredOpen = (open: boolean) => {
    setStarredOpen(open);
  };

  return (
    <Box>
      <NavMenu
        menuOpen={starredOpen}
        handleMenuOpen={handleStarredOpen}
        refEl={starredRef}
        title="Starred"
        minH="unset"
        top="30px"
      >
        <Text color="#fff">recent here</Text>
      </NavMenu>
    </Box>
  );
};

export default Starred;
