export const registerFormState = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
};

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
