import { Box, Input, FormControl, Text, Flex, Button } from '@chakra-ui/react';
import { useState, useCallback, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { AiOutlineSearch } from 'react-icons/ai';
import ClickAwayMenu from './ClickAwayMenu';
import { Client } from '../../util/client';
import { ISearchWorkspace, IUserContext, IWorkspaceContext } from '../../interfaces';
import { UserContext } from '../../context/user';
import { slugify, slugifyTitle } from '../../util';
import { WorkspaceContext } from '../../context/workspace';
const SearchBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const { setWorkspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const paginationState = { pageSize: 2, page: 0, direction: 'next', totalPages: 0 };
  const [pagination, setPagination] = useState(paginationState);
  const [results, setResults] = useState<ISearchWorkspace[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [iconShowing, setIconShowing] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownOpen = (open: boolean) => {
    setDropdownOpen(open);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
    if (value.trim().length >= 1) {
      setIconShowing(false);
      handleDropdownOpen(true);
      return;
    }
    handleDropdownOpen(false);
    setIconShowing(true);
  };

  const debouncedSearch = useCallback(
    debounce((value) => applySearch(value, false), 300),
    []
  );

  const applySearch = (query: string, paginate: boolean) => {
    setError('');
    const pageNum = paginate ? pagination.page : -1;
    Client.searchWorkspaces(
      query,
      pagination.pageSize,
      pageNum,
      pagination.direction,
      user.id
    )
      .then((res) => {
        const { direction, page, pageSize, totalPages, workspaces } = res.data.data;
        if (workspaces.length === 0 && !paginate) {
          setError('No matching workspaces');
        }
        setPagination({ ...pagination, direction, page, pageSize, totalPages });
        paginate
          ? setResults((prevState) => [...prevState, ...workspaces])
          : setResults(workspaces);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const goToWorkspace = (workspaceId: number, title: string, userId: number) => {
    const selectedWorkspace = results.find((w) => w.workspaceId === workspaceId);
    if (!selectedWorkspace) return;
    Client.getWorkspace(selectedWorkspace?.workspaceId, selectedWorkspace?.userId)
      .then((res) => {
        setWorkspace(res.data.workspace);
        navigate(`/${slugify(user.firstName, user.lastName)}/${slugifyTitle(title)}`, {
          state: { workspaceId: res.data.workspace.workspaceId, userId },
        });
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <form style={{ position: 'relative' }}>
      <FormControl position="relative">
        <Input
          autoComplete="off"
          onChange={handleOnChange}
          value={query}
          width="260px"
          type="text"
          fontSize="0.85rem"
          color="light.primary"
          placeholder="Search"
          _placeholder={{
            color: 'light.primary',
            fontSize: '0.85rem',
            paddingLeft: '0.25rem',
          }}
        />
        {iconShowing && (
          <Box color="light.primary" position="absolute" top="13px" left="2px">
            <AiOutlineSearch />
          </Box>
        )}
      </FormControl>
      {dropdownOpen && (
        <ClickAwayMenu
          menuName=""
          menuRef={menuRef}
          triggerRef={triggerRef}
          minH="100%"
          top="40px"
          width="260px"
          left={['0', '0', '0']}
          handleMenuOpen={handleDropdownOpen}
        >
          <Box p="0.25rem">
            <Text color="light.primary" fontSize="0.7rem" fontWeight="bold">
              Search Results
            </Text>
            <Box className="overflow-scroll" overflowY="auto" height="100px">
              {results.map(({ workspaceId, title, background, userId }) => {
                return (
                  <Flex
                    onClick={() => goToWorkspace(workspaceId, title, userId)}
                    cursor="pointer"
                    alignItems="center"
                    _hover={{ background: 'black.tertiary' }}
                    my="0.5rem"
                    key={workspaceId}
                  >
                    <Box
                      bg={background.startsWith('#') ? background : 'unset'}
                      backgroundPosition="center"
                      backgroundSize="cover"
                      borderRadius={8}
                      backgroundImage={`url(${
                        !background.startsWith('#') ? background : 'unset'
                      })`}
                      height="25px"
                      width="25px"
                      mr="0.5rem"
                    ></Box>
                    <Text fontWeight="bold" fontSize="0.7rem" color="light.primary">
                      {title}
                    </Text>
                  </Flex>
                );
              })}
              {error.length > 0 && (
                <Text fontSize="0.7rem" color="light.primary">
                  {error}
                </Text>
              )}
              {pagination.page < pagination.totalPages && (
                <Flex>
                  <Button
                    onClick={() => applySearch(query, true)}
                    colorScheme="ghost"
                    _hover={{ background: 'transparent' }}
                    fontSize="0.8rem"
                  >
                    More results
                  </Button>
                </Flex>
              )}
            </Box>
          </Box>
        </ClickAwayMenu>
      )}
    </form>
  );
};

export default SearchBar;
