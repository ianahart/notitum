import { Box, Flex } from '@chakra-ui/react';
import { IWorkspaceContext } from '../../../../interfaces';
import Starred from './Starred';
import TitleInput from './TitleInput';
import { useContext } from 'react';
import { WorkspaceContext } from '../../../../context/workspace';
import Visibility from './Visibility';

const Navbar = () => {
  const { workspace, handleUpdateStarred, handleUpdateProperty } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;

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
        <Box>Menu</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
