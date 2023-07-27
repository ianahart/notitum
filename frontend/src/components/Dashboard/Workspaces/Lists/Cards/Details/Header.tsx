import { Box, Text, Flex, Heading, FormControl, Input } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsCardText } from 'react-icons/bs';
import { ICard, IUserContext, IWorkspaceContext } from '../../../../../../interfaces';
import { UserContext } from '../../../../../../context/user';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { Client } from '../../../../../../util/client';
interface IHeaderProps {
  workspaceListTitle: string;
  card: ICard;
  workspaceListId: number;
}

const Header = ({ workspaceListTitle, card, workspaceListId }: IHeaderProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { lists, setLists } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [isInputShowing, setIsInputShowing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setInputValue(card.title);
    }
  }, [shouldRun.current, card.title, setInputValue]);

  const handleOnBlur = () => {
    setIsInputShowing(false);
    Client.updateCard({ ...card, title: inputValue }, workspaceListId, user.id)
      .then(() => {
        updateTitle(card.id, workspaceListId, inputValue);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const updateTitle = (cardId: number, workspaceListId: number, title: string) => {
    const updatedLists = [...lists];
    const workspaceListIndex = lists.findIndex((list) => list.id === workspaceListId);
    const cards = [...lists[workspaceListIndex].cards].map((card) => {
      if (card.id === cardId) {
        card.title = title;
      }
      return card;
    });
    updatedLists[workspaceListIndex].cards = [...cards];
    setLists(updatedLists);
  };

  return (
    <Flex alignItems="center">
      <Box fontSize="2rem" mr="0.5rem">
        <BsCardText />
      </Box>
      <Box>
        {!isInputShowing ? (
          <Heading
            onClick={() => setIsInputShowing(true)}
            cursor="pointer"
            as="h3"
            fontSize="1rem"
          >
            {card.title}
          </Heading>
        ) : (
          <FormControl>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleOnBlur}
              type="text"
              borderColor="black.tertiary"
              _hover={{ borderColor: 'black.tertiary' }}
            />
          </FormControl>
        )}
        <Text fontSize="0.85rem">In list {workspaceListTitle}</Text>
      </Box>
    </Flex>
  );
};

export default Header;
