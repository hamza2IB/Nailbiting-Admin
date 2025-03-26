'use client'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

function formatDate(dateString) {
	const date = new Date(dateString)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}年${month}月${day}日`
}

export default function NewsCard({ news, onDelete, onEdit }) {
	const formattedDate = news?.createdAt ? formatDate(news.createdAt) : ''
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const dropdownRef = useRef(null)

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownVisible(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [dropdownVisible])

	return (
		<div className='py-[18px] px-8 bg-white border relative rounded-[10px] '>
			<div className='flex flex-col gap-2'>
				<div className='flex items-start justify-between '>
					<div>
						{news ? (
							<h3 className='text-[#181A20] font-medium'>{news.title}</h3>
						) : (
							<h3 className='text-[#181A20] font-medium'>No Title Available</h3>
						)}
						<p className='text-sm text-[#B1B1B1] mt-1'>{formattedDate}</p>
					</div>
					<div className='w-[30px] h-[30px] rounded-full bg-[#D3FFF2] flex justify-center items-center'>
						<Image
							className='cursor-pointer'
							src='/svgs/auth/threedots.svg'
							alt='Logo'
							width={18}
							height={18}
							onClick={toggleDropdown}
						/>
					</div>
				</div>
				<div
					className='text-[#717171] text-xs notify-description'
					dangerouslySetInnerHTML={{
						__html: news?.body,
					}}></div>
				{dropdownVisible && (
					<div ref={dropdownRef} className='absolute right-8 top-8 z-20 bg-white border rounded shadow-md mt-1' data-testid="dropdown-menu">
						<button className='block w-full px-4 py-2 text-left hover:bg-[#D3FFF2]' onClick={onDelete} data-testid="delete-button">
							Delete
						</button>
						<button
							className='block w-full px-4 py-2 text-left hover:bg-[#D3FFF2]'
							data-testid="edit-button"
							onClick={() => {
								onEdit(news.id)
								setDropdownVisible(false)
							}}>
							Edit
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
