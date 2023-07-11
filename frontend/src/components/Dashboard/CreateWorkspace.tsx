import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import {
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import BasicSpinner from '../Shared/BasicSpinner';
import { IPexels } from '../../interfaces';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../util/client';
import { nanoid } from 'nanoid';

const CreateWorkspace = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<IPexels[]>([]);
  const [background, setBackground] = useState<IPexels>({ id: '', photo: '' });
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const perPage = 5;
  const handleMenuOpen = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const getPexelBackgrounds = () => {
    setLoading(true);
    setBackground({ id: '', photo: '' });
    setPhotos([]);
    Client.getPexelBackgrounds(page, perPage)
      .then((res) => {
        handleSetPhotos(res.data.photos);
        setPage((prevState) => prevState + 1);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSetPhotos = (data: string[]) => {
    data.forEach((photo) => {
      setPhotos((prevState) => [...prevState, { id: nanoid(), photo }]);
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
            <Flex alignItems="center" flexWrap="wrap">
              {photos.map(({ id, photo }) => {
                return (
                  <Box
                    opacity={id === background.id ? '0.6' : '1'}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    position="relative"
                    onClick={() => setBackground({ id, photo })}
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
              <Box
                cursor="pointer"
                color="light.primary"
                onClick={() => getPexelBackgrounds()}
              >
                <BsThreeDots />
              </Box>
            </Flex>
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default CreateWorkspace;
