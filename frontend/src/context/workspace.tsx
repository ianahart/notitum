import { IWorkspaceContext, IWorkspace } from '../interfaces';
import { createContext, useState } from 'react';
import { userState, tokenState, workspaceState } from '../state/initialState';
import { Client } from '../util/client';

interface IChildren {
  children: React.ReactNode;
}

export const WorkspaceContext = createContext<IWorkspaceContext | null>(null);

const WorkspaceContextProvider = ({ children }: IChildren) => {
  const [workspace, setWorkspace] = useState<IWorkspace>(workspaceState);

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

  const updateWorkspace = (updatedWorkspace: IWorkspace) => {
    Client.updateWorkspace(updatedWorkspace)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <WorkspaceContext.Provider
      value={{ workspace, setWorkspace, handleUpdateStarred, handleUpdateProperty }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContextProvider;
