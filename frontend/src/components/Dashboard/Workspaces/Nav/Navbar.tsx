import { Box, Flex, Tooltip, useDisclosure } from '@chakra-ui/react';
import { IWorkspaceContext } from '../../../../interfaces';
import { BsThreeDots } from 'react-icons/bs';
import Starred from './Starred';
import TitleInput from './TitleInput';
import { useContext, useRef } from 'react';
import { WorkspaceContext } from '../../../../context/workspace';
import Visibility from './Visibility';
import DrawerMenu from './DrawerMenu';

const Navbar = () => {
  const { workspace, handleUpdateStarred, handleUpdateProperty } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuBtnRef = useRef<HTMLDivElement>(null);

  return (
    <Box bg="rgba(255, 255, 255, 0.2)" minH="50px" p="0.5rem">
      <Flex alignItems="center" justify="space-between">
        <Flex mx="0.5rem" alignItems="center">
          <TitleInput
            title={workspace.title}
            handleUpdateProperty={handleUpdateProperty}
          />
          <Starred workspace={workspace} handleUpdateStarred={handleUpdateStarred} />
          <Visibility />
        </Flex>
        <Box>
          <Tooltip label="Menu" placement="top-end">
            <Box
              ref={menuBtnRef}
              onClick={onOpen}
              cursor="pointer"
              color="light.primary"
              fontSize="1.2rem"
            >
              <BsThreeDots />
            </Box>
          </Tooltip>
          <DrawerMenu isOpen={isOpen} menuBtnRef={menuBtnRef} onClose={onClose} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
