import {
  Box,
  Flex,
  FormControl,
  Text,
  Input,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { UserContext } from '../../../../../context/user';
import { IList, IUserContext, IWorkspaceContext } from '../../../../../interfaces';
import { Client } from '../../../../../util/client';
import { WorkspaceContext } from '../../../../../context/workspace';

interface IAddCardProps {
  cardInputShowing: boolean;
  handleSetCardInputShowing: (cardInputShowing: boolean) => void;
  workspaceList: IList;
}

const AddCard = ({
  cardInputShowing,
  handleSetCardInputShowing,
  workspaceList,
}: IAddCardProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { addCardToWorkspaceList } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [cardTitle, setCardTitle] = useState('');

  const addCard = () => {
    if (cardTitle.trim().length === 0) return;
    handleSetCardInputShowing(false);

    const index = workspaceList.cards.length - 1 === -1 ? 0 : workspaceList.cards.length;

    Client.addCard(workspaceList.id, user.id, cardTitle, index)
      .then((res) => {
        addCardToWorkspaceList(workspaceList.id, res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box p="0.5rem" borderRadius={8}>
      {!cardInputShowing && (
        <Flex
          alignItems="center"
          borderRadius={8}
          p="0.5rem"
          pt="0"
          cursor="pointer"
          _hover={{ background: '#4e4e51' }}
        >
          <Box color="light.primary" mr="0.5rem" fontSize="1.2rem">
            <AiOutlinePlus />
          </Box>
          <Box onClick={() => handleSetCardInputShowing(true)}>
            <Text color="light.primary">Add a card</Text>
          </Box>
        </Flex>
      )}
      {cardInputShowing && (
        <Box>
          <FormControl>
            <Input
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              autoComplete="off"
              placeholder="Enter card..."
              _placeholder={{ color: 'light.primary' }}
              color="light.primary"
              type="text"
            />
          </FormControl>
          <ButtonGroup mt="0.5rem">
            <Button onClick={addCard} colorScheme="blue">
              Add card
            </Button>
            <Button onClick={() => handleSetCardInputShowing(false)}>Cancel</Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default AddCard;
