import React from 'react'
import {BiPowerOff} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import Button from './layout/Button';

export default function Logout() {

    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.removeItem('chat-user');
        // localStorage.clear() ;
        navigate('/login');
    }


  return (
    <div>
        <Button onClick={handleClick}>
            <BiPowerOff  size='1.5rem'/>
        </Button>
    </div>
  )
}
