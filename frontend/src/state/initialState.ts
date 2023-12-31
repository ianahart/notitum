import { nanoid } from 'nanoid';

export const listState = {
  createdAt: new Date(),
  title: '',
  index: 0,
  xCoordinate: 0,
  yCoordinate: 0,
  updatedAt: new Date(),
  cards: [],
  id: 0,
};

export const minimalUserState = {
  id: 0,
  firstName: '',
  lastName: '',
  bio: '',
};

export const minimalUserForm = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  bio: { name: 'bio', value: '', error: '', type: 'text' },
};

export const cardState = {
  color: '',
  createdAt: new Date(),
  details: '',
  endDate: new Date(),
  id: 0,
  index: 0,
  label: '',
  startDate: new Date(),
  title: '',
  updatedAt: new Date(),
  activeLabels: [],
  coverPhoto: '',
};

export const filterCardState = [
  {
    id: 1,
    label: 'Sort by all workspaces',
    header: 'Sorting by all workspaces',
    checked: true,
    value: 'workspaces',
    workspaces: [],
  },
  {
    id: 2,
    label: 'Sort by single workspace',
    header: 'Sorting by single workspace',
    checked: false,
    value: 'workspace',
    workspaces: [],
  },
];

export const cardSortState = [
  {
    id: 1,
    label: 'Sort by no due date',
    header: 'Sorting by no due date',
    checked: true,
    value: 'noDueDate',
    workspaces: [],
  },
  {
    id: 2,
    label: 'Sort by due date',
    header: 'Sorting by due date',
    checked: false,
    value: 'dueDate',
    workspaces: [],
  },
];

export const cardDateState = [
  {
    id: 1,
    label: 'Show all cards',
    header: 'Showing all cards',
    checked: true,
    value: 'allCards',
    workspaces: [],
  },
];

export const aboutForm = {
  fullName: {
    name: 'fullName',
    value: '',
    error: '',
    type: 'text',
    label: 'full name',
    placeholder: 'Your full name',
  },
  publicName: {
    name: 'publicName',
    value: '',
    error: '',
    type: 'text',
    label: 'Public name',
    placeholder: 'Your public name',
  },
  jobTitle: {
    name: 'jobTitle',
    value: '',
    error: '',
    type: 'text',
    label: 'Job title',
    placeholder: 'Your job title',
  },
  department: {
    name: 'department',
    value: '',
    error: '',
    type: 'text',
    label: 'Department',
    placeholder: 'Your department',
  },
  organization: {
    name: 'organization',
    value: '',
    error: '',
    type: 'text',
    label: 'Organization',
    placeholder: 'Your organization',
  },
  location: {
    name: 'location',
    value: '',
    error: '',
    type: 'text',
    label: 'Based in',
    placeholder: 'Your location',
  },
};

export const profileState = {
  id: 0,
  department: '',
  firstName: '',
  jobTitle: '',
  lastName: '',
  location: '',
  locationVisible: false,
  organization: '',
  publicName: '',
  bio: '',
};

export const registerFormState = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
};

export const suggestedSearches = [
  'Productivity',
  'Perspective',
  'Organization',
  'Colorful',
  'Nature',
  'Business',
  'Minimal',
  'Animals',
  'Space',
  'Backgrounds',
];

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

export const labelColors = [
  { id: nanoid(), background: '#F1C93B' },
  { id: nanoid(), background: '#1A5D1A' },
  { id: nanoid(), background: '#A2FF86' },
  { id: nanoid(), background: '#B31312' },
  { id: nanoid(), background: '#E8A9A9' },
  { id: nanoid(), background: '#068FFF' },
  { id: nanoid(), background: '#090580' },
  { id: nanoid(), background: '#E57C23' },
  { id: nanoid(), background: '#FF55BB' },
  { id: nanoid(), background: '#a229ec' },
  { id: nanoid(), background: '#59652a' },
  { id: nanoid(), background: '#021f27' },
  { id: nanoid(), background: '#9acbae' },
  { id: nanoid(), background: '#32bcdf' },
  { id: nanoid(), background: '#ccc5b9' },
];

export const workspaceMenuState = {
  description: { name: 'description', value: 'About this workspace', open: false },
  background: { name: 'background', value: 'Change background', open: false },
  activity: { name: 'activity', value: 'Activity', open: false },
  menu: { name: 'menu', value: 'Menu', open: false },
};

export const workspaceState = {
  workspaceId: 0,
  background: '',
  createdAt: new Date(),
  title: '',
  visibility: '',
  userId: 0,
  updatedAt: new Date(),
  isStarred: false,
  description: '',
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
  profileId: 0,
  bio: '',
};

export const forgotPasswordState = {
  email: { name: 'email', value: '', error: '', type: 'email' },
};
