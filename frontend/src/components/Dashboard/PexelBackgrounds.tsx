import {
  Box,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
} from '@chakra-ui/react';

import { BsThreeDots } from 'react-icons/bs';
import { IPexels } from '../../interfaces';
import Photos from './Photos';

interface IPexelBackgroundsProps {
  photos: IPexels[];
  extraPhotos: IPexels[];
  background: IPexels;
  handleSetBackground: (id: string, photo: string) => void;
  paginatePexelBackgrounds: () => void;
  resetState: () => void;
}

const PexelBackgrounds = ({
  photos,
  extraPhotos,
  background,
  paginatePexelBackgrounds,
  handleSetBackground,
  resetState,
}: IPexelBackgroundsProps) => {
  return (
    <Flex alignItems="center" flexWrap="wrap">
      <Photos
        background={background}
        photos={photos}
        handleSetBackground={handleSetBackground}
      />
      <Box cursor="pointer" color="light.primary">
        <Menu onClose={resetState}>
          <MenuButton
            _hover={{ backgroundColor: 'transparent' }}
            as={IconButton}
            aria-label="Options"
            color="light.primary"
            variant="ghost"
            icon={<BsThreeDots />}
          ></MenuButton>
          <MenuList
            maxW="250px"
            className="overflow-scroll"
            overflowY="auto"
            height="300px"
            bg="black.primary"
            border="none"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          >
            <Flex flexWrap="wrap">
              <Photos
                background={background}
                photos={extraPhotos}
                handleSetBackground={handleSetBackground}
              />
            </Flex>

            <Text onClick={() => paginatePexelBackgrounds()}>See More...</Text>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default PexelBackgrounds;
