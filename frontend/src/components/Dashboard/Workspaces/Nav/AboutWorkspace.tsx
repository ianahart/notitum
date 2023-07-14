import { Box, Button, ButtonGroup, Flex, Text, Textarea } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { WorkspaceContext } from '../../../../context/workspace';
import { Link as RouterLink } from 'react-router-dom';
import { IUserContext, IWorkspaceContext } from '../../../../interfaces';
import { UserContext } from '../../../../context/user';
import { AiOutlineUser } from 'react-icons/ai';
import { slugify } from '../../../../util';
import { CiViewList } from 'react-icons/ci';

const AboutWorkspace = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const { workspace, handleUpdateProperty } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const [textareaValue, setTextareaValue] = useState('');
  const [isFormShowing, setIsFormShowing] = useState(false);

  const shouldRun = useRef(true);
  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setTextareaValue(workspace.description === null ? '' : workspace.description);
    }
  }, [shouldRun.current, workspace.description]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleUpdateProperty(textareaValue, 'description');
    console.log('save');
    setIsFormShowing(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('cancel');
    setIsFormShowing(false);
  };

  return (
    <Box mt="2rem" mb="1rem">
      <Flex alignItems="center">
        <Box mr="0.5rem" color="light.primary" fontSize="1.3rem">
          <AiOutlineUser />
        </Box>
        <Text color="light.primary">Board admin</Text>
      </Flex>
      <Flex mt="1.5rem">
        <Flex
          color="light.primary"
          borderRadius="50%"
          align="center"
          justify="center"
          bg="primary.blue"
          width="45px"
          height="45px"
          mx="0.5rem"
        >
          {user.abbreviation}
        </Flex>
        <Flex flexDir="column">
          <Text fontWeight="bold" color="light.primary" fontSize="0.85rem">
            {user.firstName} {user.lastName}
          </Text>
          <Text color="light.primary" fontSize="0.85rem">
            {user.email}
          </Text>
        </Flex>
      </Flex>

      <Box mt="2rem" color="light.primary" fontSize="0.85rem" cursor="pointer">
        <RouterLink to={`/${slugify(user.firstName, user.lastName)}/settings`}>
          Edit profile info
        </RouterLink>
      </Box>
      <Box mt="1rem" borderBottom="1px solid" borderColor="border.primary"></Box>

      <Box mt="1rem">
        <Flex alignItems="center">
          <Box mr="0.5rem" color="light.primary" fontSize="1.3rem">
            <CiViewList />
          </Box>
          <Text color="light.primary">Description</Text>
        </Flex>
        {!isFormShowing && (
          <Box
            onClick={() => setIsFormShowing(true)}
            cursor="pointer"
            mt="2rem"
            padding="0.3rem"
            background="#4b4b4d"
            _hover={{ opacity: 0.8 }}
          >
            <Text color="light.primary" fontSize="0.85rem">
              {textareaValue.length === 0
                ? 'Add a description to let your teammates know what this workspace is used for. Give them instructions on how to collaberate!'
                : workspace.description}
            </Text>
          </Box>
        )}
        {isFormShowing && (
          <Box mt="2rem">
            <Textarea
              resize="none"
              fontSize="0.85rem"
              color="light.primary"
              bg="cover.primary"
              border="text.primary"
              value={textareaValue}
              onChange={handleOnChange}
            ></Textarea>
            <Flex my="2rem">
              <ButtonGroup>
                <Button onClick={handleSave} colorScheme="blue">
                  Save
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </ButtonGroup>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AboutWorkspace;
