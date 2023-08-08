import { IList, IUserContext, IWorkspaceContext } from '../../../../interfaces';
import { MenuItem, Menu, MenuButton, IconButton, MenuList } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { Client } from '../../../../util/client';
import { useContext } from 'react';
import { UserContext } from '../../../../context/user';
import { WorkspaceContext } from '../../../../context/workspace';

interface IListMenuProps {
  list: IList;
  handleSetCardInputShowing: (visible: boolean) => void;
}

const ListMenu = ({ list, handleSetCardInputShowing }: IListMenuProps) => {
  const { removeWorkspaceList } = useContext(WorkspaceContext) as IWorkspaceContext;
  const { user } = useContext(UserContext) as IUserContext;

  const handleRemoveList = () => {
    Client.removeList(list.id, user.id)
      .then(() => {
        removeWorkspaceList(list.id);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleOnClick = (value: string) => {
    switch (value) {
      case 'add card':
        handleSetCardInputShowing(true);
        break;
      case 'remove':
        handleRemoveList();
        break;
      default:
        break;
    }
  };

  return (
    <Menu colorScheme="twitter">
      <MenuButton
        color="light.primary"
        _hover={{ background: 'transparent' }}
        _active={{ background: 'transparent' }}
        as={IconButton}
        aria-label="List options"
        icon={<BsThreeDots />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem onClick={() => handleOnClick('remove')}>Remove...</MenuItem>
        <MenuItem onClick={() => handleOnClick('add card')}>Add card...</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ListMenu;
