import React, { useEffect, useRef, useState } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios';
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import toast from 'react-hot-toast';

export default function ChatContainer({ currentChat, currentUser, socket }) {

    const [messages, setMessages] = useState([]);
    const [arrivedMsg, setArrivedMsg] = useState([]);
    const scrollRef = useRef();

    const fetchMessages = async () => {
        try {
            const response = await axios.post(getMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        } catch (error) {
            toast.error('Error fetching messages:');
        }
    };

    useEffect(() => {
        if (currentChat) {
            fetchMessages();
        }
    }, [currentChat, currentUser]);

    const handelSendMsg = async (msg) => {
        try {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
                isAvatar: currentUser.isAvatar,
                avatar: currentUser.avatar,
            });
            socket.current.emit('message-send', {                                   // <----- Socket Implementation
                from: currentUser._id,
                to: currentChat._id,
                text: msg,
            });
            const msgs = [...messages];
            msgs.push({
                fromSelf: true,
                message: msg,
                avatar: currentUser.avatar,
            });
            setMessages(msgs);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Error sending message:');
        }
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on('message-recieve', (msg) => {
                setArrivedMsg({
                    fromSelf: false,
                    message: msg.text,
                    avatar: currentChat.avatar,
                });
            });
        }
    }, []);

    useEffect(() => {
        arrivedMsg && setMessages([...messages, arrivedMsg]);
    }, [arrivedMsg]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            {
                currentChat && (
                    <div className='flex flex-col gap-5'>
                        {/* Chat header, description who are you talking too */}
                        <div className=' flex items-center justify-between p-2 bg-gray-300 rounded-lg '>
                            <div className='flex items-center'>
                                <img src={`data:image/svg+xml;base64,${currentChat.avatar}`} alt='user' className='w-10 h-10 rounded-full' />
                                <p className='ml-2'>{currentChat.firstname}</p>
                            </div>
                            <Logout />
                        </div>

                        {/* Chat messages */}
                        <div className='chat-message h-[55vh] overflow-scroll overflow-x-hidden no-scrollbar p-3 bg-gray-100 rounded-md'>
                            {
                                messages.length > 0 ?
                                ( messages.map((msg, index) => (
                                    <div key={index} ref={scrollRef} className={`message ${msg.fromSelf ? "sended" : "received"}`}>
                                        <div className={`flex items-center gap-3 mb-3 ${msg.fromSelf ? "justify-end" : "justify-start"}`}>
                                            {!msg.fromSelf && (
                                                <img src={`data:image/svg+xml;base64,${msg.avatar}`} alt='user' className='w-10 h-10 rounded-full' />
                                            )}
                                            <p className='text-gray-800'>{msg.message}</p>
                                            {msg.fromSelf && (
                                                <img src={`data:image/svg+xml;base64,${msg.avatar}`} alt='user' className='w-10 h-10 rounded-full' />
                                            )}
                                        </div>
                                    </div>))
                                ) : (
                                    <div className='flex flex-col justify-center text-center font-semibold h-full'>
                                        <p className='text-gray-500 text-2xl'>Start Chatting by Saying Hello!!!</p>
                                        <p className='text-gray-400 text-lg'>Send a message to {currentChat.firstname}</p>
                                    </div>
                                
                                )
                            }
                        </div>

                        <div className='chat-input px-3'>
                            <ChatInput handelSendMsg={handelSendMsg} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
