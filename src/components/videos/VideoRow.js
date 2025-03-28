'use client'

import { useState } from 'react'
import { Eye, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useDrag, useDrop } from 'react-dnd'

const ItemType = {
	VIDEO: 'video',
}

const VideoRow = ({ video, index, moveVideo, onDelete, onEdit }) => {
	const [, ref] = useDrag({
		type: ItemType.VIDEO,
		item: { index },
	})

	const [, drop] = useDrop({
		accept: ItemType.VIDEO,
		hover: (draggedItem) => {
			if (draggedItem.index !== index) {
				moveVideo(draggedItem.index, index)
				draggedItem.index = index
			}
		},
	})

	return (
		<tr
			ref={(node) => ref(drop(node))}
			className='border-b border-gray-200 bg-white transition-colors hover:bg-gray-50'>
			<td className='px-6 py-4'>
				<div className='flex items-center gap-2'>
					<Image src='/svgs/videos/dragndrop.svg' alt='Drag handle' width={16} height={16} className='cursor-move' />
					<span className='font-medium'>{video.title}</span>
				</div>
			</td>
			<td className='px-6 py-4 text-gray-500'>{video.url}</td>
			<td className='px-6 py-4 text-gray-500'>{video.description}</td>
			<td className='px-6 py-4'>
				<div className='flex items-center justify-end gap-2'>
					<button onClick={() => onEdit(video)} className='rounded p-2 hover:bg-gray-100' aria-label='View video'>
						<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<mask id='mask0_3472_2406' maskUnits='userSpaceOnUse' x='0' y='0' width='20' height='20'>
								<rect width='20' height='20' fill='#D9D9D9' />
							</mask>
							<g mask='url(#mask0_3472_2406)'>
								<path
									d='M4.16667 15.8333H5.35417L13.5 7.6875L12.3125 6.5L4.16667 14.6458V15.8333ZM2.5 17.5V13.9583L13.5 2.97917C13.6667 2.82639 13.8507 2.70833 14.0521 2.625C14.2535 2.54167 14.4653 2.5 14.6875 2.5C14.9097 2.5 15.125 2.54167 15.3333 2.625C15.5417 2.70833 15.7222 2.83333 15.875 3L17.0208 4.16667C17.1875 4.31944 17.309 4.5 17.3854 4.70833C17.4618 4.91667 17.5 5.125 17.5 5.33333C17.5 5.55556 17.4618 5.76736 17.3854 5.96875C17.309 6.17014 17.1875 6.35417 17.0208 6.52083L6.04167 17.5H2.5ZM12.8958 7.10417L12.3125 6.5L13.5 7.6875L12.8958 7.10417Z'
									fill='#475467'
								/>
							</g>
						</svg>
					</button>
					<button onClick={() => onDelete(video)} className='rounded p-2 hover:bg-gray-100' aria-label='Delete video'>
						<Trash2 className='h-5 w-5 text-gray-500' />
					</button>
				</div>
			</td>
		</tr>
	)
}

export default VideoRow
