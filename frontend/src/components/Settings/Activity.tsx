import { Box, Flex, Text, Heading, Select, Button } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsReverseLayoutTextSidebarReverse, BsBodyText } from 'react-icons/bs';
import { UserContext } from '../../context/user';
import { IActivity, IUserContext, IWorkspace } from '../../interfaces';
import { Client } from '../../util/client';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
const Activity = () => {
  const paginationState = { page: 0, pageSize: 10, direction: 'next', totalPages: 0 };
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [pagination, setPagination] = useState(paginationState);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(0);
  const [activities, setActivities] = useState<IActivity[]>([]);

  const getWorkspaces = () => {
    Client.fetchYourWorkspaces(user.id)
      .then((res) => {
        setWorkspaces(res.data.workspaces);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkspaceId(parseInt(e.target.value));
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getWorkspaces();
    }
  }, [shouldRun.current, user.id]);

  const getActivitiesByWorkspace = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getActivities(
      user.id,
      selectedWorkspaceId,
      pageNum,
      pagination.direction,
      pagination.pageSize
    )
      .then((res) => {
        const { activities, direction, page, pageSize, totalPages } = res.data.data;
        setPagination({ ...pagination, direction, page, pageSize, totalPages });
        if (paginate) {
          setActivities((prevState) => [...prevState, ...activities]);
        } else {
          setActivities(activities);
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (user.id !== 0) {
      getActivitiesByWorkspace(false);
    }
  }, [selectedWorkspaceId, user.id]);

  return (
    <Box minH="500px" className="settings-activity-container">
      <Flex my="1.5rem" alignItems="center">
        <Box color="black.primary" mr="0.5rem">
          <BsReverseLayoutTextSidebarReverse />
        </Box>
        <Heading color="black.primary" as="h3" fontSize="1.1rem">
          Workspaces
        </Heading>
      </Flex>
      <Box>
        <Select onChange={handleOnChange} width={['100%', '100%', '50%']}>
          <option value="0">all</option>
          {workspaces.map((workspace) => {
            return (
              <option key={workspace.workspaceId} value={workspace.workspaceId}>
                {workspace.title}
              </option>
            );
          })}
        </Select>
      </Box>
      <Box my="0.5rem" w="100%" minH="1px" bg="light.primary"></Box>
      <Flex my="1.5rem" alignItems="center">
        <Box color="black.primary" mr="0.5rem">
          <BsBodyText />
        </Box>
        <Heading color="black.primary" as="h3" fontSize="1.1rem">
          Activities
        </Heading>
      </Flex>
      <Box my="0.5rem" w="100%" minH="1px" bg="light.primary"></Box>
      <Box my="2rem">
        {activities.map((activity) => {
          return (
            <Flex my="1rem" key={activity.activityId} alignItems="center">
              <Text lineHeight="1.6" color="black.primary" fontSize="0.85rem">
                {activity.text}
              </Text>
              <Text fontSize="0.8rem" color="tetx.primary" ml="0.5rem">
                {dayjs(activity.createdAt).format('L LT')}
              </Text>
            </Flex>
          );
        })}
      </Box>
      {pagination.page < pagination.totalPages && (
        <Flex>
          <Button
            onClick={() => getActivitiesByWorkspace(true)}
            fontSize="1rem"
            color="black.primary"
            bg="transparent"
            _hover={{ bg: 'transparent' }}
          >
            See more Activity...
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Activity;
