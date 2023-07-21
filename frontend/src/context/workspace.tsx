import { IWorkspaceContext, IWorkspace, IList, ICard } from '../interfaces';
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

  const updateCard = <T,>(
    property: string,
    value: T,
    workspaceListId: number,
    cardId: number
  ) => {
    const workspaceListIndex = lists.findIndex((list) => list.id === workspaceListId);
    let updatedLists = [...lists];
    const cards = updatedLists[workspaceListIndex].cards.map((card) =>
      card.id === cardId ? { ...card, [property]: value } : card
    );
    updatedLists[workspaceListIndex].cards = [...cards];
    setLists(updatedLists);
  };

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

  const addCardToWorkspaceList = (workspaceListId: number, card: ICard) => {
    const updatedLists = lists.map((list) => {
      if (list.id === workspaceListId) {
        list.cards.push(card);
      }
      return list;
    });
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
        addCardToWorkspaceList,
        updateCard,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContextProvider;
