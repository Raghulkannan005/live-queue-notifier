"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { get_room } from "@/utils/api";
import useAuthStore from "@/store/authStore";

export default function RoomQueuePage() {
    const params = useParams();
    const roomId = params.roomId;
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token, fetchToken } = useAuthStore();

    async function fetchRoom() {
        setLoading(true);
        if (!token) {
            await fetchToken();
        }
        try {
            const res = await get_room(roomId, token);
            setRoom(res.data);
        } catch (err) {
            setRoom(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (roomId) {
            fetchRoom();
        }
    }, [roomId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Loading Skeleton */}
                        <div className="animate-pulse">
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8">
                                <div className="h-8 bg-slate-200 rounded-lg w-1/3 mb-4"></div>
                                <div className="h-4 bg-slate-200 rounded w-2/3 mb-6"></div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                                        <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-12 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
                                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Room Not Found</h2>
                            <p className="text-slate-600 mb-8">The queue room you're looking for doesn't exist or has been removed.</p>
                            <button 
                                onClick={() => window.history.back()}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{room.name}</h1>
                                    {room.description && (
                                        <p className="text-indigo-100 text-lg">{room.description}</p>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <div className="text-white text-sm font-medium">Queue Status</div>
                                        <div className="text-white text-2xl font-bold">{room.queueCount || 0}</div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <div className="text-white text-sm font-medium">Current Time</div>
                                        <div className="text-white text-lg font-semibold">
                                            {new Date().toLocaleTimeString('en-US', {
                                                hour: '2-digit', 
                                                minute: '2-digit',
                                                hour12: true 
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Queue Management Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Queue List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-200/60">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold text-slate-900">Queue Members</h2>
                                        <div className="flex items-center space-x-2">
                                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-slate-600">Live</span>
                                            <span className="text-xs text-slate-400 ml-2">
                                                Updated: {new Date().toLocaleTimeString('en-US', { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-8">
                                    {room.usersInQueue && room.usersInQueue.length > 0 ? (
                                        <div className="space-y-4">
                                            {room.usersInQueue.map((userId, index) => (
                                                <div key={userId} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60 hover:bg-slate-100 transition-colors duration-200">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                                                                <span className="text-white font-medium text-sm">#{index + 1}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-slate-900">{userId}</div>
                                                            <div className="text-xs text-slate-500">
                                                                Joined: {new Date().toLocaleString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Waiting
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-6">
                                                <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-slate-900 mb-2">No one in queue</h3>
                                            <p className="text-slate-600">The queue is currently empty. Users will appear here when they join.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Queue Actions & Info */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Join Queue
                                    </button>
                                    <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                        Refresh
                                    </button>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Statistics</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Total in Queue</span>
                                        <span className="text-lg font-semibold text-slate-900">{room.queueCount || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Status</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Last Updated</span>
                                        <span className="text-sm text-slate-900">
                                            {new Date().toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Room Info */}
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Room Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-slate-600">Room ID</dt>
                                        <dd className="mt-1 text-sm text-slate-900 font-mono bg-slate-100 px-2 py-1 rounded">{roomId}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-slate-600">Created</dt>
                                        <dd className="mt-1 text-sm text-slate-900">
                                            {room.createdAt ? new Date(room.createdAt).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'N/A'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-slate-600">Current Date</dt>
                                        <dd className="mt-1 text-sm text-slate-900">
                                            {new Date().toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
