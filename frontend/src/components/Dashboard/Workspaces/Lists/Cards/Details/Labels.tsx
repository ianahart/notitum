import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  Text,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import CardButton from './CardButton';
import { AiOutlineClose, AiOutlineTags } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { labelColors } from '../../../../../../state/initialState';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { IActiveLabel, ICard, IWorkspaceContext } from '../../../../../../interfaces';
import { Client } from '../../../../../../util/client';
import ListLabels from './ListLabels';

interface ILabelsProps {
  card: ICard;
  handleActiveLabel: (labelId: number, checked: boolean) => void;
  activeLabels: IActiveLabel[];
}

const Labels = ({ card, handleActiveLabel, activeLabels }: ILabelsProps) => {
  const [isFormShowing, setIsFormShowing] = useState(false);
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [colors, _] = useState(labelColors);
  const [color, setColor] = useState({ id: '', background: '' });
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const createLabel = () => {
    setError('');
    if (title.trim().length === 0) return;
    const curColor = color.background.length ? color.background : 'transparent';
    Client.createLabel(workspace.workspaceId, card.id, curColor, title)
      .then(() => {
        setTitle('');
        setColor({ id: '', background: '' });
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Box>
          <CardButton title="Labels" icon={<AiOutlineTags />} />
        </Box>
      </PopoverTrigger>
      <PopoverContent borderColor="black.tertiary" bg="black.tertiary">
        <PopoverCloseButton />
        <PopoverHeader borderColor="black.tertiary" textAlign="center">
          Labels
        </PopoverHeader>
        <PopoverBody>
          {!isFormShowing && (
            <Box>
              <Box
                cursor="pointer"
                onClick={() => setIsFormShowing(true)}
                bg="black.primary"
                p="0.25rem"
                borderRadius={4}
                textAlign="center"
                fontSize="0.85rem"
              >
                <Text>Create a new label</Text>
              </Box>
              <ListLabels
                activeLabels={activeLabels}
                handleActiveLabel={handleActiveLabel}
                cardId={card.id}
                workspaceId={workspace.workspaceId}
              />
            </Box>
          )}
          {isFormShowing && (
            <Box>
              <Flex alignItems="center" justify="space-evenly">
                <Flex
                  cursor="pointer"
                  mr="auto"
                  justify="flex-start"
                  color="light.primary"
                  onClick={() => setIsFormShowing(false)}
                >
                  <BsChevronLeft />
                </Flex>
                <Heading
                  mr="auto"
                  color="light.primary"
                  textAlign="center"
                  fontSize="1rem"
                  as="h3"
                >
                  Create label
                </Heading>
              </Flex>
              <Flex
                borderRadius={4}
                flexDir="column"
                alignItems="center"
                minH="50px"
                width="100%"
                bg="black.secondary"
                my="0.25rem"
                justify="center"
              >
                <Box
                  textAlign="center"
                  width="50%"
                  margin="0 auto"
                  borderRadius={4}
                  p="0.5rem"
                  bg={color.background}
                >
                  <Text
                    fontSize="0.8rem"
                    textShadow="3px 3px 5px rgba(0, 0, 0, 1)"
                    fontWeight="bold"
                    color="light.primary"
                  >
                    {title}
                  </Text>
                </Box>
              </Flex>
              <FormControl my="1rem">
                <FormLabel
                  fontWeight="bold"
                  color="light.primary"
                  fontSize="0.8rem"
                  htmlFor="title"
                >
                  Title
                </FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  _placeholder={{ color: 'light.primary' }}
                  fontSize="0.8rem"
                  bg="black.primary"
                  id="title"
                  name="title"
                  type="text"
                  _hover={{ borderColor: 'black.primary' }}
                  borderColor="black.primary"
                />
              </FormControl>
              <Text my="0.25rem" fontSize="0.8rem" fontWeight="bold">
                Select a color
              </Text>
              <Flex flexWrap="wrap">
                {colors.map(({ id, background }) => {
                  return (
                    <Box
                      onClick={() => setColor({ id, background })}
                      cursor="pointer"
                      _hover={{ opacity: '0.8', transform: 'scale(1.1)' }}
                      m="0.25rem"
                      bg={background}
                      height="35px"
                      width="35px"
                      borderRadius={8}
                      key={id}
                    ></Box>
                  );
                })}
              </Flex>
              <Flex
                onClick={() => setColor({ id: '', background: '' })}
                role="button"
                _hover={{ opacity: '0.8' }}
                p="0.25rem"
                borderRadius={4}
                bg="black.primary"
                justifyContent="center"
                my="0.25rem"
                alignItems="center"
              >
                <Box color="light.primary" mr="0.5rem">
                  <AiOutlineClose />
                </Box>
                <Box>
                  <Text color="light.primary" fontSize="0.85rem">
                    Remove color
                  </Text>
                </Box>
              </Flex>
              {error.length > 0 && (
                <Text fontSize="0.8rem" color="red.500">
                  {error}
                </Text>
              )}

              <Flex my="0.5rem">
                <Button onClick={createLabel} colorScheme="blue">
                  Create
                </Button>
              </Flex>
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Labels;
