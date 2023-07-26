import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Input,
  PopoverCloseButton,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import CardButton from './CardButton';
import { AiOutlineUser } from 'react-icons/ai';
import { IMember, IUserContext, IWorkspaceContext } from '../../../../../../interfaces';
import { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import Avatar from '../../../../../Shared/Avatar';
import { UserContext } from '../../../../../../context/user';
import { Client } from '../../../../../../util/client';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { abbreviate } from '../../../../../../util';
import AddMember from './AddMember';

const Members = () => {
  const paginationState = { pageSize: 2, page: 0, direction: 'next', totalPages: 0 };
  const { user } = useContext(UserContext) as IUserContext;
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState(paginationState);
  const [members, setMembers] = useState<IMember[]>([]);
  const [searchResults, setSearchResults] = useState<IMember[]>([]);
  const [query, setQuery] = useState('');
  const shouldRun = useRef(true);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = useCallback(
    debounce((value) => applySearch(value), 150),
    []
  );

  const applySearch = (query: string) => {
    setError('');
    Client.searchMembers(query, workspace.workspaceId)
      .then((res) => {
        if (res.data.data.length === 0) {
          setError('Member(s) not found');
        }
        setSearchResults(res.data.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getMembers(false);
    }
  }, [shouldRun.current]);

  const getMembers = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getMembers(
      workspace.workspaceId,
      pageNum,
      pagination.direction,
      pagination.pageSize
    )
      .then((res) => {
        const { members, page, direction, pageSize, totalPages } = res.data.data;
        setMembers((prevState) => [...prevState, ...members]);
        setPagination({ ...pagination, page, direction, pageSize, totalPages });
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const addMember = (member: IMember) => {
    setMembers((prevState) => [...prevState, member]);
  };

  return (
    <Box position="relative">
      <Popover>
        <PopoverTrigger>
          <Box>
            <CardButton title="Members" icon={<AiOutlineUser />} />
          </Box>
        </PopoverTrigger>
        <PopoverContent borderColor="black.tertiary" bg="black.tertiary">
          <PopoverCloseButton />
          <PopoverHeader borderColor="black.tertiary" textAlign="center">
            Members
          </PopoverHeader>
          <PopoverBody>
            <Input
              onChange={handleOnChange}
              value={query}
              type="text"
              borderColor="black.primary"
              placeholder="Search members"
              fontSize="0.8rem"
              _placeholder={{ color: 'light.primary', fontSize: '0.8rem' }}
              color="light.primary"
            />
            {error.length > 0 && (
              <Text
                mt="0.25rem"
                textAlign="center"
                fontSize="0.8rem"
                color="light.primary"
              >
                {error}
              </Text>
            )}
            {searchResults.length > 0 && (
              <Box height="80px" className="overflow-scroll" overflowY="auto">
                {searchResults.map(({ id, firstName, lastName }) => {
                  return (
                    <Flex key={id} my="0.25rem" alignItems="center">
                      <Avatar abbreviation={abbreviate(firstName, lastName)} />

                      <Text fontSize="0.9rem">
                        {firstName} {lastName}
                      </Text>
                    </Flex>
                  );
                })}
              </Box>
            )}
            {query.length === 0 && (
              <>
                <Box mt="1.5rem" mb="1rem">
                  <Text my="0.5rem" color="light.primary" fontSize="0.8rem">
                    Workspace members
                  </Text>
                  {workspace.userId === user.id && (
                    <Flex alignItems="center">
                      <Avatar abbreviation={user.abbreviation} />

                      <Text fontSize="0.9rem">
                        {user.firstName} {user.lastName}
                      </Text>
                    </Flex>
                  )}
                </Box>
                <Box height="80px" className="overflow-scroll" overflowY="auto">
                  {members.map(({ id, firstName, lastName }) => {
                    return (
                      <Flex key={id} my="0.25rem" alignItems="center">
                        <Avatar abbreviation={abbreviate(firstName, lastName)} />

                        <Text fontSize="0.9rem">
                          {firstName} {lastName}
                        </Text>
                      </Flex>
                    );
                  })}
                  {pagination.page < pagination.totalPages &&
                    pagination.totalPages !== 0 && (
                      <Flex justify="center">
                        <Button
                          onClick={() => getMembers(true)}
                          color="light.primary"
                          _hover={{ background: 'transparent' }}
                          fontSize="0.8rem"
                          variant="ghost"
                        >
                          See more...
                        </Button>
                      </Flex>
                    )}
                </Box>
                <AddMember addMember={addMember} />
              </>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Members;
