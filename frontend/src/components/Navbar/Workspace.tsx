import { Box, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import NavMenu from './NavMenu';
import { UserContext } from '../../context/user';
import { IUserContext, IWorkspace } from '../../interfaces';
import { Client } from '../../util/client';
import WorkspacePreviews from './WorkspacePreviews';

interface IWorkspaceProps {
  updateMenu: (open: boolean, name?: string) => void;
  menu: { open: boolean; name: string };
}

const Workspace = ({ updateMenu, menu }: IWorkspaceProps) => {
  const workSpaceRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext) as IUserContext;
  const menuRef = useRef<HTMLDivElement>(null);
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getWorkspaces();
    }
  }, [shouldRun.current]);

  const getWorkspaces = () => {
    Client.fetchYourWorkspaces(user.id)
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
        menu={menu}
        handleMenuOpen={updateMenu}
        refEl={workSpaceRef}
        menuRef={menuRef}
        title="Workspace"
        top="30px"
        minH="150px"
      >
        <WorkspacePreviews workspaces={workspaces} />
      </NavMenu>
    </Box>
  );
};

export default Workspace;
