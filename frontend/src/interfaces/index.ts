export interface IRegisterForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
}

export interface IWorkspaceMenus {
  description: { name: string; value: string; open: boolean };
  background: { name: string; value: string; open: boolean };
  activity: { name: string; value: string; open: boolean };
  menu: { name: string; value: string; open: boolean };
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
}

export interface IUserContext {
  tokens: ITokens;
  user: IUser;
  stowTokens: (tokens: ITokens) => void;
  updateUser: (user: IUser) => void;
  logout: () => void;
}

export interface IWorkspaceContext {
  lists: IList[];
  setLists: (lists: IList[]) => void;
  workspace: IWorkspace;
  setWorkspace: (workspace: IWorkspace) => void;
  handleUpdateProperty: <T>(value: T, property: string) => void;
  handleUpdateStarred: () => void;
  updateWorkspaceList: (key: string, title: string, workspaceListId: number) => void;
}
