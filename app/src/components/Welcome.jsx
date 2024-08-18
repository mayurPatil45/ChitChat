import React from 'react'

export default function Welcome({ currentUser }) {

  return (
    <div>
      <div className='flex flex-col items-center p-3'>
        <img src="../hello.gif" alt="hello" className='w-[40vw]' loading='lazy'/>
        
          <h1 className='text-2xl font-semibold mt-2'>Welcome <span>{currentUser.firstname}!</span></h1>
          <p className='tracking-wide font-medium text-gray-500'>Click on the contact to start chatting</p>
        
      </div>
    </div>
  )
}
