import { Box, Image } from '@chakra-ui/react';

import { AiOutlineCheck } from 'react-icons/ai';
import { IPexels } from '../../../interfaces';

interface IPhotosProps {
  photos: IPexels[];
  selectedBackground: IPexels;
  handleSetBackground: (id: string, background: string) => void;
}

const Photos = ({ photos, selectedBackground, handleSetBackground }: IPhotosProps) => {
  return (
    <>
      {photos.map(({ id, background }) => {
        return (
          <Box
            opacity={id === selectedBackground.id ? '0.6' : '1'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            position="relative"
            onClick={() => handleSetBackground(id, background)}
            key={id}
            cursor="pointer"
            m="0.25rem"
          >
            {!background.startsWith('#') && (
              <Image
                borderRadius={8}
                width="50px"
                height="35px"
                src={background}
                alt="background for workspace"
              />
            )}
            {background.startsWith('#') && (
              <Box bg={background} width="35px" height="25px" borderRadius={8}></Box>
            )}
            {id === selectedBackground.id && (
              <Box color="black.primary" position="absolute">
                <AiOutlineCheck />
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default Photos;
