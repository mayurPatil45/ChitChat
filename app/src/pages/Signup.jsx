import { useEffect } from 'react'
import Input from '../components/layout/Input'
import Button from '../components/layout/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { registerRoute } from '../utils/APIRoutes';

export default function Signup() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();


    async function signup(data) {

        if (data) {
            try {
                const response = await axios.post(registerRoute, data);
                const userData = response.data.user;
                toast.success('Account Created Successfully!!!');
                localStorage.setItem('chat-user', JSON.stringify(userData));
                navigate('/avatar');
            } catch (error) {
                console.error("Error occurred:", error);
                toast.error("An error occurred while creating account");
            }
        }

        if (data.checkbox === false) {
            return alert('Please agree to the terms and conditions')
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
            <div className="mx-auto max-w-md space-y-6 bg-gray-50 p-10 rounded-md">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold uppercase">Sign Up</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
                </div>
                <form onSubmit={handleSubmit(signup)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Input label={"Frist Name"} id="firstname" placeholder="Lee" required  {...register('firstname', { required: true })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Input label={"Last Name"} id="lastname" placeholder="Robinson" required  {...register('lastname')} />
                        </div>
                    </div>
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

                    <div className="flex items-center space-x-2 text-sm">
                        <input type='checkbox' id="terms" {...register('checkbox', { required: true })} />
                        <p className="leading-none my-3" htmlFor="terms">
                            I agree to the <Link className="underline" href="#"> terms and conditions</Link>
                        </p>
                    </div>
                    <Button className="w-full" type="submit">
                        Sign Up
                    </Button>
                </form>
                <div className="text-center text-sm">
                    Already have an account? <Link className="underline font-medium" to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}
