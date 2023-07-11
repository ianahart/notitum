import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import VisibilitySelectOption from './VisibilitySelectOption';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineLock } from 'react-icons/ai';
import { RiEarthLine } from 'react-icons/ri';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

interface IVisibilitySelectProps {
  visibility: string;
  handleVisibility: (option: string) => void;
}

const VisibilitySelect = ({ visibility, handleVisibility }: IVisibilitySelectProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    setMenuOpen(true);
  };

  const handleMenuOpen = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <Box position="relative">
      <Text mb="0.25rem" color="light.primary" fontWeight="bold" fontSize="0.8rem">
        Visibility
      </Text>
      <Box bg="#302e2e" border="1px solid" borderColor="#4d4a4a" borderRadius={8}>
        <Flex
          onClick={handleOnClick}
          alignItems="center"
          p="0.25rem"
          justify="space-between"
        >
          <Text fontSize="0.8rem" color="light.primary">
            {visibility}
          </Text>
          <Box color="light.primary">
            <BsChevronDown />
          </Box>
        </Flex>
        {menuOpen && (
          <ClickAwayMenu
            menuName=""
            menuRef={menuRef}
            triggerRef={triggerRef}
            minH="200px"
            top="70px"
            left="-15px"
            handleMenuOpen={handleMenuOpen}
          >
            <VisibilitySelectOption
              visibility={visibility}
              title="workspace"
              text={`All users of ${user.firstName} ${user.lastName}'s workspace can view and edit this workspace.`}
              icon={<FiUsers />}
              handleMenuOpen={handleMenuOpen}
              handleVisibility={handleVisibility}
            />
            <VisibilitySelectOption
              visibility={visibility}
              title="private"
              text={`Only ${user.firstName} ${user.lastName} can edit and view this workspace.`}
              icon={<AiOutlineLock />}
              handleMenuOpen={handleMenuOpen}
              handleVisibility={handleVisibility}
            />
            <VisibilitySelectOption
              visibility={visibility}
              title="public"
              text="Anyone on the internet can view this workspace, only members can edit this workspace."
              icon={<RiEarthLine />}
              handleMenuOpen={handleMenuOpen}
              handleVisibility={handleVisibility}
            />
          </ClickAwayMenu>
        )}
      </Box>
    </Box>
  );
};

export default VisibilitySelect;
