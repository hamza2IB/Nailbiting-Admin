'use client'

import { useState } from 'react'
import { Eye, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useDrag, useDrop } from 'react-dnd'

const ItemType = {
  VIDEO: 'video',
}

const VideoRow = ({ video, index, moveVideo, onDelete }) => {
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
      className='border-b border-gray-200 bg-white transition-colors hover:bg-gray-50'
      data-testid={`video-row-${video._id}`}>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
          <Image src='/svgs/videos/dragndrop.svg' alt='Drag handle' width={16} height={16} className='cursor-move' />
          <span className='font-medium' data-testid='video-title'>
            {video.title}
          </span>
        </div>
      </td>
      <td className='px-6 py-4 text-gray-500'>{video.url}</td>
      <td className='px-6 py-4 text-gray-500'>{video.description}</td>
      <td className='px-6 py-4'>
        <div className='flex items-center justify-end gap-2'>
          {/* <button
            className="rounded p-2 hover:bg-gray-100"
            aria-label="View video" >
            <Eye className="h-5 w-5 text-gray-500" />6
          </button> */}
          <button
            data-testid='delete-video-button'
            onClick={() => onDelete(video)}
            className='rounded p-2 hover:bg-gray-100'
            aria-label='Delete video'>
            <Trash2 className='h-5 w-5 text-gray-500' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default VideoRow
