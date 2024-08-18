import React from 'react'

export default function Messages({message, currentUser}) {
  return (
    <div>
      <div className={`message ${message}`}>
        <div className='flex gap-3'>
          <div className='flex items-center'>
            <img src={`data:image/svg+xml;base64,${message.from.avatar}`} alt='user' className='w-10 h-10 rounded-full' />
            <p className='ml-2'>{message.from.firstname}</p>
          </div>
          <p className='text-gray-500'>{message.createdAt}</p>
        </div>
        <p className='text-gray-800'>{message.message}</p>
      </div>
    </div>
  )
}
