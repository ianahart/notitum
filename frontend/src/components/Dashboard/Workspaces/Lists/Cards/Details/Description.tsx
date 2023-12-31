import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsTextParagraph } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { ICard, IUserContext, IWorkspaceContext } from '../../../../../../interfaces';
import { UserContext } from '../../../../../../context/user';
import { Client } from '../../../../../../util/client';
import { WorkspaceContext } from '../../../../../../context/workspace';

interface IDescriptionProps {
  card: ICard;
  workspaceListId: number;
}

const Description = ({ card, workspaceListId }: IDescriptionProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { updateCard } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [newDescription, setNewDescription] = useState('');
  const [isQuillShowing, setIsQuillShowing] = useState(false);
  const [error, setError] = useState('');
  const shouldRun = useRef(true);
  const placeholder = 'Add a more detailed description...';
  const modules = { toolbar: [] };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setNewDescription(card.details === null ? '' : card.details);
    }
  }, [shouldRun.current]);

  const saveDescription = () => {
    setError('');
    updateCard('details', newDescription, workspaceListId, card.id);
    Client.updateCard({ ...card, details: newDescription }, workspaceListId, user.id)
      .then(() => {
        setIsQuillShowing(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Box mr="0.5rem" fontSize="1.2rem">
          <BsTextParagraph />
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="1.1rem">
            Description
          </Text>
        </Box>
      </Flex>
      {error.length > 0 && (
        <Text color="red.500" fontSize="0.85rem" textAlign="center">
          {error}
        </Text>
      )}

      {!isQuillShowing && (
        <Box
          onClick={() => setIsQuillShowing(true)}
          cursor="pointer"
          mt="3rem"
          mb="2rem"
          width="90%"
          borderRadius={4}
          p="1rem"
        >
          {newDescription !== '' && (
            <ReactQuill
              readOnly
              value={newDescription}
              modules={modules}
              theme="bubble"
            />
          )}
          {newDescription === '' && <Text>{placeholder}</Text>}
        </Box>
      )}
      {isQuillShowing && (
        <Box>
          <ReactQuill theme="snow" value={newDescription} onChange={setNewDescription} />
          <ButtonGroup mt="2rem">
            <Button onClick={saveDescription} colorScheme="blue">
              Save
            </Button>
            <Button onClick={() => setIsQuillShowing(false)}>Cancel</Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default Description;
