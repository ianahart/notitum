import { Box, Text, Flex } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { useRef, useState } from 'react';
import ClickAwayMenu from '../Shared/ClickAwayMenu';

interface INavMenuProps {
  minH: string;
  top: string;
  refEl: React.RefObject<HTMLDivElement>;
  children: JSX.Element;
  handleMenuOpen: (open: boolean) => void;
  menuOpen: boolean;
  title: string;
}

const NavMenu = ({
  minH,
  refEl,
  top,
  children,
  title,
  handleMenuOpen,
  menuOpen,
}: INavMenuProps) => {
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleMenuOpen(true);
  };

  return (
    <Box>
      <Flex justify="space-evenly">
        <Flex
          onClick={handleOnClick}
          ref={refEl}
          position="relative"
          mx="1rem"
          cursor="pointer"
          alignItems="center"
          justify="space-between"
        >
          <Text color="#fff">{title}</Text>
          <Box ml="0.5rem" color="#fff">
            <BsChevronDown />
          </Box>
          {menuOpen && (
            <ClickAwayMenu
              triggerRef={refEl}
              minH={minH}
              top={top}
              handleMenuOpen={handleMenuOpen}
            >
              {children}
            </ClickAwayMenu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavMenu;
