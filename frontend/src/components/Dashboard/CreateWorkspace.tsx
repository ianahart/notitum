import { Box, Flex, Text } from '@chakra-ui/react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import { useRef, useState } from 'react';
import { Client } from '../../util/client';

const CreateWorkspace = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const getPexelBackgrounds = () => {
    console.log('Fetching backgrounds...');
    Client.getPexelBackgrounds()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <Box p="0.5rem">
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
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default CreateWorkspace;
