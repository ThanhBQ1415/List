'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignInPage = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Gọi API lấy danh sách user
            const response = await axios.get('http://localhost:8000/users');
            const users = response.data;

            // Kiểm tra email & password
            const matchedUser = users.find((user: any) =>
                user.email === credentials.email && user.password === credentials.password
            );

            if (!matchedUser) {
                setError('Email hoặc mật khẩu không đúng');
                return;
            }
            sessionStorage.setItem('user', JSON.stringify(matchedUser));
            // localStorage.setItem('user', JSON.stringify(matchedUser));
            window.location.href = '/';
        } catch (error) {
            setError('Đã xảy ra lỗi khi đăng nhập');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-center mb-8">Sign in to your account</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    {error}
                                </div>
                            )}
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                                            placeholder="Email address"
                                            value={credentials.email}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                                            placeholder="Password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <button type="submit" className="bg-cyan-500 text-white rounded-md px-6 py-2 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 w-full transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
