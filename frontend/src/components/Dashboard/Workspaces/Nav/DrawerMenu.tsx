import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  Box,
  DrawerFooter,
  DrawerHeader,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { WorkspaceContext } from '../../../../context/workspace';
import { IWorkspaceContext, IWorkspaceMenus } from '../../../../interfaces';
import { CiViewList } from 'react-icons/ci';
import { BsChevronLeft } from 'react-icons/bs';
import DrawerMenuItem from './DrawerMenuItem';
import AboutWorkspace from './AboutWorkspace';
import { workspaceMenuState } from '../../../../state/initialState';
import ChangeBackground from './ChangeBackground';
import Activity from './Activity';
import { AiOutlineUnorderedList } from 'react-icons/ai';

interface IDrawerMenuProps {
  isOpen: boolean;
  menuBtnRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const DrawerMenu = ({ isOpen, onClose, menuBtnRef }: IDrawerMenuProps) => {
  const [workspaceMenu, setWorkspaceMenu] = useState<IWorkspaceMenus>(workspaceMenuState);
  const [menuTitle, setMenuTitle] = useState('Menu');
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;

  const background = !workspaceMenu.activity.open && !workspaceMenu.description.open;
  const description = !workspaceMenu.activity.open && !workspaceMenu.background.open;
  const activity = !workspaceMenu.background.open && !workspaceMenu.description.open;

  const updateWorkspaceMenu = (name: string, open: boolean) => {
    preformUpdate(name, open);
    setMenuTitle(name.slice(0, 1).toUpperCase() + name.slice(1));
  };

  const preformUpdate = (name: string, open: boolean) => {
    setWorkspaceMenu((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IWorkspaceMenus], open },
    }));
  };

  useEffect(() => {
    preformUpdate('menu', true);
  }, []);

  const resetMenuState = () => {
    for (const [key, _] of Object.entries(workspaceMenu)) {
      updateWorkspaceMenu(key, false);
    }
    setMenuTitle('Menu');
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={menuBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="black.primary">
          <Box>
            <DrawerCloseButton
              _hover={{ background: 'rgba(255, 255, 255, 0.2)' }}
              color="light.primary"
            />
          </Box>
          <DrawerHeader textAlign="center" color="light.primary">
            {menuTitle !== 'Menu' && (
              <Box cursor="pointer" onClick={resetMenuState}>
                <BsChevronLeft />
              </Box>
            )}
            <Text>{menuTitle}</Text>
          </DrawerHeader>
          <Box borderBottom="1px solid" borderColor="border.primary"></Box>

          <DrawerBody>
            <Box>
              <Box onClick={() => updateWorkspaceMenu('description', true)}>
                {!workspaceMenu.description.open && description && (
                  <DrawerMenuItem>
                    <>
                      <Box mr="0.5rem" color="light.primary">
                        <CiViewList />
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="0.8rem" color="light.primary">
                          About this workspace
                        </Text>
                        <Text color="light.primary" fontSize="0.85rem">
                          {!workspace.description
                            ? 'Add a description to your workspace'
                            : 'Edit your workspace description'}
                        </Text>
                      </Box>
                    </>
                  </DrawerMenuItem>
                )}
                {workspaceMenu.description.open && description && <AboutWorkspace />}
              </Box>
              <Box onClick={() => updateWorkspaceMenu('background', true)}>
                {!workspaceMenu.background.open && background && (
                  <DrawerMenuItem>
                    <Flex alignItems="center">
                      {workspace.background.startsWith('#') ? (
                        <Box
                          bg={workspace.background}
                          mr="0.25rem"
                          width="25px"
                          height="25px"
                          borderRadius={8}
                        ></Box>
                      ) : (
                        <Image
                          mr="0.25rem"
                          width="25px"
                          height="25px"
                          borderRadius={8}
                          src={workspace.background}
                          alt="a background image of the workspace"
                        />
                      )}
                      <Text fontWeight="bold" fontSize="0.8rem" color="light.primary">
                        Change Background
                      </Text>
                    </Flex>
                  </DrawerMenuItem>
                )}
                {workspaceMenu.background.open && background && <ChangeBackground />}
              </Box>

              <Box onClick={() => updateWorkspaceMenu('activity', true)}>
                {!workspaceMenu.activity.open && activity && (
                  <DrawerMenuItem>
                    <>
                      <Box mr="0.5rem" color="light.primary">
                        <AiOutlineUnorderedList />
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="0.8rem" color="light.primary">
                          {workspaceMenu.activity.value}
                        </Text>
                        <Text color="light.primary" fontSize="0.85rem">
                          Keep track of your changes
                        </Text>
                      </Box>
                    </>
                  </DrawerMenuItem>
                )}
                {workspaceMenu.activity.open && activity && <Activity />}
              </Box>
            </Box>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
