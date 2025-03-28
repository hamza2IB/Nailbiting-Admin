'use client'

import react, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NewsHeader from '@/components/news/NewsHeader'
import VideoTable from '@/components/videos/VideoTable'
import VideosModal from '@/components/videos/VideosModal'
import EditVideosModal from '@/components/videos/EditVideosModal'
import DeleteModal from '@/components/shared/DeleteModal'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { deleteVideo, getAllVideos, addVideo, saveVideoOrder, editVideo } from '@/actions/videos/videos'
import Shimmer from '@/components/shimmer/videoShimmer'
export default function ExercisesPage() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [videoToBeEdit, setVideoToBeEdit] = useState({})
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [videoToDelete, setVideoToDelete] = useState(null)
	const [videos, setVideos] = useState([])
	const [videoID, setVideoID] = useState('')
	const [loading, setLoading] = useState(true)

	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await getAllVideos()
			setVideos(response?.data)
		} catch (error) {
			console.error('Failed to fetch videos:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])
	const toggleModal = () => setIsModalOpen(!isModalOpen)
	const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen)

	const handleDelete = (id) => {
		setVideoID(id)
		setIsDeleteModalOpen(true)
	}

	const handleEdit = (video) => {
		setVideoID(video._id)
		setVideoToBeEdit(video)
		setIsEditModalOpen(true)
	}

	const handleConfirmDelete = async () => {
		try {
			await deleteVideo(videoID)
			setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoID))
			setIsDeleteModalOpen(false)
		} catch (error) {
			console.error('Failed to delete news:', error)
		}
	}
	const handleSave = async () => {
		try {
			await saveVideoOrder(videos)
			await fetchData()
		} catch (error) {
			console.error('Failed to save video order:', error)
		}
	}

	const handleDragAndDrop = (dragIndex, hoverIndex) => {
		const updatedVideos = [...videos]
		const [draggedVideo] = updatedVideos.splice(dragIndex, 1)
		updatedVideos.splice(hoverIndex, 0, draggedVideo)
		setVideos(updatedVideos)
	}
	const isMaxVideosReached = videos.length >= 5

	return (
		<DndProvider backend={HTML5Backend}>
			<main className=' w-full'>
				<div className='w-full'>
					<div className='mb-[14px] p-8 flex bg-white flex-1 flex-wrap items-center justify-between'>
						<NewsHeader title='動画管理' description='このページから動画の登録や削除などができます' />
						<button
							onClick={toggleModal}
							disabled={isMaxVideosReached}
							className={`flex items-center gap-2 rounded-[8px] px-4 py-[10px] text-sm text-white transition ${
								isMaxVideosReached ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#199A8E] hover:bg-[#1d736a]'
							}`}>
							<Image src='/svgs/auth/plus.svg' alt='Add Video' width={20} height={20} />
							<span>新規追加</span>
						</button>
					</div>
					<div className='p-4 pt-8 sm:p-6 lg:p-8'>
						{loading ? (
							<Shimmer />
						) : videos.length === 0 ? (
							<div className='w-full flex justify-center text-gray-500'>
								<div>動画が見つかりませんでした。</div>
							</div>
						) : (
							<VideoTable
								videos={videos}
								onDelete={handleDelete}
								onEdit={handleEdit}
								setVideoToDelete={setVideoToDelete}
								moveVideo={handleDragAndDrop}
								isMaxVideosReached={isMaxVideosReached}
								onSave={handleSave}
							/>
						)}
					</div>
				</div>

				{isModalOpen && (
					<VideosModal
						isOpen={isModalOpen}
						toggleModal={toggleModal}
						formData={{
							youtubeLink: '',
							title: '',
							description: '',
						}}
						handleChange={() => {}}
						handleSubmit={async (values) => {
							const data = await addVideo(values)
							setVideos((prevVideos) => [...prevVideos, data])
							setIsModalOpen(false)
						}}
					/>
				)}

				{isEditModalOpen && (
					<EditVideosModal
						isOpen={isEditModalOpen}
						toggleModal={toggleEditModal}
						formData={{
							_id: videoToBeEdit?._id,
							youtubeLink: videoToBeEdit?.url,
							title: videoToBeEdit?.title,
							description: videoToBeEdit?.description,
						}}
						handleChange={() => {}}
						handleSubmit={async (values) => {
							const data = await editVideo(values)
							setVideos((prevVideos) => prevVideos.map((video) => (video._id === data._id ? data : video)))
							setIsEditModalOpen(false)
						}}
					/>
				)}

				{isDeleteModalOpen && (
					<DeleteModal
						isOpen={isDeleteModalOpen}
						onClose={() => setIsDeleteModalOpen(false)}
						onConfirm={handleConfirmDelete}
						title='動画の削除'
						message={`実行してよろしいですか？このアクションは取り消すことができません。`}
					/>
				)}
			</main>
		</DndProvider>
	)
}
