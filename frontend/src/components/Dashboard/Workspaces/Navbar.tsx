import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { IWorkspace } from '../../../interfaces';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

interface INavbarProps {
  workspace: IWorkspace;
  handleUpdateStarred: () => void;
}

const Navbar = ({ workspace, handleUpdateStarred }: INavbarProps) => {
  const updateStarredWorkspace = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleUpdateStarred();
  };

  return (
    <Box bg="cover.primary" minH="50px" p="0.5rem">
      <Flex alignItems="center" justify="space-between">
        <Flex mx="0.5rem" alignItems="center">
          <Text color="light.primary" fontSize="1.2rem" fontWeight="bold">
            {workspace.title}
          </Text>
          <Tooltip label="Star">
            <Box
              onClick={handleUpdateStarred}
              mx="0.5rem"
              cursor="pointer"
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
            </Box>
          </Tooltip>
        </Flex>
        <Box>Menu</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
