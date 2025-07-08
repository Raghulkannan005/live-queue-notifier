'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { get_rooms } from '@/utils/api';
import useAuthStore from '@/store/authStore';

export default function RoomsPage() {

    const [refresh, setRefresh] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuthStore();

    async function fetchRooms() {
        setLoading(true);
        try {
            const res = await get_rooms(user.token);
            setRooms(res.data);
        } catch (err) {
            setRooms([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRooms();
    }, [refresh]);

    const handleRefresh = () => {
        if (!loading) {
            setRefresh((prev) => !prev);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Available Rooms</h1>
                        <p className="text-slate-600 text-sm sm:text-base">Browse and join queues at your favorite places</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                                loading
                                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-cyan-300 shadow-sm hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Refreshing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span>Refresh</span>
                                    </>
                                )}
                            </div>
                        </button>
                        {(user.role === 'admin' || user.role === 'owner') && (
                            <Link
                                href="/rooms/new"
                                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-center"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Create Room</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                            <p className="text-slate-600">Loading rooms...</p>
                        </div>
                    </div>
                ) : rooms.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 sm:p-8 lg:p-12 text-center">
                        <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-slate-100 mb-4 sm:mb-6">
                            <svg className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-2">No rooms available</h3>
                        <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
                            There are currently no rooms available. Check back later or create a new room.
                        </p>
                        {(user.role === 'admin' || user.role === 'owner') && (
                            <Link
                                href="/rooms/new"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Create First Room
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room, index) => (
                            <div 
                                key={room._id} 
                                className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex flex-col h-full">
                                    {/* Room Icon */}
                                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors duration-200">
                                        <svg className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>

                                    {/* Room Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors duration-200">
                                            {room.name}
                                        </h3>
                                        {room.description && (
                                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                                {room.description}
                                            </p>
                                        )}
                                        
                                        {/* Stats */}
                                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <span>{room.queueCount || 0} in queue</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                                <span>Active</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link
                                        href={`/rooms/${room._id}`}
                                        className="w-full bg-cyan-600 text-white px-4 py-3 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 font-medium text-center shadow-md hover:shadow-lg"
                                    >
                                        View Queue
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Info Section */}
                {!loading && rooms.length > 0 && (
                    <div className="mt-12 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-2xl p-6 sm:p-8">
                        <div className="text-center">
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">How it works</h3>
                            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                                Simply click on any room to join the queue and get real-time updates on your position.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center mb-3">
                                        <span className="text-white font-semibold">1</span>
                                    </div>
                                    <p className="text-sm text-slate-600">Choose a room</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center mb-3">
                                        <span className="text-white font-semibold">2</span>
                                    </div>
                                    <p className="text-sm text-slate-600">Join the queue</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center mb-3">
                                        <span className="text-white font-semibold">3</span>
                                    </div>
                                    <p className="text-sm text-slate-600">Get notified</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}