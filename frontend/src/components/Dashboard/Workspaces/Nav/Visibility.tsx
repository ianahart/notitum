import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode, useContext, useRef, useState } from 'react';
import { RiEarthLine } from 'react-icons/ri';
import { AiOutlineLock } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { WorkspaceContext } from '../../../../context/workspace';
import { IUserContext, IWorkspaceContext } from '../../../../interfaces';
import VisibilitySelectOption from '../../WorkspaceCreation/VisibilitySelectOption';
import ClickAwayMenu from '../../../Shared/ClickAwayMenu';
import { UserContext } from '../../../../context/user';

const Visibility = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext) as IUserContext;
  const { workspace, handleUpdateProperty } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleVisibility = (option: string) => {
    handleUpdateProperty(option.toUpperCase(), 'visibility');
  };

  const openMenu = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setMenuOpen(true);
  };

  const showCorrectIcon = (): ReactNode => {
    switch (workspace.visibility) {
      case 'PUBLIC':
        return <RiEarthLine />;
      case 'PRIVATE':
        return <AiOutlineLock />;

      case 'WORKSPACE':
        return <FiUsers />;

      default:
        return <FiUsers />;
    }
  };

  return (
    <Box
      _hover={{ background: 'rgba(255, 255, 255, 0.2)' }}
      padding="0.5rem"
      borderRadius={8}
      position="relative"
    >
      <Flex alignItems="center">
        <Box mx="0.25rem" color="light.primary">
          {showCorrectIcon()}
        </Box>
        <Text minW="150px" fontSize="0.8rem" color="light.primary" onClick={openMenu}>
          {workspace.visibility.toLowerCase()} is visible
        </Text>
      </Flex>

      {menuOpen && (
        <ClickAwayMenu
          menuName=""
          menuRef={menuRef}
          triggerRef={triggerRef}
          minH="200px"
          top="0x"
          left="0px"
          handleMenuOpen={handleMenuOpen}
        >
          <VisibilitySelectOption
            visibility={workspace.visibility}
            title="workspace"
            text={`All users of ${user.firstName} ${user.lastName}'s workspace can view and edit this workspace.`}
            icon={<FiUsers />}
            handleMenuOpen={handleMenuOpen}
            handleVisibility={handleVisibility}
          />
          <VisibilitySelectOption
            visibility={workspace.visibility}
            title="private"
            text={`Only ${user.firstName} ${user.lastName} can edit and view this workspace.`}
            icon={<AiOutlineLock />}
            handleMenuOpen={handleMenuOpen}
            handleVisibility={handleVisibility}
          />
          <VisibilitySelectOption
            visibility={workspace.visibility}
            title="public"
            text="Anyone on the internet can view this workspace, only members can edit this workspace."
            icon={<RiEarthLine />}
            handleMenuOpen={handleMenuOpen}
            handleVisibility={handleVisibility}
          />
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default Visibility;
