'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { getAllUsers } from '@/actions/user/user'
import { getNewsById, updateNews, addNews } from '@/actions/news/news'
import NewsHeader from '@/components/news/NewsHeader'
import RenderField from '@/components/shared/RenderField'
import { useRouter } from 'next/navigation'

export default function CreateNotification() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const newsId = searchParams.get('id') // Extract the `id` parameter from the URL
	const { quill, quillRef } = useQuill()
	const formikRef = useRef(null)
	const [newsDetail, setNewsDetail] = useState({
		title: '',
		content: '',
		isGlobal: true,
		targetUsers: [],
	})
	const [isEditMode, setIsEditMode] = useState(false)
	const [users, setAllUsers] = useState([])
	const validationSchema = Yup.object().shape({
		title: Yup.string().required('タイトルは必須です'),
		content: Yup.string().required('本文は必須です'),
	})

	useEffect(() => {
		if (quill) {
			if (formikRef.current) {
				const handleTextChange = () => {
					formikRef.current.setFieldValue('content', quill.root.innerHTML)
				}
				quill.on('text-change', handleTextChange)
				return () => {
					quill.off('text-change', handleTextChange) // Cleanup listener
				}
			}
		}
	}, [quill])

	useEffect(() => {
		const fetchNewsDetails = async () => {
			if (newsId) {
				setIsEditMode(true)
				try {
					const news = await getNewsById(newsId)
					setNewsDetail({
						title: news?.data?.title || '',
						content: news?.data?.body || '',
						isGlobal: news?.data?.isGlobal,
						targetUsers: news?.data?.targetUsers,
					})
					if (quill) {
						quill.clipboard.dangerouslyPasteHTML(news?.data?.body || '') // Prefill Quill editor
					}
				} catch (error) {
					console.error('Failed to fetch news details:', error)
				}
			}
		}
		const fetchAllUsers = async () => {
			try {
				const response = await getAllUsers()
				const usersData = response.users.map((user) => ({
					value: user._id,
					label: user.name,
				}))
				setAllUsers(usersData)
			} catch (error) {
				console.error('Failed to fetch users:', error)
			}
		}
		fetchAllUsers()
		fetchNewsDetails()
	}, [newsId, quill])

	console.log(newsDetail)

	return (
		<div className='mx-auto'>
			<div className='flex flex-wrap bg-white p-4 sm:p-6 lg:p-8 mb-8 items-start justify-between'>
				<NewsHeader title='お知らせ管理' description='このページからお知らせの新規作成や削除などができます' />
			</div>
			<div className='px-4 sm:px-6 lg:px-8'>
				<div className='bg-white p-6 rounded-[20px] border border-[#EAECF0]'>
					<Formik
						innerRef={formikRef}
						initialValues={{
							title: newsDetail.title || '',
							content: newsDetail.body || '',
							targetUsers: newsDetail.targetUsers,
							isGlobal: newsDetail.isGlobal,
						}}
						enableReinitialize
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							try {
								if (values.isGlobal) {
									values.targetUsers = []
								}
								if (isEditMode) {
									await updateNews(newsId, values) // Update existing news
								} else {
									await addNews(values) // Add new news
								}
								router.push('/news') // Redirect to /news after successful submission
							} catch (error) {
								console.error('Failed to submit form:', error)
							}
						}}>
						{({ values, errors, touched, setFieldValue }) => {
							console.log(values, 'values')
							return (
								<Form className='space-y-6'>
									<div className='pb-5'>
										<h1 className='text-[26px] font-bold text-[#181A20]'>
											{isEditMode ? 'お知らせの編集' : 'お知らせの作成'}
										</h1>
									</div>

									<div className='flex gap-[6px]'>
										<h3 className='text-[14px] leading-[22px] text-[#1D2026]'>送付先:</h3>
										<div className='flex items-center gap-[6px]'>
											<label className='flex items-center cursor-pointer group'>
												<div className='relative w-4 h-4 mr-2'>
													<input
														type='radio'
														name='isGlobal'
														value={true}
														checked={values.isGlobal}
														onChange={() => setFieldValue('isGlobal', true)}
														className='peer sr-only'
													/>
													<div className='w-4 h-4 border-2 border-gray-400 rounded-full peer-checked:border-[#199A8E] transition-colors'></div>
													<div className='absolute inset-0 w-2 h-2 m-auto rounded-full bg-[#199A8E] transform scale-0 peer-checked:scale-100 transition-transform'></div>
												</div>
												<span className='text-sm text-gray-700'>全員</span>
											</label>
											<label className='flex items-center cursor-pointer group'>
												<div className='relative w-4 h-4 mr-2'>
													<input
														type='radio'
														name='isGlobal'
														value={false}
														checked={!values.isGlobal}
														onChange={() => setFieldValue('isGlobal', false)}
														className='peer sr-only'
													/>
													<div className='w-4 h-4 border-2 border-gray-400 rounded-full peer-checked:border-[#199A8E] transition-colors'></div>
													<div className='absolute inset-0 w-2 h-2 m-auto rounded-full bg-[#199A8E] transform scale-0 peer-checked:scale-100 transition-transform'></div>
												</div>
												<span className='text-sm text-gray-700'>個人選択</span>
											</label>
										</div>
									</div>

									{/* Target User Input */}
									{!values.isGlobal && (
										<RenderField
											id='select'
											label=''
											name='targetUsers'
											type='select'
											placeholder='@佐藤 洋子.....'
											options={users}
											error={errors.targetUsers && touched.targetUsers ? errors.targetUsers : null}
										/>
									)}

									{/* Title Input */}
									<RenderField
										id='title'
										label='お知らせタイトル'
										name='title'
										type='text'
										placeholder='お知らせのタイトルをここに入力'
										error={errors.title && touched.title ? errors.title : null}
									/>

									{/* React Quill Editor */}
									<div className='space-y-2'>
										<label htmlFor='content' className='block text-[18px] text-[#1D2026]'>
											お知らせの本文
										</label>
										<div
											ref={quillRef}
											style={{
												height: '250px',
												borderBottomLeftRadius: '12px',
												borderBottomRightRadius: '12px',
											}}></div>
										{errors.content && touched.content && <div className='text-red-500'>{errors.content}</div>}
									</div>

									{/* Action Buttons */}
									<div className='flex justify-end gap-4'>
										<Link
											href='/news'
											className='px-4 py-2 text-sm text-[#344054] bg-[#D3FFF2] rounded-[8px] hover:bg-[#a7f3dc] focus:outline-none'>
											キャンセル
										</Link>
										<button
											type='submit'
											className='px-4 py-2 text-sm text-white bg-[#199A8E] border border-transparent rounded-[8px] hover:bg-[#27756d] focus:outline-none'>
											{isEditMode ? '保存変更' : '保存'}
										</button>
									</div>
								</Form>
							)
						}}
					</Formik>
				</div>
			</div>
		</div>
	)
}
