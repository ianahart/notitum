import {
  Input,
  Box,
  FormControl,
  Flex,
  FormLabel,
  Text,
  PopoverTrigger,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiEarthFill } from 'react-icons/ri';
import { AiOutlineCheck, AiOutlineLock } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

interface IAboutFieldProps {
  updateField: (name: string, value: string, attribute: string) => void;
  syncUpdateField: (name: string) => void;
  name: string;
  error: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  locationVisible?: boolean;
  handleLocationVisible?: (visibility: boolean) => void;
}

const AboutField = ({
  updateField,
  syncUpdateField,
  name,
  error,
  type,
  value,
  label,
  placeholder,
  locationVisible = false,
  handleLocationVisible = undefined,
}: IAboutFieldProps) => {
  const [inputShowing, setInputShowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    updateField(name, value, 'value');
  };

  const handleOnClick = () => {
    syncUpdateField(name);
    setInputShowing(false);
  };

  return (
    <Flex justifyContent="space-between" my="1.5rem" alignItems="center">
      <Box>
        <FormControl>
          <FormLabel htmlFor={name} color="text.primary" fontSize="0.8rem">
            {label}
          </FormLabel>
          {!inputShowing && (
            <Text
              p="0.5rem"
              borderRadius={4}
              width="100%"
              cursor="pointer"
              _hover={{ bg: 'light.primary' }}
              onClick={() => setInputShowing(true)}
              color="text.primary"
              fontWeight="bold"
              fontSize="0.85rem"
            >
              {value.length > 0 ? value : placeholder}
            </Text>
          )}
          {error.length > 0 && (
            <Text fontSize="0.75rem" color="re.500">
              {error}
            </Text>
          )}
          {inputShowing && (
            <Box>
              <Input
                onChange={handleOnChange}
                color="text.primary"
                id={name}
                type={type}
                name={name}
                value={value}
              />
              <Flex my="0.5rem" justifyContent="flex-end">
                <Box
                  mx="0.25rem"
                  borderRadius={8}
                  cursor="pointer"
                  p="0.25rem"
                  color="text.primary"
                  border="1px solid"
                  borderColor="light.primary"
                  onClick={handleOnClick}
                >
                  <AiOutlineCheck />
                </Box>
                <Box
                  onClick={() => setInputShowing(false)}
                  mx="0.25rem"
                  borderRadius={8}
                  cursor="pointer"
                  p="0.25rem"
                  color="text.primary"
                  border="1px solid"
                  borderColor="light.primary"
                >
                  <AiOutlineClose />
                </Box>
              </Flex>
            </Box>
          )}
        </FormControl>
      </Box>
      {name === 'location' ? (
        <>
          <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <PopoverTrigger>
              <Flex
                onClick={isOpen ? () => onClose() : () => onOpen()}
                _hover={{ bg: 'light.primary' }}
                p="0.25rem"
                borderRadius={4}
                alignItems="center"
                cursor="pointer"
              >
                <Box mr="0.5rem" color="#000">
                  {locationVisible ? <RiEarthFill /> : <AiOutlineLock />}
                </Box>
                <Text fontSize="0.85rem" color="#000">
                  {locationVisible ? 'Anyone' : 'Private'}
                </Text>
              </Flex>
            </PopoverTrigger>
            <PopoverContent minH="40px">
              <PopoverCloseButton />
              <PopoverBody>
                <Box
                  onClick={
                    handleLocationVisible !== undefined
                      ? () => handleLocationVisible(true)
                      : undefined
                  }
                  cursor="pointer"
                  my="0.5rem"
                  _hover={{ bg: 'light.primary', borderRadius: '4px', p: '0.25rem' }}
                >
                  <Flex alignItems="center">
                    <Box mr="0.25rem" color="text.primary">
                      <RiEarthFill />
                    </Box>
                    <Text fontSize="0.85rem">Anyone</Text>
                  </Flex>
                  <Box color="text.primary">
                    <Text fontSize="0.8rem">
                      Visible to anyone who can view your content.
                    </Text>
                  </Box>
                </Box>
                <Box
                  onClick={
                    handleLocationVisible !== undefined
                      ? () => handleLocationVisible(false)
                      : undefined
                  }
                  cursor="pointer"
                  my="0.5rem"
                  _hover={{ bg: 'light.primary', borderRadius: '4px', p: '0.25rem' }}
                >
                  <Flex alignItems="center">
                    <Box mr="0.25rem" color="text.primary">
                      <AiOutlineLock />
                    </Box>
                    <Text fontSize="0.85rem">Private</Text>
                  </Flex>
                  <Box color="text.primary">
                    <Text fontSize="0.8rem">Only visible to you.</Text>
                  </Box>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <Flex p="0.25rem" borderRadius={4} alignItems="center" cursor="not-allowed">
          <Box mr="0.5rem" color="text.primary">
            <RiEarthFill />
          </Box>
          <Text fontSize="0.85rem" color="text.primary">
            Anyone
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default AboutField;
