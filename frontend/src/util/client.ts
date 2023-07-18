import axios from 'axios';
import { IList, IRegisterForm, IWorkspace } from '../interfaces';

export const http = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
});

export const Client = {
  updateList(workspaceList: IList, workspaceListId: number, workspaceId: number) {
    return http.patch(`/lists/${workspaceListId}`, { workspaceList, workspaceId });
  },
  reorderLists: (data: { workspaceListId: number; index: number }[]) => {
    return http.post('/lists/reorder', { data });
  },
  getLists: (userId: number, workspaceId: number) => {
    return http.get(`/lists?userId=${userId}&workspaceId=${workspaceId}`);
  },
  createList: (userId: number, workspaceId: number, title: string, index: number) => {
    return http.post('/lists', { userId, workspaceId, title, index });
  },
  getStarredWorkspaces: (userId: number, isStarred: boolean) => {
    return http.get(`/workspaces/starred?userId=${userId}&isStarred=${isStarred}`);
  },
  removeActivity: (activityId: number) => {
    return http.delete(`/activities/${activityId}`);
  },
  getActivities: (
    userId: number,
    workspaceId: number,
    page: number,
    direction: string,
    pageSize: number
  ) => {
    return http.get(
      `/activities?userId=${userId}&workspaceId=${workspaceId}&page=${page}&direction=${direction}&pageSize=${pageSize}`
    );
  },

  createActivity: (text: string, userId: number, workspaceId: number) => {
    return http.post('/activities', { text, userId, workspaceId });
  },
  updateWorkspace: (workspace: IWorkspace) => {
    return http.put(`workspaces/${workspace.workspaceId}`, workspace);
  },
  getRecentlyViewedWorkspaces: (userId: number) => {
    return http.get(`/workspaces/recent?userId=${userId}`);
  },
  getWorkspace: (workspaceId: number, userId: number) => {
    return http.get(`/workspaces/${workspaceId}?userId=${userId}`);
  },
  fetchYourWorkspaces: (userId: number) => {
    return http.get(`/workspaces?userId=${userId}`);
  },
  createWorkSpace: (
    background: string,
    title: string,
    visibility: string,
    userId: number
  ) => {
    return http.post('/workspaces', {
      background,
      title,
      visibility: visibility.toUpperCase(),
      userId,
    });
  },

  getPexelBackgrounds: (page: number, perPage: number, query: string) => {
    return http.get(`/pexels?page=${page}&perPage=${perPage}&query=${query}`);
  },

  resetPassword: (
    id: string,
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    return http.post('/auth/reset-password', { id, token, newPassword, confirmPassword });
  },
  sendForgotPasswordEmail: (email: string) => {
    return http.post('/auth/forgot-password', { email });
  },
  heartbeat: () => {
    return http.get('/heartbeat');
  },
  logout: (refreshToken: string) => {
    return http.post('/auth/logout', { refreshToken });
  },
  register: (form: IRegisterForm, role: string) => {
    const data = {
      role,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    return http.post('/auth/register', data);
  },
  login: (email: string, password: string) => {
    return http.post('/auth/login', { email, password });
  },

  syncUser: (token: string) => {
    return http.get('/users/sync', {
      headers: { Authorization: 'Bearer ' + token },
    });
  },
};
