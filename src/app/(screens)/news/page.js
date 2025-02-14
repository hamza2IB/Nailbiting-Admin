'use client'
import { useState, useEffect, useCallback } from 'react'
import NewsCard from '../../../components/news/NewsCard'
import NewsHeader from '@/components/news/NewsHeader'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAllNews, deleteNews } from '@/actions/news/news'
import DeleteModal from '@/components/shared/DeleteModal'
import NewsShimmer from '../../../components/shimmer/NewsShimmer'

export default function NotificationsPage() {
	const [newsData, setNewsData] = useState([])
	const router = useRouter()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [newID, setNewsID] = useState('')
	const [loading, setLoading] = useState(true)

	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	const fetchNews = useCallback(async (page = 1, query = '') => {
		setLoading(true)
		try {
			const response = await getAllNews(page)
			if (response.data) {
				setNewsData(response.data?.news)
				setTotalPages(response?.data?.totalPages)
			} else {
				console.error('Unexpected response format:', response.data)
			}
		} catch (error) {
			console.error('Failed to fetch news:', error)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchNews(currentPage)
	}, [currentPage])

	const handleDelete = async (id) => {
		setIsDeleteModalOpen(true)
		try {
			await deleteNews(newID)
			await fetchNews() // Fetch the list of news again after deletion
		} catch (error) {
			console.error('Failed to delete news:', error)
		}
	}
	const handleEdit = (id) => {
		router.push(`/news/add?id=${id}`)
	}

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	const renderPagination = () => {
		const startPage = Math.max(1, currentPage - 1)
		const endPage = Math.min(totalPages, currentPage + 1)
		let pageRange = []
		for (let i = startPage; i <= endPage; i++) {
			pageRange.push(i)
		}
		if (pageRange.length < 3) {
			if (startPage > 1) {
				pageRange.unshift(startPage - 1)
			}
			if (endPage < totalPages) {
				pageRange.push(endPage + 1)
			}
		}
		if (currentPage > 3) {
			pageRange = [1, '...'].concat(pageRange)
		}
		if (currentPage < totalPages - 2) {
			pageRange = pageRange.concat(['...', totalPages])
		}
		return pageRange.map((page, index) => {
			if (page === '...') {
				return (
					<span key={`ellipsis-${index}`} className='px-2 text-gray-600'>
						...
					</span>
				)
			}
			return (
				<button
					key={`page-${page}`}
					onClick={() => handlePageChange(page)}
					className={`px-3 py-1 border rounded-md ${
						currentPage === page
							? 'text-white bg-[#199A8E] hover:bg-[#199A8E]'
							: 'text-gray-600 bg-white hover:bg-[#199a8d7f] hover:text-white'
					}`}>
					{page}
				</button>
			)
		})
	}

	return (
		<div className='mx-auto'>
			<div className='flex flex-wrap bg-white p-4 sm:p-6 lg:p-8 items-start justify-between'>
				<NewsHeader
					title='お知らせ管理' // Pass title prop
					description='このページからお知らせの新規作成や削除などができます' // Pass description prop
				/>
				<Link href='/news/add'>
					<div className='flex gap-2 justify-between bg-[#199A8E] cursor-pointer rounded-[8px] px-4 py-[10px] hover:bg-[#1d736a] mb-6'>
						<Image src='/svgs/auth/plus.svg' alt='Logo' width={20} height={20} />
						<div className='text-white text-sm transition-colors'>新規作成</div>
					</div>
				</Link>
			</div>
			<div className='flex gap-[18px] p-4 pt-8 sm:p-6 lg:p-8 flex-col overflow-y-auto pr-5 h-[calc(100vh - 13px)]'>
				{loading ? (
					Array.from({ length: 4 }).map((_, index) => <NewsShimmer key={index} />)
				) : newsData.length > 0 ? (
					newsData.map((news) => (
						<div key={news._id}>
							<NewsCard
								news={news}
								onDelete={() => {
									setNewsID(news?._id)
									setIsDeleteModalOpen(true)
								}}
								onEdit={() => handleEdit(news._id)}
							/>
						</div>
					))
				) : (
					<div className='flex justify-center items-center w-full'>
						<div className='text-gray-500'>お知らせがありません。</div>
					</div>
				)}
				{newsData?.length > 0 && (
					<div className='flex items-center justify-end w-full pb-3 mt-4'>
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							className={`px-3 py-1 rounded-md ${
								currentPage === 1
									? 'text-gray-400 bg-gray-200 cursor-not-allowed'
									: 'text-gray-600 bg-white hover:bg-[#199A8E] hover:text-white'
							}`}
							disabled={currentPage === 1}>
							前へ
						</button>

						{renderPagination()}

						<button
							onClick={() => handlePageChange(currentPage + 1)}
							className={`px-3 py-1 rounded-md ${
								currentPage === totalPages
									? 'text-gray-400 bg-gray-200 cursor-not-allowed'
									: 'text-gray-600 bg-white hover:bg-[#199A8E] cursor-pointer hover:text-white'
							}`}
							disabled={currentPage === totalPages}>
							次
						</button>
					</div>
				)}
			</div>
			{isDeleteModalOpen && (
				<DeleteModal
					isOpen={isDeleteModalOpen}
					onClose={() => setIsDeleteModalOpen(false)}
					onConfirm={() => {
						handleDelete()
						setIsDeleteModalOpen(false)
					}}
					title='動画の削除'
					message={`実行してよろしいですか？このアクションは取り消すことができません。`}
				/>
			)}
		</div>
	)
}
