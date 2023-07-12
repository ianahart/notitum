import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { AiOutlineClose, AiOutlinePlus, AiOutlineUnorderedList } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import BasicSpinner from '../Shared/BasicSpinner';
import { IPexels, IUserContext } from '../../interfaces';
import { useContext, useEffect, useRef, useState } from 'react';
import { Client } from '../../util/client';
import { nanoid } from 'nanoid';
import PexelBackgrounds from './PexelBackgrounds';
import { colorsState } from '../../state/initialState';
import WorkspaceForm from './WorkspaceForm';
import { UserContext } from '../../context/user';
import { slugify } from '../../util';

const CreateWorkspace = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [colors, setColors] = useState<IPexels[]>([]);
  const [photos, setPhotos] = useState<IPexels[]>([]);
  const [extraPhotos, setExtraPhotos] = useState<IPexels[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<IPexels>({
    id: '',
    background: '',
  });
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const perPage = 5;
  const handleMenuOpen = () => {
    setError('');
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (colors.length === 0) {
      setColors(colorsState);
    }
  }, [colors.length]);

  const resetState = () => {
    setExtraPhotos([]);
  };

  const getPexelBackgrounds = () => {
    setLoading(true);
    setSelectedBackground({ id: '', background: '' });
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
    data.forEach((background) => {
      if (load === 'initial') {
        setPhotos((prevState) => [...prevState, { id: nanoid(), background }]);
      }
      setExtraPhotos((prevState) => [...prevState, { id: nanoid(), background }]);
    });
    if (page === 1 && photos.length) {
      setSelectedBackground(photos[0]);
    }
  };

  useEffect(() => {
    if (selectedBackground.background === '' && photos.length) {
      setSelectedBackground(photos[0]);
    }
  }, [setSelectedBackground, photos.length, selectedBackground]);

  const handleNewWorkspace = (e: React.MouseEvent<HTMLDivElement>, open: boolean) => {
    e.stopPropagation();
    if (open && !menuOpen) {
      getPexelBackgrounds();
    }
    setMenuOpen(open);
  };

  const handleSetBackground = (id: string, background: string) => {
    setSelectedBackground({ id, background });
  };

  const handleCreateWorkspace = (title: string, visibility: string) => {
    setError('');
    Client.createWorkSpace(selectedBackground.background, title, visibility, user.id)
      .then((res) => {
        console.log(res);
        const { title, userId } = res.data;
        handleMenuOpen();
        navigate(`/${slugify(user.firstName, user.lastName)}/${title}`, {
          state: { userId, title },
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
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
          minH="100%"
          top="-200px"
          left={['0', '0', '300px']}
          handleMenuOpen={handleMenuOpen}
        >
          <Box className="createWorkspaceMenu" p="0.5rem">
            <Flex alignItems="center" justifyContent="space-evenly">
              <Box></Box>
              <Text fontSize="0.8rem" fontWeight="bold" color="light.primary">
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
            <Flex justify="center">
              {error.length > 0 && (
                <Text textAlign="center" fontSize="0.7rem" color="red.500">
                  {error}
                </Text>
              )}
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
                  <>
                    {selectedBackground.background.startsWith('#') && (
                      <Box
                        bg={selectedBackground.background}
                        borderRadius={8}
                        width="150px"
                        height="100px"
                      ></Box>
                    )}
                    {!selectedBackground.background.startsWith('#') && (
                      <Image
                        borderRadius={8}
                        width="150px"
                        height="100px"
                        src={selectedBackground.background}
                        alt="background image for workspace"
                      />
                    )}
                  </>
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
              <Text fontWeight="bold" fontSize="0.8rem" color="light.primary">
                Background
              </Text>
            </Box>
            <PexelBackgrounds
              fetch={fetch}
              extraPhotos={extraPhotos}
              handleSetBackground={handleSetBackground}
              photos={photos}
              colors={colors}
              selectedBackground={selectedBackground}
              paginatePexelBackgrounds={paginatePexelBackgrounds}
              resetState={resetState}
            />
            <Box my="1.5rem">
              <WorkspaceForm handleCreateWorkspace={handleCreateWorkspace} />
            </Box>
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default CreateWorkspace;
