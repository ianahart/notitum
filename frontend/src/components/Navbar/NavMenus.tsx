import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Workspace from './Workspace';
import Recent from './Recent';
import Starred from './Starred';
import { navMenusState } from '../../state/initialState';
import { INavMenus } from '../../interfaces';

interface INavMenusProps {
  styles: any;
}

const NavMenus = ({ styles }: INavMenusProps) => {
  const [menus, setMenus] = useState(navMenusState);

  const updateKeyProp = (open: boolean, name: string) => {
    setMenus((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof INavMenus], open },
    }));
  };

  const updateMenu = (open: boolean, name?: string) => {
    if (!name) return;
    closeNonActiveMenus(name);

    updateKeyProp(open, name);
  };

  const closeNonActiveMenus = (name: string) => {
    for (const [key, _] of Object.entries(menus)) {
      if (key !== name) {
        updateKeyProp(false, key);
      }
    }
  };

  return (
    <Box>
      <Flex style={styles}>
        <Workspace menu={menus.workspace} updateMenu={updateMenu} />
        <Recent menu={menus.recent} updateMenu={updateMenu} />
        <Starred menu={menus.starred} updateMenu={updateMenu} />
      </Flex>
    </Box>
  );
};

export default NavMenus;
