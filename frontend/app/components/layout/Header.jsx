'use client';

import Link from 'next/link';
import { logout, login } from '@/lib/actions/auth';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Header = () => {
    const { fetchSession, isAuthenticated, user, clearUser } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        fetchSession();
    },[])

     const startServer = async () => {
        try{
            toast.loading("Connecting to server...");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/start`);
            const data = await res.json();
            toast.dismiss();
            toast.success(data.message);
        } catch (error) {
            toast.error("Failed to connect to server");
            toast.dismiss(error);
        }
    };
    useEffect(() => {
        startServer();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen, isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        clearUser();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    const navigationLinks = [
        { href: '/dashboard', label: 'Home' },
        { href: '/about', label: 'About' },
        ...(isAuthenticated ? [{ href: '/rooms', label: 'Rooms' }] : []),
        ...(isAuthenticated && user?.role === 'admin' ? [{ href: '/admin', label: 'Admin' }] : []),
        ...(isAuthenticated && user?.role === 'owner' ? [{ href: '/owner', label: 'Owner' }] : [])
    ];

    return (
        <nav className="w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group shrink-0">
                        <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                            Waitless
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-slate-700 hover:text-cyan-600 font-medium text-sm transition-all duration-200 group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-600 to-cyan-700 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right side - Auth & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-colors mobile-menu-container"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Auth Section */}
                        <div className="relative">
                            {isAuthenticated ? (
                                <div className="relative dropdown">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 sm:space-x-3 p-1.5 rounded-full hover:bg-slate-50 transition-all duration-200 group"
                                    >
                                        <div className="relative">
                                            <img
                                                src={user.image}
                                                alt="Profile"
                                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-slate-200 group-hover:border-cyan-300 transition-all duration-200 shadow-sm"
                                            />
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <p className="text-sm font-medium text-slate-900 truncate max-w-[120px]">{user?.name}</p>
                                            <p className="text-xs text-slate-500">Online</p>
                                        </div>
                                        <svg 
                                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-scale-in">
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
                                                <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                                            </div>

                                            <div className="py-2">
                                                <Link 
                                                    href="/profile"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Profile
                                                </Link>
                                                <Link 
                                                    href="/dashboard"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3z" />
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                            </div>

                                            <div className="border-t border-slate-100 pt-2 mt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center cursor-pointer w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={login}
                                    className="relative cursor-pointer bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 group overflow-hidden text-sm"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="hidden sm:inline">Sign In</span>
                                        <span className="sm:hidden">Login</span>
                                    </span>
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-slate-200 mobile-menu-container">
                        <div className="pt-4 pb-6 space-y-1 animate-slide-in">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <>
                                    <div className="border-t border-slate-200 my-4"></div>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center px-3 py-3 text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;