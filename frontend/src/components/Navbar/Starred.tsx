import { Box, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import NavMenu from './NavMenu';
import { UserContext } from '../../context/user';
import { IUserContext, IWorkspace } from '../../interfaces';
import { Client } from '../../util/client';
import WorkspacePreviews from './WorkspacePreviews';

interface IStarredProps {
  updateMenu: (open: boolean, name?: string) => void;
  menu: { open: boolean; name: string };
}

const Starred = ({ updateMenu, menu }: IStarredProps) => {
  const starredRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getStarredWorkspaces();
    }
  }, [shouldRun.current]);

  const getStarredWorkspaces = () => {
    Client.getStarredWorkspaces(user.id, true)
      .then((res) => {
        setWorkspaces(res.data.workspaces);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <NavMenu
        menuRef={menuRef}
        menu={menu}
        handleMenuOpen={updateMenu}
        refEl={starredRef}
        title="Starred"
        minH="150px"
        top="30px"
      >
        <WorkspacePreviews workspaces={workspaces} />
      </NavMenu>
    </Box>
  );
};

export default Starred;
