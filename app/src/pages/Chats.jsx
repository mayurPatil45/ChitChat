import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoutes, host } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

export default function Chats() {
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('chat-user')) {
        navigate('/login');
      }
      const user = JSON.parse(localStorage.getItem('chat-user'));
      if (user) {
        setCurrentUser(user);
        setIsLoading(true);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {

        try {
          const response = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
          setContacts(response.data);
        } catch (error) {
          toast.error('Error fetching contacts:');
          navigate('/login');
        }
      }
    };

    fetchContacts();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      console.log('Connected to the server');
      socket.current.emit('addUser', currentUser._id);
    }
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="flex bg-slate-50 p-5 gap-5 h-[90lvh] rounded-lg mt-5">
      <div className='p-5 w-[30%] bg-slate-100 rounded-md'>
        <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
      </div>

      <div className='border-2 p-5 w-[70%] bg-gray-200 rounded-md '>
        {isLoading && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>

    </div>
  );
}
