import { Box, Flex, Image, Button, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../../../../util/client';
import { IPexels } from '../../../../../../interfaces';
import { nanoid } from 'nanoid';
import { suggestedSearches } from '../../../../../../state/initialState';
import BasicSpinner from '../../../../../Shared/BasicSpinner';

interface IPhotosProps {
  updateCardCoverPhoto: (coverPhoto: string | null) => void;
  coverPhoto: string | null;
}

const Photos = ({ updateCardCoverPhoto, coverPhoto }: IPhotosProps) => {
  const shouldRun = useRef(true);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<IPexels[]>([]);
  const [query, setQuery] = useState('backgrounds');
  const [limitReached, setLimitReached] = useState(false);
  const [showSuggested, setShowSuggested] = useState(false);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getPhotos(false, query);
    }
  }, [shouldRun.current, query]);

  useEffect(() => {
    getPhotos(false, query);
  }, [query]);

  const getPhotos = (paginate: boolean, query: string) => {
    if (page === 10) {
      setLimitReached(true);
    }
    Client.getPexelBackgrounds(page, 10, query)
      .then((res) => {
        setPage((prevState) => prevState + 1);
        if (paginate) {
          setPhotos((prevState) => [...prevState, ...syncPhotos(res.data.photos)]);
        } else {
          setPhotos(syncPhotos(res.data.photos));
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const syncPhotos = (photos: string[]) => {
    return photos.map((photo) => {
      return { id: nanoid(), background: photo };
    });
  };

  return (
    <Box>
      {showSuggested && (
        <>
          <Text fontWeight="bold" color="light.primary" fontSize="0.8rem">
            Suggested Searches
          </Text>
          <Flex flexWrap="wrap" mb="0.5rem">
            {suggestedSearches.map((suggestedSearch, index) => {
              return (
                <Box
                  onClick={() => setQuery(suggestedSearch)}
                  _hover={{ opacity: '0.8' }}
                  m="0.25rem"
                  bg="black.primary"
                  p="0.25rem"
                  borderRadius={4}
                  cursor="pointer"
                  key={index}
                >
                  <Text>{suggestedSearch}</Text>
                </Box>
              );
            })}
          </Flex>
        </>
      )}
      <Flex flexWrap="wrap">
        {photos.length === 0 && <BasicSpinner />}
        {photos.map((photo) => {
          return (
            <Image
              onClick={() => updateCardCoverPhoto(photo.background)}
              key={photo.id}
              cursor="pointer"
              _hover={{ opacity: '0.8' }}
              m="0.25rem"
              height="35px"
              width="35px"
              borderRadius={8}
              src={photo.background}
              alt="a background image for the cover photo of the card"
            />
          );
        })}
      </Flex>
      {!limitReached && (
        <Flex flexDir="column" my="1rem" justify="center">
          <Button
            color="light.primary"
            fontSize="0.75rem"
            _hover={{ background: 'transparent' }}
            colorScheme="ghost"
            onClick={() => getPhotos(true, query)}
          >
            See more...
          </Button>
          {!showSuggested && (
            <Button
              my="0.25rem"
              onClick={() => setShowSuggested(true)}
              _hover={{ bg: 'black.primary', opacity: '0.8' }}
              bg="black.primary"
              fontSize="0.8rem"
              color="light.primary"
              borderRadius={4}
            >
              Suggested Photos
            </Button>
          )}
          {coverPhoto !== null && (
            <Button
              onClick={() => updateCardCoverPhoto(null)}
              my="0.25rem"
              _hover={{ bg: 'black.primary', opacity: '0.8' }}
              bg="black.primary"
              fontSize="0.8rem"
              color="light.primary"
              borderRadius={4}
            >
              Remove cover photo
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Photos;
