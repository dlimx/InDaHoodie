import axios from 'axios';
import { isDevelopment } from '../util/util';

const api = axios.create({
  baseURL: isDevelopment() ? 'http://localhost:3001/api' : '/api',
});

export default api;
