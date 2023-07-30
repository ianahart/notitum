import {
  Flex,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IMember, IPagination, IWorkspaceContext } from '../../../../../../interfaces';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { Client } from '../../../../../../util/client';
import Avatar from '../../../../../Shared/Avatar';
import { abbreviate } from '../../../../../../util';

interface IChecklistItemMembersProps {
  addMemberToChecklistItem: (id: number, firstName: string, lastName: string) => void;
}

const ChecklistItemMembers = ({
  addMemberToChecklistItem,
}: IChecklistItemMembersProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const paginationState = { page: 0, direction: 'next', pageSize: 1, totalPages: 0 };
  const [pagination, setPagination] = useState<IPagination>(paginationState);
  const [members, setMembers] = useState<IMember[]>([]);
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current && workspace.workspaceId !== 0) {
      shouldRun.current = false;
      getMembers(false);
    }
  }, [shouldRun.current, workspace.workspaceId]);

  const getMembers = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getMembers(
      workspace.workspaceId,
      pageNum,
      pagination.direction,
      pagination.pageSize
    )
      .then((res) => {
        const { direction, page, pageSize, totalPages, members } = res.data.data;
        setMembers((prevState) => [...prevState, ...members]);
        setPagination({ ...pagination, direction, page, pageSize, totalPages });
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleAddMemberToChecklistItem = (
    id: number,
    firstName: string,
    lastName: string
  ) => {
    addMemberToChecklistItem(id, firstName, lastName);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Flex alignItems="center">
          <Box>
            <AiOutlineUserAdd />
          </Box>
          <Button
            px="0"
            _hover={{ bg: 'transparent' }}
            bg="transparent"
            color="light.primary"
            fontSize="0.85rem"
          >
            Assign
          </Button>
        </Flex>
      </PopoverTrigger>
      <PopoverContent borderColor="black.tertiary" bg="black.tertiary">
        <PopoverCloseButton />
        <PopoverHeader fontSize="0.9rem" borderColor="black.tertiary" textAlign="center">
          Assign a member
        </PopoverHeader>
        <PopoverBody>
          {members.map(({ id, firstName, lastName }) => {
            return (
              <Flex
                onClick={() => handleAddMemberToChecklistItem(id, firstName, lastName)}
                p="0.25rem"
                borderRadius={4}
                key={id}
                alignItems="center"
                cursor="pointer"
                _hover={{ background: 'black.primary' }}
              >
                <Avatar key={id} abbreviation={abbreviate(firstName, lastName)} />
                <Text ml="0.5rem" color="light.primary" fontSize="0.85rem">
                  {firstName} {lastName}
                </Text>
              </Flex>
            );
          })}
          {pagination.page < pagination.totalPages && (
            <Flex justifyContent="center">
              <Button
                onClick={() => getMembers(true)}
                color="light.primary"
                fontSize="0.85rem"
                bg="transparent"
                _hover={{ background: 'transparent' }}
              >
                See more...
              </Button>
            </Flex>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ChecklistItemMembers;
