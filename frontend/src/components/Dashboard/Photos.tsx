import { Box, Image } from '@chakra-ui/react';

import { AiOutlineCheck } from 'react-icons/ai';
import { IPexels } from '../../interfaces';

interface IPhotosProps {
  photos: IPexels[];
  background: IPexels;
  handleSetBackground: (id: string, photo: string) => void;
}

const Photos = ({ photos, background, handleSetBackground }: IPhotosProps) => {
  return (
    <>
      {photos.map(({ id, photo }) => {
        return (
          <Box
            opacity={id === background.id ? '0.6' : '1'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            position="relative"
            onClick={() => handleSetBackground(id, photo)}
            key={id}
            cursor="pointer"
            m="0.25rem"
          >
            <Image
              borderRadius={8}
              width="50px"
              height="35px"
              src={photo}
              alt="background for workspace"
            />
            {id === background.id && (
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
