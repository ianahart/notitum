import { Box, FormControl, Input, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../context/user';
import { IUserContext, IWorkspaceContext } from '../../../../interfaces';
import { Client } from '../../../../util/client';
import { WorkspaceContext } from '../../../../context/workspace';

interface ITitleInputProps {
  title: string;
  handleUpdateProperty: <T>(value: T, property: string) => void;
}

const TitleInput = ({ title, handleUpdateProperty }: ITitleInputProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [isInputShowing, setIsInputShowing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleUpdateProperty(e.target.value, 'title');
    createActivity(e.target.value);
    setIsInputShowing(false);
  };

  const createActivity = (title: string) => {
    const text = `${user.firstName} ${user.lastName} changed workspace title from ${workspace.title} to ${title}`;
    Client.createActivity(text, user.id);
  };

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  return (
    <Box
      borderRadius={8}
      padding="0.5rem"
      _hover={{ background: 'rgba(255, 255, 255, 0.2)' }}
      width="65%"
    >
      {!isInputShowing && (
        <Text
          cursor="point"
          onClick={() => setIsInputShowing(true)}
          color="light.primary"
          fontSize="1.2rem"
          fontWeight="bold"
        >
          {title}
        </Text>
      )}
      {isInputShowing && (
        <FormControl>
          <Input
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            borderColor="text.primary"
            background="black.primary"
            color="light.primary"
            fontSize="1.2rem"
            fontWeight="bold"
            width="100%"
            value={inputValue}
          />
        </FormControl>
      )}
    </Box>
  );
};

export default TitleInput;
