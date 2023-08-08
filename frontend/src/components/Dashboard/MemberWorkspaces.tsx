import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext, IWorkspace } from '../../interfaces';
import { Client } from '../../util/client';
import Preview from './Workspaces/Preview';
import { FiUsers } from 'react-icons/fi';

const MemberWorkspaces = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const shouldRun = useRef(true);

  const fetchMemberWorkspaces = (userId: number) => {
    Client.getMemberWorkspaces(userId)
      .then((res) => {
        setWorkspaces((prevState) => [...prevState, ...res.data.data]);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      fetchMemberWorkspaces(user.id);
    }
  }, [shouldRun.current, user.id]);

  return (
    <Box pt="10rem" ml={['1rem', '1rem', '10rem']}>
      <Flex color="light.primary">
        <Box mr="1rem" fontSize="1.5rem">
          <FiUsers />
        </Box>
        <Text fontWeight="bold">Member Workspaces</Text>
      </Flex>
      <Text mt="0.25rem" color="light.primary" fontSize="0.8rem">
        Member workspaces are read only
      </Text>
      <Flex flexWrap="wrap">
        {workspaces.map((workspace) => {
          return <Preview key={workspace.workspaceId} workspace={workspace} />;
        })}
      </Flex>
    </Box>
  );
};

export default MemberWorkspaces;
