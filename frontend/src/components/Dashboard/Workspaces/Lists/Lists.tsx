import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useRef } from 'react';
import { WorkspaceContext } from '../../../../context/workspace';
import { IUserContext, IWorkspaceContext } from '../../../../interfaces';
import { UserContext } from '../../../../context/user';
import { Client } from '../../../../util/client';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import WorkspaceList from './WorkspaceList';
import { useParams } from 'react-router-dom';

const Lists = () => {
  const { title } = useParams();
  const { workspace, lists, setLists } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const { user } = useContext(UserContext) as IUserContext;

  const getLists = () => {
    Client.getLists(user.id, workspace.workspaceId, workspace.userId)
      .then((res) => {
        const { data } = res.data;
        setLists(data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleDragAndDrop = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === 'list') {
      const cardSourceIndex = source.index;
      const cardDestinationIndex = destination.index;
      const listSourceIndex = lists.findIndex(
        (list) => list.id === parseInt(source.droppableId)
      );
      const listDestinationIndex = lists.findIndex(
        (list) => list.id === parseInt(destination.droppableId)
      );

      const newSourceCards = [...lists[listSourceIndex].cards];
      const newDestinationCards =
        source.droppableId !== destination.droppableId
          ? [...lists[listDestinationIndex].cards]
          : newSourceCards;

      const [deletedCard] = newSourceCards.splice(cardSourceIndex, 1);
      newDestinationCards.splice(cardDestinationIndex, 0, deletedCard);

      const reorderedLists = [...lists];

      reorderedLists[listSourceIndex] = {
        ...lists[listSourceIndex],
        cards: newSourceCards,
      };

      reorderedLists[listDestinationIndex] = {
        ...lists[listDestinationIndex],
        cards: newDestinationCards.map((card, index) => {
          card.index = index;
          return card;
        }),
      };

      setLists(reorderedLists);

      const updatedLists = reorderedLists.map((list) => {
        return list.cards.map(({ id, index }) => {
          return { workspaceListId: list.id, id, index };
        });
      });

      Client.reorderCards(updatedLists.flat(1), workspace.userId)
        .then(() => {})
        .catch((err) => {
          throw new Error(err.response.data.message);
        });
    }

    if (type === 'group') {
      const reorderedLists = [...lists];
      const [removedList] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, removedList);
      setLists(reorderedLists);
      Client.reorderLists(
        [...reorderedLists].map(({ id }, index) => ({
          workspaceListId: id,
          index,
        })),
        workspace.userId
      )
        .then(() => {})
        .catch((err) => {
          throw new Error(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    if (user.id !== 0 && workspace.workspaceId !== 0) {
      getLists();
    }
    return () => setLists([]);
  }, [user.id, workspace.workspaceId, title]);

  return (
    <Flex>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="ROOT" type="group" direction="horizontal">
          {(provided) => (
            <Flex {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <Draggable draggableId={list.id.toString()} key={list.id} index={index}>
                  {(provided) => (
                    <Box {...provided.draggableProps} ref={provided.innerRef}>
                      <WorkspaceList provided={provided} list={list} />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  );
};

export default Lists;
