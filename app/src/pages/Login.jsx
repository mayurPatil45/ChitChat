import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/layout/Button'
import Input from '../components/layout/Input'
import { set, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { loginRoute } from '../utils/APIRoutes'
import axios from 'axios'
export default function Login() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    async function login(data) {
        if (data) {
            try {
                const response = await axios.post(loginRoute, data);
                const userData = response.data.user;
                toast.success('Login Successfully!!!');
                localStorage.setItem('chat-user', JSON.stringify(userData));
                navigate('/chats');
            } catch (error) {
                console.error("Error occurred:", error);
                toast.error("Invalid Email or Password!!!");
            }
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('chat-user'));
        if (user) {
            navigate('/home');
        }
    }, []);

    return (
        <div className="flex items-center min-h-screen px-4">
            <div className="w-full max-w-md space-y-4 mx-auto p-10 bg-gray-50 rounded-md">
                <div className="text-center">
                    <div className="text-3xl font-bold mb-3 uppercase">Login</div>
                    <div className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</div>
                </div>
                <form onSubmit={handleSubmit(login)} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            label={"Email"}
                            id="email"
                            placeholder="Enter Email..."
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    email: (value) => value.includes('@') || 'Invalid email'
                                }
                            })}
                        />

                        <Input label={"Password"} id="password" type="password" placeholder='Password' {...register('password', { required: true })} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type='checkbox' id="remember-me" />
                        <label className="text-sm" htmlFor="remember-me">
                            Remember me
                        </label>
                    </div>
                    <Button className="w-full" type='submit'>Login</Button>
                </form>
                <div className="text-center text-sm">
                    Don't have an account? <Link to={"/signup"} className="underline font-medium" href="#">Sign up</Link>
                </div>
            </div>
        </div>
    )
}
