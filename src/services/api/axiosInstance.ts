import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
    },
});

export default axiosInstance;