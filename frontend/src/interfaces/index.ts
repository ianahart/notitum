export interface IRegisterForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
}

export interface IMinimalUser {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
}

export interface IMinimalUserForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  bio: { name: string; value: string; error: string; type: string };
}

export interface IAboutForm {
  fullName: {
    name: string;
    value: string;
    error: string;
    type: string;
    label: string;
    placeholder: string;
  };
  publicName: {
    name: string;
    value: string;
    error: string;
    type: string;
    label: string;
    placeholder: string;
  };
  jobTitle: {
    name: string;
    value: string;
    error: string;
    type: string;
    label: string;
    placeholder: string;
  };
  department: {
    name: string;
    value: string;
    error: string;
    type: string;
    label: string;
    placeholder: string;
  };
  organization: {
    name: string;
    value: string;
    error: string;
    type: string;
    label: string;
    placeholder: string;
  };
  location: {
    name: string;
    value: string;
    error: string;
    type: string;
    label: string;
    placeholder: string;
  };
}

export interface IWorkspaceMenus {
  description: { name: string; value: string; open: boolean };
  background: { name: string; value: string; open: boolean };
  activity: { name: string; value: string; open: boolean };
  menu: { name: string; value: string; open: boolean };
}

export interface IActiveLabel extends ILabel {
  labelId: number;
}

export interface IComment {
  id: number;
  createdAt: Date;
  text: string;
  firstName: string;
  lastName: string;
  isOpen: boolean;
  userId: number;
}

export interface IChecklistItemMember {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IChecklistItem {
  createdAt: Date;
  id: number;
  isComplete: boolean;
  title: string;
  updatedAt: Date;
  assignees: string;
}

export interface IChecklist {
  createdAt: Date;
  updatedAt: Date;
  title: string;
  isComplete: boolean;
  id: number;
  checklistItems: IChecklistItem[];
}

export interface ISearchWorkspace {
  workspaceId: number;
  background: string;
  title: string;
  visibility: string;
  userId: number;
}

export interface ILabel {
  id: number;
  isChecked: boolean;
  title: string;
  color: string;
  createdAt: Date;
}

export interface ICard {
  color: string;
  createdAt: Date;
  details: string;
  endDate: Date | null;
  id: number;
  index: number;
  label: string;
  startDate: Date | null;
  title: string;
  updatedAt: Date;
  activeLabels: IActiveLabel[];
  coverPhoto: string | null;
}

export interface IMember {
  id: number;
  firstName: string;
  lastName: string;
  userId: number;
  profileId: number;
}

export interface IList {
  [key: string]: any;
  id: number;
  createdAt: Date;
  title: string;
  index: number;
  xCoordinate: number;
  yCoordinate: number;
  updatedAt: Date;
  cards: ICard[];
}

export interface IPexels {
  id: string;
  background: string;
}

export interface IActivity {
  activityId: number;
  createdAt: Date;
  text: string;
}

export interface IPagination {
  pageSize: number;
  direction: string;
  page: number;
  totalPages: number;
}

export interface IWorkspace {
  workspaceId: number;
  background: string;
  createdAt: Date;
  title: string;
  visibility: string;
  userId: number;
  updatedAt: Date;
  isStarred: boolean;
  description: string;
}

export interface INavMenus {
  workspace: { open: boolean; name: string };
  recent: { open: boolean; name: string };
  starred: { open: boolean; name: string };
}

export interface ILoginForm {
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
}

export interface IResetPasswordForm {
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
}

export interface IForgotPassword {
  email: { name: string; value: string; error: string; type: string };
}

export interface ITokens {
  refreshToken: string;
  token: string;
}

export interface IUser {
  abbreviation: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  loggedIn: boolean;
  role: string;
  profileId: number;
  bio: string;
}

export interface IUserContext {
  tokens: ITokens;
  user: IUser;
  stowTokens: (tokens: ITokens) => void;
  updateUser: (user: IUser) => void;
  logout: () => void;
  activeAccountLink: string;
  setActiveAccountLink: (activeAccountLink: string) => void;
}

export interface IWorkspaceContext {
  lists: IList[];
  setLists: (lists: IList[]) => void;
  workspace: IWorkspace;
  setWorkspace: (workspace: IWorkspace) => void;
  handleUpdateProperty: <T>(value: T, property: string) => void;
  handleUpdateStarred: () => void;
  updateWorkspaceList: (key: string, title: string, workspaceListId: number) => void;
  removeWorkspaceList: (workspaceListId: number) => void;
  addCardToWorkspaceList: (workspaceListId: number, card: ICard) => void;
  updateCard: <T>(
    property: string,
    value: T,
    workspaceListId: number,
    cardId: number
  ) => void;
}
