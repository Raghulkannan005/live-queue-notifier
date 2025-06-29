'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { get_rooms } from '@/utils/api';

import useAuthStore from '@/store/authStore';

export default function RoomsPage() {
    const [refresh, setRefresh] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, fetchToken } = useAuthStore();

    async function fetchRooms() {
        setLoading(true);
        if (!token) {
            await fetchToken();
        }
        try {
            const res = await get_rooms(token);
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
        <main className="max-w-3xl min-h-screen mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-cyan-700">Rooms</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className={`px-4 py-2 rounded-full transition ${
                            loading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-cyan-600 text-white hover:bg-cyan-700'
                        }`}
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <Link
                        href="/rooms/new"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-full shadow"
                    >
                        Create Room
                    </Link>
                </div>
            </div>
            {loading ? (
                <div className="text-gray-500">Loading rooms...</div>
            ) : rooms.length === 0 ? (
                <div className="text-gray-500">No rooms found.</div>
            ) : (
                <ul className="space-y-4">
                    {rooms.map((room) => (
                        <li key={room._id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="text-lg font-semibold text-slate-800">{room.name}</div>
                                {room.description && (
                                    <div className="text-slate-600 text-sm">{room.description}</div>
                                )}
                                <div className="text-cyan-600 text-xs mt-1">
                                    Queue count: {room.queueCount ?? (room.usersInQueue ? room.usersInQueue.length : 0)}
                                </div>
                            </div>
                            <Link
                                href={`/rooms/${room._id}`}
                                className="mt-3 md:mt-0 inline-block bg-cyan-600 text-white px-5 py-2 rounded-full hover:bg-cyan-700 transition"
                            >
                                View Queue
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}