'use client';

import { logout, login } from '@/lib/actions/auth';
import Link from 'next/link';

import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

const AuthNav = () => {
    const { isAuthenticated, user, fetchSession, clearUser } = useAuthStore();

    useEffect(() => {
        fetchSession();
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                    <Link
                        href="/user"
                        className="text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                    >
                        Welcome, {user?.name || 'User'}!
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            clearUser();
                        }}
                        className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold px-5 py-2 rounded-full cursor-pointer shadow transition duration-300 transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    onClick={login}
                    className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold px-5 py-2 rounded-full cursor-pointer shadow transition duration-300 transform hover:scale-105"
                >
                    Login
                </button>
            )}
        </div>
    );
};

export default AuthNav;
