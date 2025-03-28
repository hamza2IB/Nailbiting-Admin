import { api } from '@/services/api'
export const getAllVideos = async () => {
	const response = await api.get('/video/all')
	return response.data
}
export const deleteVideo = async (id) => {
	const response = await api.delete(`/video/delete/${id}`)
	return response.data
}
export const addVideo = async (values) => {
	const response = await api.post('/video/add', {
		title: values.title,
		description: values.description,
		url: values.youtubeLink,
		createdBy: values.createdBy,
	})
	return response.data.data
}
export const editVideo = async (values) => {
	const response = await api.put(`/video/update/${values._id}`, {
		title: values.title,
		description: values.description,
		url: values.youtubeLink,
	})
	return response.data.data
}
export const saveVideoOrder = async (videos) => {
	const response = await api.put('/video/order', { videos: videos })
	return response.data
}
