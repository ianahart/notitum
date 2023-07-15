import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IUserContext, IWorkspace } from '../../interfaces';
import { AiFillStar } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { slugify } from '../../util';

interface IWorkspacePreviewsProps {
  workspaces: IWorkspace[];
}

const WorkspacePreviews = ({ workspaces }: IWorkspacePreviewsProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;

  const goToWorkspace = (title: string, workspaceId: number) => {
    const path = `${slugify(user.firstName, user.lastName)}/${title}`;
    navigate(path, { state: { workspaceId, userId: user.id } });
    navigate(0);
  };

  return (
    <Flex className="overflow-scroll" flexDir="column" overflowY="auto" height="100px">
      {workspaces.map((workspace) => {
        return (
          <Flex
            key={workspace.workspaceId}
            onClick={() => goToWorkspace(workspace.title, workspace.workspaceId)}
            borderRadius={8}
            _hover={{ background: '#3d3d41' }}
            p="0.25rem"
            my="0.5rem"
            alignItems="center"
          >
            {workspace.isStarred && (
              <Box mr="0.25rem" color="gold">
                <AiFillStar />
              </Box>
            )}
            {workspace.background.startsWith('#') ? (
              <Box
                width="35px"
                height="35px"
                borderRadius={8}
                mr="0.25rem"
                bg={workspace.background}
              ></Box>
            ) : (
              <Image
                mr="0.25rem"
                width="35px"
                height="35px"
                borderRadius={8}
                src={workspace.background}
                alt="workspace background"
              />
            )}
            <Text fontSize="0.8rem" color="light.primary" wordBreak="break-all">
              {workspace.title}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default WorkspacePreviews;
