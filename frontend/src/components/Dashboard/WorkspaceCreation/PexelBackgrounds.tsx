import {
  Box,
  Flex,
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
  colors: IPexels[];
  photos: IPexels[];
  extraPhotos: IPexels[];
  selectedBackground: IPexels;
  fetch: (load: string) => void;
  handleSetBackground: (id: string, background: string) => void;
  paginatePexelBackgrounds: () => void;
  resetState: () => void;
}

const PexelBackgrounds = ({
  colors,
  fetch,
  photos,
  extraPhotos,
  selectedBackground,
  paginatePexelBackgrounds,
  handleSetBackground,
  resetState,
}: IPexelBackgroundsProps) => {
  const handleOnMenuOpen = () => {
    if (extraPhotos.length === 0) {
      fetch('paginate');
    }
  };

  return (
    <Flex alignItems="center" flexWrap="wrap">
      <Photos
        selectedBackground={selectedBackground}
        photos={photos}
        handleSetBackground={handleSetBackground}
      />
      <Photos
        selectedBackground={selectedBackground}
        photos={colors}
        handleSetBackground={handleSetBackground}
      />
      <Box cursor="pointer" color="light.primary">
        <Menu onOpen={handleOnMenuOpen} onClose={resetState}>
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
                selectedBackground={selectedBackground}
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
