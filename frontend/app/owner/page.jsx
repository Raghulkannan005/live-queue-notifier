'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { get_owned_rooms, get_queues_by_room } from '@/utils/api';
import { toast } from 'react-hot-toast';

export default function OwnerDashboard() {
    const { user, isAuthenticated } = useAuthStore();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/error');
            return;
        }
        if (user && (user?.role !== 'owner' && user?.role !== "admin")) {
            router.push('/dashboard');
            return;
        }
        if (user?.token) {
            fetchOwnerData();
        }
    }, [isAuthenticated, user, router]);

    const fetchOwnerData = async () => {
        try {
            setLoading(true);
            const roomsData = await get_owned_rooms(user.token);
            
            if (!roomsData || !roomsData.data) {
                setRooms([]);
                setAnalytics({});
                return;
            }
            
            setRooms(roomsData.data || []);
            
            const analyticsPromises = roomsData.data?.map(async (room) => {
                try {
                    const queueData = await get_queues_by_room(room._id, user.token);
                    return { roomId: room._id, queueCount: queueData.queue?.length || 0 };
                } catch (error) {
                    console.error(`Error fetching queue for room ${room._id}:`, error);
                    return { roomId: room._id, queueCount: 0 };
                }
            });
            
            const analyticsResults = await Promise.all(analyticsPromises || []);
            const analyticsMap = {};
            analyticsResults.forEach(result => {
                analyticsMap[result.roomId] = result;
            });
            setAnalytics(analyticsMap);
            
        } catch (error) {
            console.error('Error fetching owner data:', error);
            // If error is 404 (no rooms found), just set empty arrays
            if (error.message?.includes('404') || error.message?.includes('No owned rooms found')) {
                setRooms([]);
                setAnalytics({});
                return;
            }
            toast.error('Failed to load owner dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        if (user?.token) {
            fetchOwnerData();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading owner dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Owner Dashboard</h1>
                            <p className="text-slate-600">Manage your rooms and monitor queue performance</p>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg shadow border border-slate-200 transition-all duration-200 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200/60">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Rooms</p>
                                <p className="text-2xl font-bold text-slate-900">{rooms.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200/60">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Active Queues</p>
                                <p className="text-2xl font-bold text-slate-900">
                                    {Object.values(analytics).reduce((sum, room) => sum + room.queueCount, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                        onClick={() => router.push('/rooms/new')}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Room
                    </button>
                    
                    <button
                        onClick={() => router.push('/owner/analytics')}
                        className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-xl shadow-lg border border-slate-200 transition-all duration-200 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        View Analytics
                    </button>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div key={room._id} className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-200">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-slate-900">{room.name}</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-slate-600">Active</span>
                                    </div>
                                </div>
                                
                                <p className="text-slate-600 mb-4 line-clamp-2">{room.description}</p>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>{analytics[room._id]?.queueCount || 0} in queue</span>
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Created {new Date(room.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => router.push(`/rooms/${room._id}`)}
                                        className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors font-medium text-sm"
                                    >
                                        Manage Queue
                                    </button>
                                    <button
                                        onClick={() => router.push(`/owner/rooms/${room._id}/edit`)}
                                        className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {rooms.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-6">
                            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Rooms Yet</h3>
                        <p className="text-slate-600 mb-6">Create your first room to start managing queues</p>
                        <button
                            onClick={() => router.push('/rooms/new')}
                            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
                        >
                            Create Your First Room
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}