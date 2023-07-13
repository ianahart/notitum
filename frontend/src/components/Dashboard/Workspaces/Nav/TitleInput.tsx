import { Box, FormControl, Input, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface ITitleInputProps {
  title: string;
  handleUpdateProperty: <T>(value: T, property: string) => void;
}

const TitleInput = ({ title, handleUpdateProperty }: ITitleInputProps) => {
  const [isInputShowing, setIsInputShowing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const shouldRun = useRef(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleUpdateProperty(e.target.value, 'title');
    setIsInputShowing(false);
  };

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  return (
    <Box width="65%">
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
