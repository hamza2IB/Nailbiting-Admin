'use client'
import { useState, useEffect, useCallback } from 'react'
import NewsHeader from '@/components/news/NewsHeader'
import UserTable from '@/components/users/usersTable'
import { Search } from 'lucide-react'
import DeleteModal from '@/components/shared/DeleteModal'
import { getAllUsers, deleteUser, searchUsers } from '@/actions/user/user'
import UsersShimmer from '@/components/shimmer/usersShimmer'

export default function UsersPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [filteredUsers, setFilteredUsers] = useState([])
	const [users, setUsers] = useState([])
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [userID, setUserID] = useState('')
	const [pagesBackend, setPagesBackend] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	const fetchUsers = useCallback(async (page = 1, query = '') => {
		try {
			setIsLoading(true)
			const response = query ? await searchUsers(query, page) : await getAllUsers(page)

			setUsers(response?.users || [])
			setFilteredUsers(response?.users || [])
			setPagesBackend(response?.totalPages)
			setTotalPages(response?.totalPages)
		} catch (error) {
			console.error('Error fetching users:', error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchUsers(currentPage, searchQuery)
	}, [currentPage, searchQuery, fetchUsers])

	const handleSearch = async (event) => {
		const query = event.target.value.toLowerCase()
		setSearchQuery(query)
		setCurrentPage(1)
	}

	const handleDelete = (id) => {
		setUserID(id)
		setIsDeleteModalOpen(true)
	}

	const handleConfirmDelete = async () => {
		try {
			await deleteUser(userID)
			await fetchUsers(currentPage, searchQuery)
			setIsDeleteModalOpen(false)
		} catch (error) {
			console.error('Failed to delete user:', error)
		}
	}

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	const renderPagination = () => {
		const startPage = Math.max(1, currentPage - 1) // Ensures we start showing pages before the current page
		const endPage = Math.min(totalPages, currentPage + 1) // Ensures we don't exceed totalPages

		// Adjust the range to always show 3 buttons
		let pageRange = []
		for (let i = startPage; i <= endPage; i++) {
			pageRange.push(i)
		}

		// If there are less than 3 buttons, add missing pages from the edges (if possible)
		if (pageRange.length < 3) {
			if (startPage > 1) {
				pageRange.unshift(startPage - 1)
			}
			if (endPage < totalPages) {
				pageRange.push(endPage + 1)
			}
		}

		// Show '1' and '...'
		if (currentPage > 3) {
			pageRange = [1, '...'].concat(pageRange)
		}
		if (currentPage < totalPages - 2) {
			pageRange = pageRange.concat(['...', totalPages])
		}

		// Ensure that the `key` is unique by using both page number and the context
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
					key={`page-${page}`} // Use the page number to ensure uniqueness
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
			{/* Header Section */}
			<div className='flex flex-wrap bg-white p-4 sm:p-6 lg:p-8 items-start justify-between'>
				<NewsHeader title='ユーザー管理' description='このページからユーザー情報の確認などができます' />
			</div>

			{/* Search Section */}
			<div className='flex justify-end w-full p-4 pt-8 sm:p-6 lg:p-8'>
				<div className='flex items-center border p-3 rounded-xl w-full max-w-[367px] bg-white'>
					<Search className='h-5 w-5 text-gray-500 mr-2' />
					<input
						className='border-none outline-none w-full'
						placeholder='検索する'
						value={searchQuery}
						onChange={handleSearch}
					/>
				</div>
			</div>

			<div className='px-4 sm:px-6 lg:px-8'>
				<div className='overflow-hidden'>
					{isLoading ? <UsersShimmer /> : <UserTable users={filteredUsers} onDelete={handleDelete} />}

					{filteredUsers?.length === 0 && !isLoading && (
						<div className='text-center text-gray-500 mt-4'>ユーザーが見つかりません。</div>
					)}

					{filteredUsers?.length > 0 && !isLoading && (
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
			</div>

			{isDeleteModalOpen && (
				<DeleteModal
					isOpen={isDeleteModalOpen}
					onClose={() => setIsDeleteModalOpen(false)}
					onConfirm={handleConfirmDelete}
					title='ユーザーの削除'
					message='実行してよろしいですか？このアクションは取り消すことができません。'
				/>
			)}
		</div>
	)
}
