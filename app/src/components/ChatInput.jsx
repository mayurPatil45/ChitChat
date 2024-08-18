import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { BsEmojiWink } from "react-icons/bs";
import Button from './layout/Button';



export default function ChatInput({ handelSendMsg }) {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmojiPickerClick = (e) => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (e) => {
        let msg = message;
        msg += e.emoji;
        setMessage(msg);
        setShowEmojiPicker(!showEmojiPicker);
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if (message.length > 0) {
            handelSendMsg(message);
            setMessage('');
        }
    }

    return (
        <div className="flex gap-3 items-center py-3  ">
            <div className="Emoji-Picker">
                <button className="px-1 py-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400" onClick={handleEmojiPickerClick}>
                    <BsEmojiWink size='1.7rem' />
                </button>
                <div className='absolute'>
                    {showEmojiPicker && <EmojiPicker theme='dark' onEmojiClick={handleEmojiClick} className="absolute top-[-510px] mt-1 bg-white border border-gray-300 rounded shadow-md" />}
                </div>
               
            </div>
            <form onSubmit={(e) => sendChat(e)} className="flex-grow flex gap-3">
                <input type="text" className="px-6 py-2 outline-none text-gray-300 rounded-full bg-gray-800 w-full" placeholder="Type a message..." onChange={handleChange} value={message} />
                <Button type="submit" className='rounded-full'><IoMdSend size='1.5rem' className='pl-1' /></Button>
            </form>
        </div>
    )
}
