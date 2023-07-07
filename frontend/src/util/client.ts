import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
});

export const Client = {};
