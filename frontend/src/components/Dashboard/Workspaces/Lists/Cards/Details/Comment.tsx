import { Box, Button, ButtonGroup, Flex, Textarea, Text } from '@chakra-ui/react';
import { IComment, IUserContext } from '../../../../../../interfaces';
import Avatar from '../../../../../Shared/Avatar';
import { abbreviate } from '../../../../../../util';
// @ts-ignore
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../../../context/user';
dayjs.extend(localizedFormat);
interface ICommentProps {
  comment: IComment;
  toggleUpdateCommentForm: (id: number, isOpen: boolean) => void;
  updateComment: (id: number, comment: string) => void;
  removeComment: (id: number) => void;
}

const Comment = ({
  comment,
  toggleUpdateCommentForm,
  updateComment,
  removeComment,
}: ICommentProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { firstName, lastName, text, createdAt, id, isOpen } = comment;
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setInputValue(text);
    }
  }, [shouldRun.current]);

  const validateInput = () => {
    if (inputValue.trim().length === 0 || inputValue.length > 100) {
      setError('Comment must be between 1 and 100 characters');
      return true;
    }
    return false;
  };

  const updateCommentOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError('');
    e.preventDefault();
    if (validateInput()) {
      return;
    }
    updateComment(id, inputValue);
    toggleUpdateCommentForm(id, false);
  };

  return (
    <Box width="100%" my="0.5rem">
      <>
        {isOpen && (
          <form onSubmit={updateCommentOnSubmit} style={{ width: '100%' }}>
            <Box width="100%">
              {error.length > 0 && (
                <Text my="0.25rem" fontSize="0.8rem" color="red.500">
                  {error}
                </Text>
              )}
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                borderColor="black.tertiary"
                _placeholder={{ color: 'light.primary', fontSize: '0.85rem' }}
                bg="black.tertiary"
                width="100%"
                minH="80px"
                fontSize="0.85rem"
              />
              <ButtonGroup my="1rem">
                <Button type="submit" colorScheme="blue" fontSize="0.85rem">
                  Update
                </Button>
                <Button
                  onClick={() => {
                    toggleUpdateCommentForm(id, false);
                    setInputValue('');
                  }}
                  fontSize="0.85rem"
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </form>
        )}

        {!isOpen && (
          <Box>
            <Flex alignItems="center">
              <Avatar abbreviation={`${abbreviate(firstName, lastName)}`} />
              <Text
                p="0.5rem"
                width="100%"
                bg="black.tertiary"
                borderRadius={8}
                ml="1rem"
                fontSize="0.8rem"
              >
                {text}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Flex my="0.25rem" alignItems="center">
                <Text mx="0.25rem" fontSize="0.8rem">
                  {firstName} {lastName}
                </Text>
                <Text mx="0.25rem" fontSize="0.7rem">
                  {dayjs(createdAt).format('L LT')}
                </Text>
              </Flex>
              <Box>
                {comment.userId === user.id && (
                  <ButtonGroup>
                    <Button
                      onClick={() => toggleUpdateCommentForm(id, true)}
                      color="#8e918e"
                      fontSize="0.8rem"
                      bg="transparent"
                      _hover={{ bg: 'transparent' }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => removeComment(id)}
                      color="#8e918e"
                      fontSize="0.8rem"
                      bg="transparent"
                      _hover={{ bg: 'transparent' }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                )}
              </Box>
            </Flex>
          </Box>
        )}
      </>
    </Box>
  );
};

export default Comment;
