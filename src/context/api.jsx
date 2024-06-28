import axios from 'axios';

// Crear una instancia de axios
const api = axios.create({
  baseURL: 'https://walletgbackend-ff8754e83cc7.herokuapp.com',
});

// Añadir un interceptor de solicitud para añadir el token a cada solicitud
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


// Añadir un interceptor de respuesta para manejar la renovación del token
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      // Intenta renovar el token de acceso usando el refresh token
      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
