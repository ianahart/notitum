import { Box, Text, Flex } from '@chakra-ui/react';
import Avatar from '../Shared/Avatar';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineRightSquare } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { slugify } from '../../util';
import { Client } from '../../util/client';

const AccountMenu = () => {
  const { user, logout, tokens } = useContext(UserContext) as IUserContext;
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSetAccountMenuOpen = () => {
    setAccountMenuOpen((prevState) => !prevState);
  };

  const logUserOut = () => {
    Client.logout(tokens.refreshToken)
      .then(() => {
        logout();
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <Box ref={triggerRef} onClick={handleSetAccountMenuOpen}>
        <Avatar abbreviation={user.abbreviation} />
      </Box>
      {accountMenuOpen && (
        <ClickAwayMenu
          top="50px"
          right="10px"
          triggerRef={triggerRef}
          menuRef={menuRef}
          handleMenuOpen={handleSetAccountMenuOpen}
        >
          <Box>
            <Box className="account" p="0.75rem">
              <Text
                color="text.primary"
                fontSize="0.675rem"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Account
              </Text>
              <Flex mt="0.5rem">
                <Avatar abbreviation={user.abbreviation} />
                <Box ml="0.5rem" fontSize="0.7rem" color="light.primary">
                  <Text>
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text>{user.email}</Text>
                </Box>
              </Flex>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt="1rem"
                fontSize="0.8rem"
                color="light.primary"
              >
                <RouterLink to={`/${slugify(user.firstName, user.lastName)}/account`}>
                  Manage Account
                </RouterLink>
                <AiOutlineRightSquare />
              </Box>
            </Box>
            <Box mb="1rem" borderBottom="1px solid" borderColor="text.secondary"></Box>
            <Box p="1rem" className="notitum">
              <Text
                color="text.primary"
                fontSize="0.675rem"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Notitum
              </Text>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt="1rem"
                fontSize="0.8rem"
                color="light.primary"
              >
                <RouterLink to={`/${slugify(user.firstName, user.lastName)}/settings`}>
                  Settings
                </RouterLink>
                <FiSettings />
              </Box>
            </Box>
            <Box mb="1rem" borderBottom="1px solid" borderColor="text.secondary"></Box>
            <Box p="1rem">
              <Text
                onClick={logUserOut}
                _hover={{ opacity: 0.8 }}
                cursor="pointer"
                fontSize="0.8rem"
                color="light.primary"
              >
                Log out
              </Text>
            </Box>
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default AccountMenu;
