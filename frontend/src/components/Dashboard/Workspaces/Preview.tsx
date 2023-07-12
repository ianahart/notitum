import { Box, Flex, Text } from '@chakra-ui/react';
import { IUserContext, IWorkspace } from '../../../interfaces';
import { useNavigate } from 'react-router-dom';
import { slugifyTitle, slugify } from '../../../util';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/user';

interface IPreviewProps {
  workspace: IWorkspace;
}

const Preview = ({ workspace }: IPreviewProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const [isOverlay, setIsOverlay] = useState(false);

  const backgroundImage = !workspace.background.startsWith('#')
    ? workspace.background
    : 'unset';

  const handleOnClick = () => {
    navigate(
      `/${slugify(user.firstName, user.lastName)}/${slugifyTitle(workspace.title)}`,
      { state: { workspaceId: workspace.workspaceId, userId: workspace.userId } }
    );
  };

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOverlay(true);
  };

  const handleOnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOverlay(false);
  };

  return (
    <Flex
      m="1rem"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClick}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bg={workspace.background.startsWith('#') ? workspace.background : 'unset'}
      width="150px"
      backgroundImage={`url(${backgroundImage})`}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius={8}
      cursor="pointer"
      minHeight="80px"
      wordBreak="break-all"
    >
      {isOverlay && (
        <Box
          background="cover.primary"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius={8}
        ></Box>
      )}
      <Box position="absolute" zIndex={3}>
        <Text
          wordBreak="break-all"
          color="#fff"
          textShadow="2px 2px 2px #0A0403"
          fontSize="0.85rem"
        >
          {workspace.title}
        </Text>
      </Box>
    </Flex>
  );
};

export default Preview;
