import { Box, Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { IPexels, IWorkspaceContext } from '../../../../interfaces';
import { Client } from '../../../../util/client';
import { nanoid } from 'nanoid';
import { WorkspaceContext } from '../../../../context/workspace';
import BasicSpinner from '../../../Shared/BasicSpinner';
import { AiOutlineSearch } from 'react-icons/ai';

const Photos = () => {
  const { handleUpdateProperty } = useContext(WorkspaceContext) as IWorkspaceContext;
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<IPexels[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      fetchPhotos('backgrounds');
    }
  }, [shouldRun.current]);

  const fetchPhotos = (query: string) => {
    if (page > 10) return;
    setisLoading(true);
    Client.getPexelBackgrounds(page, perPage, query)
      .then((res) => {
        handleSetPhotos(res.data.photos);
        setPage((prevState) => prevState + 1);
      })
      .catch((err) => {
        setisLoading(false);
        throw new Error(err.response.data.message);
      })
      .finally(() => setisLoading(false));
  };

  const handleSetPhotos = (data: string[]) => {
    data.forEach((photo) => {
      setPhotos((prevState) => [...prevState, { id: nanoid(), background: photo }]);
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (page > 1) {
      setPage(1);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchPhotos(inputValue);
      setPhotos([]);
    }
  };

  return (
    <Box color="light.primary">
      <Text fontWeight="bold" mb="0.25rem" textAlign="center">
        Photos
      </Text>
      <Flex my="1.5rem">
        <FormControl position="relative">
          <Input
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
            value={inputValue}
            _placeholder={{ paddingLeft: '0.5rem', color: '#fff', fontSize: '0.8rem' }}
            placeholder="Search Photos"
            bg="#343434"
            border="text.primary"
          />
          {inputValue.trim().length === 0 && (
            <Box position="absolute" top="14px" left="5px">
              <AiOutlineSearch />
            </Box>
          )}
        </FormControl>
      </Flex>
      {isLoading ? (
        <Flex justify="center">
          <BasicSpinner />
        </Flex>
      ) : (
        <Flex mt="2rem" mb="1rem" justifyContent="space-evenly" flexWrap="wrap">
          {photos.map(({ id, background }) => {
            return (
              <Box
                onClick={() => handleUpdateProperty(background, 'background')}
                cursor="pointer"
                key={id}
                _hover={{ opacity: '0.8' }}
                backgroundImage={`url(${background})`}
                backgroundSize="cover"
                backgroundPosition="center"
                height="70px"
                width="100px"
                borderRadius={8}
                m="0.5rem"
              ></Box>
            );
          })}
        </Flex>
      )}
      {page < 10 && (
        <Flex justify="center">
          <Button
            onClick={() => fetchPhotos(inputValue.length ? inputValue : 'background')}
          >
            See more
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Photos;
