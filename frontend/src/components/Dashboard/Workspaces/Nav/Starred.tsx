import { IWorkspace } from '../../../../interfaces';
import { Box, Tooltip, Flex } from '@chakra-ui/react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

interface IStarredProps {
  workspace: IWorkspace;
  handleUpdateStarred: () => void;
}

const Starred = ({ workspace, handleUpdateStarred }: IStarredProps) => {
  return (
    <Tooltip label={workspace.isStarred ? 'Unstar' : 'Star'}>
      <Flex
        flexDir="column"
        alignItems="center"
        justify="center"
        _hover={{ background: 'rgba(255, 255, 255, 0.5)' }}
        onClick={handleUpdateStarred}
        mx="0.5rem"
        cursor="pointer"
        height="35px"
        width="60px"
        borderRadius={8}
        fontSize="1.2rem"
      >
        {workspace.isStarred ? (
          <Box color="gold">
            <AiFillStar />
          </Box>
        ) : (
          <Box color="light.primary">
            <AiOutlineStar />
          </Box>
        )}
      </Flex>
    </Tooltip>
  );
};

export default Starred;
