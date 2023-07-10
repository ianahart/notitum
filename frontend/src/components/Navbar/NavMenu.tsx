import { Box, Text, Flex } from '@chakra-ui/react';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import ClickAwayMenu from '../Shared/ClickAwayMenu';

interface INavMenuProps {
  minH: string;
  top: string;
  refEl: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  children: JSX.Element;
  handleMenuOpen: (open: boolean, name?: string) => void;
  title: string;

  menu: { open: boolean; name: string };
}

const NavMenu = ({
  minH,
  refEl,
  menuRef,
  top,
  menu,
  children,
  title,
  handleMenuOpen,
}: INavMenuProps) => {
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleMenuOpen(true, menu.name);
  };

  return (
    <Box>
      <Flex justify="space-evenly">
        <Flex
          onClick={handleOnClick}
          ref={refEl}
          position="relative"
          mx="1rem"
          my={['1rem', '1rem', '0']}
          cursor="pointer"
          alignItems="center"
          justify="space-between"
        >
          <Text color="#fff">{title}</Text>
          <Box display={['none', 'none', 'block']} ml="0.5rem" color="#fff">
            <BsChevronDown />
          </Box>
          <Box display={['block', 'block', 'none']} ml="0.5rem" color="#fff">
            <BsChevronRight />
          </Box>

          {menu.open && (
            <ClickAwayMenu
              menuName={menu.name}
              menuRef={menuRef}
              triggerRef={refEl}
              minH={minH}
              top={top}
              handleMenuOpen={handleMenuOpen}
            >
              <Box p="1rem">{children}</Box>
            </ClickAwayMenu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavMenu;
