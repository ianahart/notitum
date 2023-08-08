import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import NavMenu from './NavMenu';
import { UserContext } from '../../context/user';
import { IUserContext, IWorkspace } from '../../interfaces';
import { Client } from '../../util/client';
import WorkspacePreviews from './WorkspacePreviews';

interface IRecentProps {
  updateMenu: (open: boolean, name?: string) => void;
  menu: { open: boolean; name: string };
}

const Recent = ({ menu, updateMenu }: IRecentProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const recentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      getRecentWorkspaces();
      shouldRun.current = false;
    }
  }, [shouldRun.current]);

  const getRecentWorkspaces = () => {
    Client.getRecentlyViewedWorkspaces(user.id)
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
        menuRef={menuRef}
        handleMenuOpen={updateMenu}
        refEl={recentRef}
        title="Recent"
        minH="150px"
        top="30px"
      >
        <WorkspacePreviews workspaces={workspaces} />
      </NavMenu>
    </Box>
  );
};

export default Recent;
