'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import Avatar from 'react-avatar'

export default function UserTable({ users, onDelete }) {
	const router = useRouter()
	const handleView = (user) => {
		router.push(`/users/${user._id}`)
	}

	return (
		<>
			<div className='md:w-full  w-[100%] max-h-[600px] overflow-auto'>
				<table className='w-full border-collapse  '>
					{users?.length > 0 && (
						<thead className='bg-white '>
							<tr className='border-b text-[#475467] text-sm '>
								<th className='px-4 py-4 text-left rounded-tl-2xl '>
									<button className='flex items-center font-normal gap-1 hover:text-gray-700 min-w-[100px]'>
										名前
									</button>
								</th>
								<th className='px-4 py-4 text-left min-w-[100px] font-normal'>Email</th>
								<th className='px-4 py-4 text-left min-w-[100px] font-normal'>性別</th>
								<th className='px-4 py-4 text-left min-w-[100px] font-normal'>年齢</th>
								<th className='px-4 py-4 text-left min-w-[150px] font-normal'>合計点数</th>
								<th className='px-4 py-4 text-center min-w-[150px] font-normal rounded-tr-2xl '>アクション</th>
							</tr>
						</thead>
					)}
					<tbody>
						{users?.map((user, index) => (
							<tr key={user._id} className={'bg-white   border-b'}>
								<td className='px-4 py-4'>
									<div className='flex items-center gap-2 min-w-[200px]'>
										<Avatar
											name={user.name}
											color={Avatar.getRandomColor('sitebase', ['#199A8E'])}
											size='40'
											round
											textSizeRatio={1.75}
										/>
										<span>{user.name}</span>
									</div>
								</td>
								<td className='px-4 py-2'>{user.email}</td>
								<td className='px-4 py-2'>{user?.gender || 'N/A'}</td>
								<td className='px-4 py-2'>{user?.age || 'N/A'}</td>
								<td className='px-4 py-2'>{user?.calculatedOverallPoints}</td>
								<td className='px-4 py-2'>
									<div className='flex justify-center gap-2'>
										<button onClick={() => handleView(user)} className='rounded p-1 hover:bg-gray-100'>
											<Eye className='h-5 w-5 text-gray-600' />
										</button>
										<button onClick={() => onDelete(user._id)} className='rounded p-1 hover:bg-gray-100'>
											<Trash2 className='h-5 w-5 text-gray-600' />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
