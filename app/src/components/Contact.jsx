import React, { useEffect, useState } from 'react'

export default function Contact({ contacts, currentUser, changeChat }) {

  const [currentUserFristName, setCurrentUserFristName] = useState(null);
  const [currentUserLastName, setCurrentUserLastName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
     
      if (currentUser) {
        setCurrentUserFristName(currentUser.firstname);
        setCurrentUserLastName(currentUser.lastname);
        setCurrentUserImage(currentUser.avatar);
      }
    };
    fetchData();
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }

  return (
    <div>
      <h1 className='font-bold text-gray-600 uppercase text-'>Contacts</h1>
      {
        currentUser && (
          <div className='flex flex-col h-[75vh]'>
            {/* This is the list of all the otheruser present in the database users */}
            <div className='overflow-scroll overflow-x-hidden no-scrollbar my-3 flex-grow'>
              {
                contacts && contacts.map((contact, index) => (
                  <div key={index} onClick={() => changeCurrentChat(index, contact)} className={`flex items-center justify-between p-2 rounded-md bg-slate-200 hover:bg-slate-300 hover:transition ease-out duration-100 my-2 ${currentSelected === index ? 'bg-gray-200' : ''}`}>
                    <div className='flex items-center gap-2'>
                      <img src={`data:image/svg+xml;base64,${contact.avatar}`} alt='user' className='w-14 h-14 rounded-full' />
                      <p className='ml-2 font-semibold'>{contact.firstname} {contact.lastname}</p>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* This tis the current logind useer */}
            <div className='p-4 rounded-b-lg bg-black text-white'>
              <div className='flex items-center gap-3'>
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='user' className='w-14 h-14rounded-full' />
                <p className='ml-2 font-semibold'>{currentUserFristName} {currentUserLastName}</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
