import { Box, Button, Flex, Text } from '@chakra-ui/react';
import CardPopover from './CardPopover';
import { BsThreeDots, BsFilter } from 'react-icons/bs';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { cardDateState, cardSortState, filterCardState } from '../../state/initialState';
import BasicSpinner from '../Shared/BasicSpinner';
import {
  ICardFilter,
  ICardSort,
  IUserContext,
  IWorkspaceWithCards,
} from '../../interfaces';
import CardSearch from './CardSearch';
import { UserContext } from '../../context/user';
import { Client } from '../../util/client';
import WorkspaceWithCard from './WorkspaceWithCard';

const Cards = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [sorting, setSorting] = useState<ICardSort[]>(cardSortState);
  const [workspaceFiltering, setWorkspaceFiltering] =
    useState<ICardFilter[]>(filterCardState);
  const [dateFiltering, setDateFiltering] = useState<ICardFilter[]>(cardDateState);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(0);
  const [workspaceWithCards, setWorkspaceWithCards] = useState<IWorkspaceWithCards[]>([]);
  const [loading, setLoading] = useState(false);

  const syncSingleWorkspaces = () => {
    Client.fetchYourWorkspaces(user.id).then((res) => {
      const updatedWorkspaceFiltering = workspaceFiltering.map((wf) => {
        if (wf.value === 'workspace') {
          wf.workspaces = [...res.data.workspaces];
        }
        return wf;
      });
      setWorkspaceFiltering(updatedWorkspaceFiltering);
    });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      syncSingleWorkspaces();
    }
  }, [user.id, shouldRun.current]);

  const filterSort = (data: ICardSort[] | ICardFilter[]) => {
    const [checkedSort] = data.filter((sort) => sort.checked);
    return checkedSort;
  };

  const selectedSort = useMemo(() => filterSort(sorting), [sorting]);
  const selectedWorkspaceFilter = useMemo(
    () => filterSort(workspaceFiltering),
    [workspaceFiltering]
  );
  const selectedDateFilter = useMemo(() => filterSort(dateFiltering), [dateFiltering]);

  const filterDates = (id: number) => {
    const updateFilterDates = dateFiltering.map((df) => {
      df.checked = df.id === id ? true : false;
      return df;
    });
    setDateFiltering(updateFilterDates);
  };

  const sortCards = (sortId: number) => {
    const updatedSorting = sorting.map((sort) => {
      sort.checked = sort.id === sortId ? true : false;
      return sort;
    });
    setSorting(updatedSorting);
  };

  const filterWorkspaces = (id: number) => {
    const updatedFilteringWorkspaces = workspaceFiltering.map((filter) => {
      filter.checked = filter.id === id ? true : false;
      return filter;
    });
    setWorkspaceFiltering(updatedFilteringWorkspaces);
  };

  const handleOnClick = (action: string, id: number) => {
    switch (action) {
      case 'sort':
        sortCards(id);
        break;
      case 'workspace':
        filterWorkspaces(id);
        break;
      case 'workspaces':
        setActiveWorkspaceId(0);
        filterWorkspaces(id);
        break;
      case 'allCards':
        filterDates(id);
        break;
      default:
        break;
    }
  };

  const handleSetActiveWorkspaceId = (id: number) => {
    setActiveWorkspaceId(id);
  };

  const filterCards = () => {
    setLoading(true);
    Client.filterCards(
      user.id,
      selectedSort.value,
      selectedWorkspaceFilter.value,
      selectedDateFilter.value,
      activeWorkspaceId
    )
      .then((res) => {
        setWorkspaceWithCards(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <Flex flexDir={['column', 'column', 'row']} justifyContent="space-evenly">
        <CardPopover header={selectedSort.header} icon={<BsThreeDots />}>
          <Box>
            <CardSearch handleOnClick={handleOnClick} action="sort" data={sorting} />
          </Box>
        </CardPopover>
        <CardPopover header={selectedWorkspaceFilter.header} icon={<BsFilter />}>
          <Box>
            <CardSearch
              handleOnClick={handleOnClick}
              action="workspace"
              data={workspaceFiltering}
              handleSetActiveWorkspaceId={handleSetActiveWorkspaceId}
              activeWorkspaceId={activeWorkspaceId}
            />
          </Box>
        </CardPopover>
        <CardPopover header={selectedDateFilter.header} icon={<BsFilter />}>
          <Box>
            <CardSearch
              handleOnClick={handleOnClick}
              action="sort"
              data={dateFiltering}
            />
          </Box>
        </CardPopover>
      </Flex>
      {loading && (
        <Flex my="2rem" justify="center">
          <BasicSpinner />
        </Flex>
      )}
      <Flex justify="center" my="2rem">
        <Button onClick={filterCards} colorScheme="blue" width="250px">
          Filter
        </Button>
      </Flex>
      {workspaceWithCards.length === 0 && (
        <Flex
          align="center"
          justify="center"
          flexDir="column"
          my="2rem"
          bg="light.primary"
          p="0.25rem"
          minH="150px"
          width="100%"
        >
          <Text color="black.primary" fontSize="0.85rem">
            Use the filters above to show cards from workspaces
          </Text>
        </Flex>
      )}
      <Box minH="500px">
        {workspaceWithCards.map((workspaceWithCard) => {
          return (
            <WorkspaceWithCard
              key={workspaceWithCard.id}
              workspaceWithCard={workspaceWithCard}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Cards;
