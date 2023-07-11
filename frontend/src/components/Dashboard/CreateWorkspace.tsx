import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineUnorderedList } from 'react-icons/ai';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import BasicSpinner from '../Shared/BasicSpinner';
import { IPexels } from '../../interfaces';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../util/client';
import { nanoid } from 'nanoid';
import PexelBackgrounds from './PexelBackgrounds';

const CreateWorkspace = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<IPexels[]>([]);
  const [extraPhotos, setExtraPhotos] = useState<IPexels[]>([]);
  const [background, setBackground] = useState<IPexels>({ id: '', photo: '' });
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const perPage = 5;
  const handleMenuOpen = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const resetState = () => {
    setExtraPhotos([]);
    setPhotos([]);
    setBackground({ id: '', photo: '' });
  };

  const getPexelBackgrounds = () => {
    setLoading(true);
    setBackground({ id: '', photo: '' });
    setPhotos([]);
    fetch('initial');
  };

  const fetch = (load: string) => {
    Client.getPexelBackgrounds(page, perPage)
      .then((res) => {
        handleSetPhotos(res.data.photos, load);
        setPage((prevState) => prevState + 1);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  const paginatePexelBackgrounds = () => {
    fetch('paginate');
  };

  const handleSetPhotos = (data: string[], load: string) => {
    data.forEach((photo) => {
      if (load === 'initial') {
        setPhotos((prevState) => [...prevState, { id: nanoid(), photo }]);
      }
      setExtraPhotos((prevState) => [...prevState, { id: nanoid(), photo }]);
    });
    if (page === 1 && photos.length) {
      setBackground(photos[0]);
    }
  };

  useEffect(() => {
    if (background.photo === '' && photos.length) {
      setBackground(photos[0]);
    }
  }, [setBackground, photos.length, background]);

  const handleNewWorkspace = (e: React.MouseEvent<HTMLDivElement>, open: boolean) => {
    e.stopPropagation();
    if (open && !menuOpen) {
      getPexelBackgrounds();
    }
    setMenuOpen(open);
  };

  const handleSetBackground = (id: string, photo: string) => {
    setBackground({ id, photo });
  };

  return (
    <Box
      position="relative"
      bg="black.primary"
      width="200px"
      height="100px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      borderRadius={8}
      onClick={(e) => handleNewWorkspace(e, true)}
    >
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        borderRadius={8}
        width="200px"
        height="100px"
        color="light.primary"
        fontSize="0.85rem"
        cursor="pointer"
      >
        <Box my="0.5rem">
          <AiOutlinePlus />
        </Box>
        <Text>Create new workspace</Text>
        <Text>10 remaining</Text>
      </Flex>
      {menuOpen && (
        <ClickAwayMenu
          menuName=""
          menuRef={menuRef}
          triggerRef={triggerRef}
          minH="500px"
          top="0px"
          left={['0', '0', '300px']}
          handleMenuOpen={handleMenuOpen}
        >
          <Box className="createWorkspaceMenu" p="0.5rem">
            <Flex alignItems="center" justifyContent="space-evenly">
              <Box></Box>
              <Text fontSize="0.8rem" textTransform="uppercase" color="light.primary">
                New workspace
              </Text>
              <Box
                color="light.primary"
                cursor="pointer"
                onClick={(e) => handleNewWorkspace(e, false)}
              >
                <AiOutlineClose />
              </Box>
            </Flex>
            <Flex mt="1rem" justifyContent="center">
              {photos.length > 0 && (
                <Box
                  position="relative"
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    borderRadius={8}
                    width="150px"
                    height="100px"
                    src={background.photo}
                    alt="background image for workspace"
                  />
                  <Flex position="absolute">
                    {[...Array(3)].map((_, index) => {
                      return (
                        <Box
                          mx="0.25rem"
                          bg="black.primary"
                          key={index}
                          fontSize="1.5rem"
                          color="#fff"
                        >
                          <AiOutlineUnorderedList />
                        </Box>
                      );
                    })}
                  </Flex>
                </Box>
              )}
              {loading && (
                <Flex justifyContent="center">
                  <BasicSpinner />
                </Flex>
              )}
            </Flex>
            <Box mt="1.5rem">
              <Text fontSize="0.8rem" color="light.primary">
                Background
              </Text>
            </Box>
            <PexelBackgrounds
              extraPhotos={extraPhotos}
              handleSetBackground={handleSetBackground}
              photos={photos}
              background={background}
              paginatePexelBackgrounds={paginatePexelBackgrounds}
              resetState={resetState}
            />
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default CreateWorkspace;
