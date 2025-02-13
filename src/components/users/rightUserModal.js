'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import UserRightShimmer from '@/components/shimmer/userRightShimmer'

export default function RightUserModal({ isOpen, onClose, user }) {
	const [severityRating, setSeverityRating] = useState(0)
	const [isLoading, setIsLoading] = useState(true) // Add loading state

	const [exerciseRating, setExerciseRating] = useState(0)
	const modalRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose()
			}
		}
		if (user) {
			setIsLoading(false)
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose, user])

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end'>
			{isLoading ? (
				<UserRightShimmer /> // Show shimmer when loading
			) : (
				<div ref={modalRef} className='bg-white  h-full w-full max-w-[660px] overflow-hidden overflow-y-auto relative'>
					{/* Header */}
					<div className='flex justify-between items-center p-6 border-b'>
						<h2 className='text-[30px]'>質問内容</h2>
						<button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition-colors'>
							<svg width='52' height='54' viewBox='0 0 52 54' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<rect width='52' height='53' transform='translate(0 0.5)' fill='#ECFDF3' />
								<path
									d='M39 13.75L13 40.25M13 13.75L39 40.25'
									stroke='#101010'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>

					{/* Content */}
					<div className='p-5 space-y-6'>
						<div className='space-y-4'>
							<p className=' font-bold text-[18px] text-[#000000] '>
								今日の身体集中反復行動（皮膚むしり、爪かみ、抜毛、その他）の重症度はどれくらいですか？0～10点の範囲で評価してください。
							</p>
							<div className=' text-[18px] text-[#3C3C43D9] '>
								<p>0：軽度</p>
								<p>5：重度</p>
							</div>
							<div className='flex items-center gap-2 border-b pb-[18px]'>
								<span className='text-sm text-gray-600'>⇨評価</span>
								<p>{user?.pointRating}</p>
							</div>
						</div>
						<div className='space-y-4'>
							<p className=' font-bold text-[18px] text-[#000000] '>今日、エクササイズにどの程度取り組めましたか？</p>
							<div className=' text-[18px] text-[#3C3C43D9] '>
								<p>0：全くできなかった</p>
								<p>1：あまりできなかった（☆）</p>
								<p>2：まあまあできた（☆☆）</p>
								<p>3：目標通りにできた（☆☆☆）</p>
							</div>
							<div className='flex items-center gap-2 border-b pb-[18px]'>
								<span className='text-sm text-gray-600'>⇨評価</span>
								<p>{user?.starRating}</p>
							</div>
						</div>
						{user?.nailPhoto && (
							<div className='rounded-lg flex gap-4 overflow-hidden overflow-x-auto'>
								<img
									src={user?.nailPhoto}
									alt={`Nail photo`}
									className='w-full min-w-[300px]  max-h-[400px] rounded-lg object-cover'
								/>
							</div>
						)}
						{user?.message && (
							<>
								<div className='flex items-center gap-2 border-b pb-[18px]'></div>
								<div className='space-y-4'>
									<p className=' font-bold text-[18px] text-[#000000] '>フリーテキスト</p>
									<div className=' text-[18px] text-[#3C3C43D9] '>
										<p>{user?.message}</p>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
