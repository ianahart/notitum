import { IWorkspaceContext, IWorkspace, IList } from '../interfaces';
import { createContext, useState } from 'react';
import { userState, tokenState, workspaceState } from '../state/initialState';
import { Client } from '../util/client';

interface IChildren {
  children: React.ReactNode;
}

export const WorkspaceContext = createContext<IWorkspaceContext | null>(null);

const WorkspaceContextProvider = ({ children }: IChildren) => {
  const [workspace, setWorkspace] = useState<IWorkspace>(workspaceState);
  const [lists, setLists] = useState<IList[]>([]);
  const handleUpdateStarred = () => {
    const isStarred = workspace.isStarred ? !workspace.isStarred : true;
    const updatedWorkspace = { ...workspace, isStarred };
    setWorkspace(updatedWorkspace);
    updateWorkspace(updatedWorkspace);
  };

  const handleUpdateProperty = <T,>(value: T, property: string) => {
    const updatedWorkspace = { ...workspace, [property]: value };
    setWorkspace(updatedWorkspace);
    updateWorkspace(updatedWorkspace);
  };

  const updateWorkspaceList = <T,>(key: string, value: T, workspaceListId: number) => {
    const updatedLists = lists.map((list) => {
      if (list.id === workspaceListId) {
        if (typeof key === 'string') {
          list[key] = value;
        }
      }
      return list;
    });

    setLists(updatedLists);
  };

  const updateWorkspace = (updatedWorkspace: IWorkspace) => {
    Client.updateWorkspace(updatedWorkspace)
      .then(() => {})
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const removeWorkspaceList = (workspaceListId: number) => {
    const updatedLists = [...lists].filter((list) => list.id !== workspaceListId);
    setLists(updatedLists);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        lists,
        setLists,
        workspace,
        setWorkspace,
        handleUpdateStarred,
        handleUpdateProperty,
        updateWorkspaceList,
        removeWorkspaceList,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContextProvider;
