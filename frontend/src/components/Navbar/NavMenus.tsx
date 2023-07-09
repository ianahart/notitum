import { Box, Text, Flex } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { useRef, useState } from 'react';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import NavMenu from './NavMenu';
import Workspace from './Workspace';
import Recent from './Recent';
import Starred from './Starred';
const NavMenus = () => {
  return (
    <Box>
      <Flex justify="space-evenly">
        <Workspace />
        <Recent />
        <Starred />
      </Flex>
    </Box>
  );
};

export default NavMenus;
