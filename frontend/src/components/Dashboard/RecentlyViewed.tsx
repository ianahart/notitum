import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { UserContext } from '../../context/user';
import { IUserContext, IWorkspace } from '../../interfaces';
import { Client } from '../../util/client';
import Preview from './Workspaces/Preview';

const RecentlyViewed = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const shouldRun = useRef(true);

  const fetchRecentlyViewedWorkspaces = (userId: number) => {
    Client.getRecentlyViewedWorkspaces(userId)
      .then((res) => {
        setWorkspaces((prevState) => [...prevState, ...res.data.workspaces]);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      fetchRecentlyViewedWorkspaces(user.id);
    }
  }, [shouldRun.current, user.id]);

  return (
    <Box pt="10rem" ml={['1rem', '1rem', '10rem']}>
      <Flex color="light.primary">
        <Box mr="1rem" fontSize="1.5rem">
          <AiOutlineClockCircle />
        </Box>
        <Text fontWeight="bold">Recently Viewed</Text>
      </Flex>
      <Flex flexWrap="wrap">
        {workspaces.map((workspace) => {
          return <Preview key={workspace.workspaceId} workspace={workspace} />;
        })}
      </Flex>
    </Box>
  );
};

export default RecentlyViewed;
