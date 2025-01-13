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

export { api }