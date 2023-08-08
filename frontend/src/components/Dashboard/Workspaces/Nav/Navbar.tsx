import { Box, Flex, Tooltip, useDisclosure } from '@chakra-ui/react';
import { IUserContext, IWorkspaceContext } from '../../../../interfaces';
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Starred from './Starred';
import TitleInput from './TitleInput';
import { useContext, useRef } from 'react';
import { WorkspaceContext } from '../../../../context/workspace';
import Visibility from './Visibility';
import DrawerMenu from './DrawerMenu';
import { UserContext } from '../../../../context/user';
import { Client } from '../../../../util/client';
import { slugify } from '../../../../util';

const Navbar = () => {
  const navigate = useNavigate();
  const { workspace, handleUpdateStarred, handleUpdateProperty } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext) as IUserContext;
  const menuBtnRef = useRef<HTMLDivElement>(null);

  const removeWorkspace = () => {
    Client.removeWorkspace(workspace.workspaceId, user.id)
      .then(() => {
        navigate(`/${slugify(user.firstName, user.lastName)}/dashboard`);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box bg="rgba(188, 188, 188, 0.6)" minH="50px" p="0.5rem">
      <Flex alignItems="center" justify="space-between">
        <Flex mx="0.5rem" alignItems="center">
          <TitleInput
            title={workspace.title}
            handleUpdateProperty={handleUpdateProperty}
          />
          <Starred workspace={workspace} handleUpdateStarred={handleUpdateStarred} />
          <Visibility />
        </Flex>
        <Flex>
          <Tooltip bg="red.500" label="Remove workspace" placement="top-end">
            <Box
              cursor="pointer"
              onClick={removeWorkspace}
              mr="1rem"
              color="light.primary"
            >
              <BsTrash />
            </Box>
          </Tooltip>

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
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
