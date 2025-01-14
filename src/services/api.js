import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
api.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem(`accessToken`)
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-access-token`, {refreshToken});
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (error) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
					console.log(error, 'Error refreshing access token');
        }
      }
    }
    return Promise.reject(error);
  }
);

export { api }
