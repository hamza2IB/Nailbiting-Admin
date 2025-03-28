'use client'

import VideoRow from './VideoRow'

const VideoTable = ({ videos, onDelete, moveVideo, setVideoToDelete, onSave, onEdit }) => (
	<div className=''>
		<div className='relative overflow-x-auto  rounded-t-[12px]'>
			<table className='min-w-[700px] w-full border-collapse text-sm'>
				<thead>
					<tr className='border-b bg-white border-gray-200 text-left '>
						<th className='px-6 py-4 font-medium min-w-64 text-gray-500'>動画のタイトル</th>
						<th className='px-6 py-4 font-medium text-gray-500'>URL</th>
						<th className='px-6 py-4 font-medium text-gray-500 min-w-64'>動画の説明</th>
						<th className='px-6 py-4 font-medium text-gray-500 text-right min-w-[150px]'>アクション</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200'>
					{videos?.map((video, index) => (
						<VideoRow
							key={video._id}
							video={video}
							index={index}
							moveVideo={moveVideo}
							onDelete={() => {
								onDelete(video._id)
							}}
							onEdit={(video) => {
								onEdit(video)
							}}
						/>
					))}
				</tbody>
			</table>
		</div>
		<div className='flex justify-end border-t border-gray-200 bg-white p-4'>
			<button
				onClick={onSave}
				className='rounded-lg bg-[#199A8E] px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1d736a]'>
				保存
			</button>
		</div>
	</div>
)

export default VideoTable
