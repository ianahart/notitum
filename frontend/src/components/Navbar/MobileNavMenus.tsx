import { Box, Text, Flex } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { useRef, useState } from 'react';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import NavMenus from './NavMenus';

interface IMobileNavMenusProps {
  styles: { flexDirection: string; alignItems: string; display: string };
}

const MobileNavMenus = ({ styles }: IMobileNavMenusProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMobileNavOpen = (open: boolean) => {
    setMobileNavOpen(open);
  };

  return (
    <Box>
      <Flex
        ref={triggerRef}
        color="#fff"
        cursor="pointer"
        alignItems="center"
        onClick={() => setMobileNavOpen(true)}
      >
        <Text>More</Text>
        <Box ml="0.5rem">
          <BsChevronDown />
        </Box>
        {mobileNavOpen && (
          <ClickAwayMenu
            top="40px"
            left={['10px', '40px', '40px']}
            triggerRef={triggerRef}
            menuRef={menuRef}
            handleMenuOpen={handleMobileNavOpen}
          >
            <NavMenus styles={styles} />
          </ClickAwayMenu>
        )}
      </Flex>
    </Box>
  );
};

export default MobileNavMenus;
