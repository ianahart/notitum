import { Box, Text, Flex, Textarea, Button, ButtonGroup } from '@chakra-ui/react';
import { AiOutlineComment } from 'react-icons/ai';
import { UserContext } from '../../../../../../context/user';
import {
  IComment,
  IPagination,
  IUserContext,
  IWorkspaceContext,
} from '../../../../../../interfaces';
import { useContext, useEffect, useRef, useState } from 'react';
import Avatar from '../../../../../Shared/Avatar';
import { abbreviate } from '../../../../../../util';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { Client } from '../../../../../../util/client';
import Comment from './Comment';

interface ICommentsProps {
  cardId: number;
}

const Comments = ({ cardId }: ICommentsProps) => {
  const paginationState = { pageSize: 2, page: 0, direction: 'next', totalPages: 0 };
  const { user } = useContext(UserContext) as IUserContext;
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [createFormShowing, setCreateFormShowing] = useState(false);
  const [pagination, setPagination] = useState<IPagination>(paginationState);
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState('');
  const [key, setKey] = useState('');
  const [commentLength] = useState(100);
  const [error, setError] = useState('');
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current && cardId !== 0) {
      shouldRun.current = false;
      getComments(false);
    }
  }, [shouldRun.current, cardId]);

  const getComments = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getComments(pagination.pageSize, pageNum, pagination.direction, cardId)
      .then((res) => {
        const { direction, pageSize, page, totalPages, comments } = res.data.data;
        setPagination({ ...pagination, direction, pageSize, page, totalPages });
        paginate
          ? setComments((prevState) => [...prevState, ...comments])
          : setComments(comments);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleOnCreateCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (comment.length >= 100) return;
    if (key !== 'Delete' && key !== 'Backspace') {
      setComment(e.target.value);
    }
  };

  const handleOnCreateCommentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    comment.length === 0 ? setKey('') : setKey(e.key);

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const arr = comment.split('');
      arr.splice(comment.length - 1, 1);
      setComment(arr.join(''));
    }
  };

  const validateCreateComment = () => {
    return comment.trim().length === 0 || comment.length > 100;
  };

  const createCommentOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (validateCreateComment()) {
      setError('Comment must be between 1 and 100 characters');
    }

    Client.createComment(comment, user.id, cardId, workspace.workspaceId)
      .then((res) => {
        setComments((prevState) => [...prevState, res.data.data]);
        setComment('');
        setCreateFormShowing(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const toggleUpdateCommentForm = (id: number, isOpen: boolean) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          comment.isOpen = isOpen;
        }
        return comment;
      })
    );
  };

  const updateComment = (id: number, text: string) => {
    Client.updateComment(text, user.id, cardId, workspace.workspaceId, id)
      .then(() => {
        setComments(
          comments.map((comment) => {
            if (comment.id === id) {
              comment.text = text;
            }
            return comment;
          })
        );
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const removeComment = (id: number) => {
    Client.removeComment(id, user.id, workspace.workspaceId)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== id));
        getComments(false);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <Flex alignItems="center">
        <Box mr="0.5rem" fontSize="1.2rem">
          <AiOutlineComment />
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="1.1rem">
            Comments
          </Text>
        </Box>
      </Flex>
      <Text fontSize="0.85rem" my="0.5rem">
        Comments can be written by{' '}
        <Box as="span" fontWeight="bold">
          you
        </Box>{' '}
        and members
      </Text>
      <Flex my="1.5rem">
        <Box mr="1rem">
          <Avatar abbreviation={abbreviate(user.firstName, user.lastName)} />
        </Box>
        {!createFormShowing && (
          <Flex
            onClick={() => setCreateFormShowing(true)}
            cursor="pointer"
            p="0.25rem"
            alignItems="center"
            borderRadius={8}
            w="100%"
            _hover={{ opacity: '0.8' }}
            bg="black.tertiary"
            minH="40px"
          >
            <Text fontSize="0.85rem">Write a comment...</Text>
          </Flex>
        )}
        {createFormShowing && (
          <form onSubmit={createCommentOnSubmit} style={{ width: '100%' }}>
            <Box width="100%">
              <Text fontSize="0.85rem">
                {comment.length}/{commentLength}
              </Text>
              {comment.length === commentLength && (
                <Text fontWeight="bold" color="#989c98" fontSize="0.7rem" my="0.25rem">
                  (Character limit reached)
                </Text>
              )}
              {error.length > 0 && (
                <Text my="0.25rem" fontSize="0.8rem" color="red.500">
                  {error}
                </Text>
              )}
              <Textarea
                value={comment}
                onKeyDown={handleOnCreateCommentKeyDown}
                onChange={handleOnCreateCommentChange}
                borderColor="black.tertiary"
                _placeholder={{ color: 'light.primary', fontSize: '0.85rem' }}
                bg="black.tertiary"
                width="100%"
                minH="80px"
                fontSize="0.85rem"
                placeholder={`Commenting as ${user.firstName} ${user.lastName}...`}
              />
              <ButtonGroup my="1rem">
                <Button type="submit" colorScheme="blue" fontSize="0.85rem">
                  Create
                </Button>
                <Button
                  onClick={() => {
                    setCreateFormShowing(false);
                    setComment('');
                  }}
                  fontSize="0.85rem"
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </form>
        )}
      </Flex>
      <Box>
        {comments.map((comment) => {
          return (
            <Comment
              removeComment={removeComment}
              updateComment={updateComment}
              toggleUpdateCommentForm={toggleUpdateCommentForm}
              key={comment.id}
              comment={comment}
            />
          );
        })}
        {pagination.page <= pagination.totalPages && (
          <Flex justifyContent="center">
            <Button
              onClick={() => getComments(true)}
              fontSize="0.85rem"
              color="light.primary"
              bg="transparent"
              _hover={{ bg: 'transparent' }}
            >
              Read more...
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Comments;
