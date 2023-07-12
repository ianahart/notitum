import axios from 'axios';
import { IRegisterForm } from '../interfaces';

export const http = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
});

export const Client = {
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

  getPexelBackgrounds: (page: number, perPage: number) => {
    return http.get(`/pexels?page=${page}&perPage=${perPage}`);
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
