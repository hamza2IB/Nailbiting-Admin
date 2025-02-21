'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye } from 'lucide-react'
import RightUserModal from '@/components/users/rightUserModal'
import { getUserById } from '@/actions/user/user'
import { getMonthlyAssessments } from '@/actions/assessment/assessment'
import EvaluationShimmer from '@/components/shimmer/evaluationShimmer'
import UserDetailShimmer from '@/components/shimmer/UserDetailShimmer'
import PhotosShimmer from '@/components/shimmer/ImagesShimmer'
function UserDetail({ params }) {
	const userId = use(params)?.id
	const router = useRouter()
	const [activeTab, setActiveTab] = useState('自己評価')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [user, setUser] = useState(null)
	const [allNailPhotos, setAllNailPhotos] = useState([])
	const [selectedPhoto, setSelectedPhoto] = useState(null)
	const [selectedEvaluation, setSelectedEvaluation] = useState(null)
	const [selectedMonth, setSelectedMonth] = useState(null)
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
	const [filteredEvaluations, setFilteredEvaluations] = useState([])
	const fetchUser = async () => {
		if (userId) {
			try {
				setIsLoading(true)
				const userData = await getUserById(userId)
				let date = new Date().getMonth() + 1
				let year = new Date().getFullYear()
				await fetchAssessmentByMonth(userId, date, year)
				setUser(userData)
			} catch (error) {
				console.error('Failed to fetch user information:', error)
			} finally {
				setIsLoading(false)
			}
		}
	}

	const fetchAssessmentByMonth = async (userId, selectedMonth, selectedYear) => {
		if (userId && selectedMonth && selectedYear) {
			try {
				const month = /^[0-9]+$/.test(selectedMonth) ? selectedMonth : selectedMonth.replace(/[^\d]/g, '');
				setIsLoading(true)
				const assessments = await getMonthlyAssessments(userId, month, selectedYear)
				const nailPhotos = assessments.map((result) => result.nailPhoto).flat()
				setAllNailPhotos(nailPhotos)
				setFilteredEvaluations(assessments)
			} catch (error) {
				console.error('Failed to fetch assessment data:', error)
			} finally {
				setIsLoading(false)
			}
		}
	}

	useEffect(() => {
		fetchUser()
	}, [userId])

	useEffect(() => {
		fetchAssessmentByMonth(userId, selectedMonth, selectedYear)
	}, [selectedMonth, selectedYear])

	const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`)
	const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

	const toggleDropdown = (e) => {
		if (e.target === e.currentTarget) {
			setIsDropdownOpen((prev) => !prev)
		}
	}

	const handleMonthSelect = async (month) => {
		setSelectedMonth(month)
		setIsDropdownOpen(false)
		await fetchAssessmentByMonth(userId, month, selectedYear)
	}

	const handleYearSelect = (year) => {
		setSelectedYear(year)
		setIsYearDropdownOpen(false)
	}

	const filterEvaluations = (evaluations) => {
		if (!evaluations) return

		const filtered = evaluations.filter((evaluation) => {
			const evaluationDate = new Date(evaluation.createdAt)
			const evaluationMonth = `${evaluationDate.getMonth() + 1}月`
			const evaluationYear = evaluationDate.getFullYear()

			return (!selectedMonth || selectedMonth === evaluationMonth) && (!selectedYear || selectedYear === evaluationYear)
		})
		setFilteredEvaluations(filtered)
	}

	const renderStars = (count) => (
		<div className='flex gap-1 max-w-[100px] justify-center items-center'>
			{count > 0 ? (
				Array(count)
					.fill(null)
					.map((_, i) => <img key={i} src='/svgs/videos/star.svg' alt='Star' />)
			) : (
				<span>N/A</span>
			)}
		</div>
	)

	const renderEvaluationsTable = () => (
		<div>
			{filteredEvaluations.length === 0 && !user ? (
				<EvaluationShimmer />
			) : (
				<>
					<div className='flex flex-row items-center justify-end mb-5'>
						<div onClick={toggleDropdown} className='p-3 gap-2 flex flex-row cursor-pointer relative border rounded-lg'>
							<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M17.5 8.33268H2.5M13.3333 1.66602V4.99935M6.66667 1.66602V4.99935M6.5 18.3327H13.5C14.9001 18.3327 15.6002 18.3327 16.135 18.0602C16.6054 17.8205 16.9878 17.4381 17.2275 16.9677C17.5 16.4329 17.5 15.7328 17.5 14.3327V7.33268C17.5 5.93255 17.5 5.23249 17.2275 4.69771C16.9878 4.2273 16.6054 3.84485 16.135 3.60517C15.6002 3.33268 14.9001 3.33268 13.5 3.33268H6.5C5.09987 3.33268 4.3998 3.33268 3.86502 3.60517C3.39462 3.84485 3.01217 4.2273 2.77248 4.69771C2.5 5.23249 2.5 5.93255 2.5 7.33268V14.3327C2.5 15.7328 2.5 16.4329 2.77248 16.9677C3.01217 17.4381 3.39462 17.8205 3.86502 18.0602C4.3998 18.3327 5.09987 18.3327 6.5 18.3327Z'
									stroke='#344054'
									strokeWidth='1.66667'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>

							<p className='text-[#667085] text-sm' onClick={toggleDropdown}>
								{selectedMonth || '月の選択'}
							</p>
							{isDropdownOpen && (
								<div className='absolute mt-2 right-0 top-[50px] w-[348px] bg-white border rounded-lg shadow-lg grid grid-cols-3 gap-2 p-2'>
									<div className='col-span-3 mb-2 max-h-40 overflow-y-auto'>
										<div
											className='p-2 border rounded-md cursor-pointer'
											onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}>
											{selectedYear}
										</div>
										{isYearDropdownOpen && (
											<div className='max-h-40 overflow-y-auto border rounded-md mt-2'>
												{years.map((year) => (
													<div
														key={year}
														className={`p-2 cursor-pointer hover:bg-gray-200 ${
															selectedYear === year ? 'bg-gray-300' : ''
														}`}
														onClick={() => handleYearSelect(year)}>
														{year}
													</div>
												))}
											</div>
										)}
									</div>
									{months.map((month) => (
										<div
											key={month}
											className={`p-2 cursor-pointer items-center justify-center rounded-md hover:bg-[#ECFDF3] ${
												selectedMonth === month ? 'bg-[#199A8E] hover:text-black text-white' : ''
											}`}
											onClick={() => handleMonthSelect(month)}>
											<p className='text-center text-sm'>{month}</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<div className='overflow-auto max-h-[500px]'>
						{filteredEvaluations.length === 0 ? (
							<p className='text-center text-gray-500'>自己評価が見つかりませんでした。</p>
						) : (
							<table className='w-full min-w-[800px]'>
								<thead>
									<tr className='border-b border-t text-[#475467] text-xs'>
										<th className='py-4 px-6 text-left font-normal'>日付</th>
										<th className='py-4 px-6 text-left font-normal'>本日の自己評価</th>
										<th className='py-4 px-6 text-left font-normal'>エクササイズ評価</th>
										<th className='py-4 px-6 text-left font-normal'>合計点数/月</th>
										<th className='py-4 px-6 text-center font-normal'>アクション</th>
									</tr>
								</thead>
								<tbody>
									{filteredEvaluations.map((evaluation, index) => (
										<tr key={index} className='border-b last:border-b-0 text-sm'>
											<td className='py-4 px-6'>
												{evaluation?.createdAt
													? new Date(evaluation.createdAt).toLocaleDateString('ja-JP', {
															year: 'numeric',
															month: 'long',
															day: 'numeric',
													  })
													: 'N/A'}
											</td>
											<td className='py-4 px-6 flex justify-center items-center max-w-32'>
												<div>{evaluation?.pointRating ? `${evaluation?.pointRating}/5` : 'N/A'}</div>
											</td>
											<td className='py-4 px-6'>{renderStars(evaluation?.starRating || 'N/A')}</td>
											<td className='py-4 px-6 flex justify-center items-center max-w-28'>
												<div>{evaluation?.monthlyPoints || 'N/A'}</div>
											</td>
											<td className='py-4 px-6'>
												<div className='flex justify-center'>
													<button
														onClick={() => {
															setIsModalOpen(true)
															setSelectedEvaluation(evaluation)
														}}
														className='p-2 hover:bg-gray-100 rounded-full'>
														<Eye id='eye-icon-btn' className='w-5 h-5 text-gray-600' />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
					<RightUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={selectedEvaluation} />
				</>
			)}
		</div>
	)

	const renderPhotosGrid = () => {
		if (isLoading) {
			return <PhotosShimmer />
		}
		if (allNailPhotos.length === 0) {
			return (
				<div className='text-center text-gray-500'>
					<p>写真が見つかりませんでした。</p>
				</div>
			)
		}
		return (
			<div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4'>
				{allNailPhotos.map((photo, index) => (
					<div
						key={index}
						className='aspect-square h-[250px] sm:h-full w-full relative rounded-lg overflow-hidden group'>
						<img
							src='/svgs/videos/eye.svg'
							alt={`Photo ${index + 1}`}
							onClick={() => setSelectedPhoto(photo)}
							className='absolute inset-0 m-auto w-10 h-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'
						/>
						<img
							src={photo}
							alt={`Photo ${index + 1}`}
							className='object-cover object-top hover:cursor-pointer h-[250px] z-10 sm:h-full w-full'
							onClick={() => setSelectedPhoto(photo)}
						/>
					</div>
				))}
			</div>
		)
	}

	const PhotoModal = ({ isOpen, onClose, photo }) => {
		if (!isOpen) return null

		return (
			<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50' onClick={onClose}>
				<div className='relative' onClick={(e) => e.stopPropagation()}>
					<img src={photo} alt='Expanded view' className='max-w-full max-h-full rounded-md' />
					<button onClick={onClose} className='absolute -top-8 -right-2 text-white p-4 text-[50px]'>
						&times;
					</button>
				</div>
			</div>
		)
	}

	const renderTabContent = () => (activeTab === '自己評価' ? renderEvaluationsTable() : renderPhotosGrid())

	const renderUserDetails = () => {
		if (!user) {
			return <UserDetailShimmer />
		}

		return (
			<div className='bg-white rounded-lg shadow mb-[10px]'>
				<div className='p-6'>
					<div className='flex items-start space-x-4'>
						<img
							src={
								user?.profilePicture ||
								'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
							}
							alt={user?.name || 'N/A'}
							className='w-20 h-20 rounded-full object-cover object-top'
						/>
						<div className='flex-1'>
							<h2 className='text-2xl font-semibold text-gray-900'>{user?.name || 'N/A'}</h2>
							<p className='text-gray-600 mt-1'>{user?.email || 'N/A'}</p>
							<p className='text-gray-500 text-sm mt-1'>
								登録日：
								{user?.createdAt
									? new Date(user.createdAt).toLocaleDateString('ja-JP', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
									  })
									: 'N/A'}
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='pt-5'>
				<div className='mx-auto px-4 py-4 sm:px-6 lg:px-8'>
					<button onClick={() => router.back()} className='flex items-center text-gray-600 hover:text-gray-900'>
						<ArrowLeft className='h-5 w-5 mr-2 text-black' />
						<span className='text-[30px] text-[30px] text-[#000000]'>ユーザー詳細</span>
					</button>
				</div>
			</div>

			<div className='mx-auto px-4 py-6 sm:px-6 lg:px-8'>
				{renderUserDetails()}
				<div className='bg-white rounded-lg shadow'>
					<div className='p-6'>
						{user && ( // Only render buttons if user data is available
							<div className='flex gap-3 pb-6'>
								<button
									onClick={() => setActiveTab('自己評価')}
									className={`px-10 py-3 rounded-lg transition-colors ${
										activeTab === '自己評価' ? 'bg-[#199A8E] text-white' : 'bg-[#ECFDF3] text-[#199A8E]'
									}`}>
									自己評価
								</button>
								<button
									onClick={() => setActiveTab('他の写真')}
									className={`px-10 py-3 rounded-lg transition-colors ${
										activeTab === '他の写真' ? 'bg-[#199A8E] text-white' : 'bg-[#ECFDF3] text-[#199A8E]'
									}`}>
									他の写真
								</button>
							</div>
						)}
						{renderTabContent()}
					</div>
				</div>
			</div>
			<PhotoModal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} photo={selectedPhoto} />
		</div>
	)
}

export default UserDetail
