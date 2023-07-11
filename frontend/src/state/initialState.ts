import { nanoid } from 'nanoid';

export const registerFormState = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
};

export const colorsState = [
  { id: nanoid(), background: '#F1C93B' },
  { id: nanoid(), background: '#1A5D1A' },
  { id: nanoid(), background: '#A2FF86' },
  { id: nanoid(), background: '#B31312' },
  { id: nanoid(), background: '#E8A9A9' },
  { id: nanoid(), background: '#068FFF' },
  { id: nanoid(), background: '#090580' },
  { id: nanoid(), background: '#E57C23' },
  { id: nanoid(), background: '#FF55BB' },
];

export const loginFormState = {
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
};

export const resetPasswordFormState = {
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
};

export const navMenusState = {
  workspace: { open: false, name: 'workspace' },
  starred: { open: false, name: 'starred' },
  recent: { open: false, name: 'recent' },
};

export const tokenState = {
  refreshToken: '',
  token: '',
};

export const userState = {
  abbreviation: '',
  email: '',
  id: 0,
  lastName: '',
  firstName: '',
  loggedIn: false,
  role: '',
};

export const forgotPasswordState = {
  email: { name: 'email', value: '', error: '', type: 'email' },
};
