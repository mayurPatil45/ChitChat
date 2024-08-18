import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error from '../pages/Error';
import SetAvatar from '../pages/setAvatar';
import Chats from '../pages/Chats';



// {This is the frist way to create Routes } preffered

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />                                         {/* index represent the Default route */}
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/avatar' element={<SetAvatar/>} />   
            <Route path='/chats' element={<Chats />} />                                 
            
            <Route path='*' element={<Error/>} />                                       {/* * represent the 404 page */}                            
        </Route>
    )
)

export default Router;