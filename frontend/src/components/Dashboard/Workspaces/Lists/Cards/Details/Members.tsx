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
} from '@chakra-ui/react';
import CardButton from './CardButton';
import { AiOutlineUser } from 'react-icons/ai';
import { ICard, IUserContext } from '../../../../../../interfaces';
import { useState, useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import Avatar from '../../../../../Shared/Avatar';
import { UserContext } from '../../../../../../context/user';

interface IMembersProps {
  card: ICard;
  workspaceListId: number;
}

const Members = ({ card, workspaceListId }: IMembersProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const [query, setQuery] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = useCallback(
    debounce((value) => applySearch(value), 150),
    []
  );

  const applySearch = (searchTerm: string) => {
    console.log(searchTerm);
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
            <Box mt="1.5rem" mb="1rem">
              <Text my="0.5rem" color="light.primary" fontSize="0.8rem">
                Workspace members
              </Text>
              <Flex alignItems="center">
                <Avatar abbreviation={user.abbreviation} />

                <Text fontSize="0.9rem">
                  {user.firstName} {user.lastName}
                </Text>
              </Flex>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Members;
