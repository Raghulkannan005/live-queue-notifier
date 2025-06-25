'use client';

import Link from 'next/link';
import AuthNav from '@/components/AuthNav';

const Header = () => {
    return (
        <nav className="w-full flex justify-between items-center py-6 px-8 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-10">
            <div className="text-2xl font-extrabold text-cyan-900 tracking-wide flex items-center">
                <span className="text-cyan-600 mr-1">⏱</span> Waitless
            </div>
            <div className="flex items-center space-x-4">
                <Link
                    href="/"
                    className="text-cyan-600 mx-4 text-lg font-semibold hover:text-cyan-800 transition-colors"
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    className="text-cyan-600 mx-4 text-lg font-semibold hover:text-cyan-800 transition-colors"
                >
                    About
                </Link>
                <AuthNav />
            </div>
        </nav>
    );
};

export default Header;
