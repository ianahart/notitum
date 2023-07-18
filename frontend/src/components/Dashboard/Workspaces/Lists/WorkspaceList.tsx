import { Box, Text, Flex, Input, FormControl } from '@chakra-ui/react';
import { IList, IWorkspaceContext } from '../../../../interfaces';
import { BsThreeDots } from 'react-icons/bs';
import { useContext, useEffect, useRef, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { RiDraggable } from 'react-icons/ri';
import { Client } from '../../../../util/client';
import { WorkspaceContext } from '../../../../context/workspace';

interface IWorkspaceListProps {
  list: IList;
  provided: DraggableProvided;
}

const WorkspaceList = ({ list, provided }: IWorkspaceListProps) => {
  const { updateWorkspaceList, workspace } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const [listTitle, setListTitle] = useState('');
  const [inputShowing, setInputShowing] = useState(false);
  const shouldRun = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setListTitle(list.title);
    }
  }, [shouldRun.current]);

  const handleOnBlur = () => {
    setInputShowing(false);
    if (list.title === listTitle || listTitle.trim().length === 0) {
      return;
    }
    updateList();
  };

  const updateList = () => {
    Client.updateList({ ...list, title: listTitle }, list.id, workspace.workspaceId)
      .then(() => {
        updateWorkspaceList('title', listTitle, list.id);
                setListTitle('');
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const showInput = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setInputShowing(true);
  };

  useEffect(() => {
    if (inputShowing) {
      inputRef.current?.focus();
    }
  }, [inputShowing, inputRef]);

  return (
    <Box minW="250px" minH="150px" mx="1rem" bg="black.primary" borderRadius={8}>
      <Flex justify="space-between" p="0.75rem">
        <Box position="relative">
          {!inputShowing && (
            <Text onClick={showInput} wordBreak="break-all" color="light.primary">
              {list.title}
            </Text>
          )}
        </Box>
        {inputShowing && (
          <FormControl>
            <Input
              ref={inputRef}
              onChange={(e) => setListTitle(e.target.value)}
              value={listTitle}
              width="95%"
              onBlur={handleOnBlur}
              color="light.primary"
              bg="transparent"
              _placeholder={{ color: 'light.primary' }}
              placeholder="Enter a list title..."
              type="text"
            />
          </FormControl>
        )}
        <Box>
          <Box
            fontSize="1.3rem"
            {...provided.dragHandleProps}
            color="light.primary"
            display="flex"
            justifyContent="flex-end"
          >
            <RiDraggable />
          </Box>
          <Box mt="0.5rem" color="light.primary" cursor="pointer">
            <BsThreeDots />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default WorkspaceList;
