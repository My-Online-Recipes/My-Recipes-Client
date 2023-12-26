import axios from 'axios';

const baseURL =
    process.env.REACT_APP_NODE_ENV === 'production'
        ? process.env.REACT_APP_API_BASE_URL_PRODUCTION
        : process.env.REACT_APP_API_BASE_URL_LOCAL;

const instance = axios.create({
    baseURL,
});

export default instance;