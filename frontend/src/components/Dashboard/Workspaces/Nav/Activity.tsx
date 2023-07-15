import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Client } from '../../../../util/client';
import { UserContext } from '../../../../context/user';
import {
  IActivity,
  IPagination,
  IUserContext,
  IWorkspaceContext,
} from '../../../../interfaces';
import { WorkspaceContext } from '../../../../context/workspace';
import BasicSpinner from '../../../Shared/BasicSpinner';
import { AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
// @ts-ignore
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

const Activity = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 3,
    direction: 'next',
    page: 0,
    totalPages: 0,
  });
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getActivities(false, 'next');
    }
  }, [shouldRun.current, user.id]);

  const getActivities = (paginate: boolean, direction: string) => {
    const pageNum = paginate ? pagination.page : -1;
    setIsLoading(true);
    Client.getActivities(
      user.id,
      workspace.workspaceId,
      pageNum,
      direction,
      pagination.pageSize
    )
      .then((res) => {
        const { activities, direction, pageSize, page, totalPages } = res.data.data;
        setPagination({ ...pagination, direction, pageSize, page, totalPages });
        if (paginate) {
          setActivities((prevState) => [...prevState, ...activities]);
        } else {
          setActivities(activities);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnRemoveActivity = (activityId: number) => {
    Client.removeActivity(activityId)
      .then(() => {
        setActivities((prevState) =>
          prevState.filter((activity) => activity.activityId !== activityId)
        );
        setPagination({ pageSize: 3, direction: 'next', page: 0, totalPages: 0 });
        getActivities(false, 'next');
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      {isLoading && (
        <Flex mt="5rem" justify="center">
          <BasicSpinner />
        </Flex>
      )}

      <Flex justifyContent="center" alignItems="center" flexDir="column">
        {activities.map(({ activityId, createdAt, text }) => {
          return (
            <Box key={activityId}>
              <Flex my="0.5rem" alignItems="center">
                <Flex mr="0.25rem" flexDir="column">
                  <Box color="light.primary">
                    <AiOutlineStar />
                  </Box>
                  <Box
                    onClick={() => handleOnRemoveActivity(activityId)}
                    cursor="pointer"
                    color="black.secondary"
                  >
                    <AiOutlineClose />
                  </Box>
                </Flex>
                <Text color="light.primary" fontSize="0.85rem">
                  {text}
                </Text>
              </Flex>
              <Text fontSize="0.8rem" color="text.primary">
                {' '}
                {dayjs(createdAt).format('L LT')}
              </Text>
            </Box>
          );
        })}
      </Flex>
      {pagination.page < pagination.totalPages && (
        <Flex justify="center" my="2rem">
          <Button onClick={() => getActivities(true, 'next')} colorScheme="ghost">
            See more...
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Activity;
