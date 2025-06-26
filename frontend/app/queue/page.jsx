'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '@/store/authStore';

export default function QueuePage() {
    const { user } = useAuthStore();
    
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('Disconnected');
    const [socket, setSocket] = useState(null);
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

        socket.on('connect', () => setStatus('Connected'));
        socket.on('disconnect', () => setStatus('Disconnected'));
        socket.on('connect_error', () => setStatus('Error'));

        socket.on('message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    function sendMessage() {
        if (socket) {
            socket.emit('message', inputMessage);
            setInputMessage("");
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-50 flex flex-col items-center">
            <section className="flex flex-col items-center text-center mt-20 mb-16 px-4 max-w-2xl animate-fade-in">
                <div className="relative mb-8">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-cyan-100 rounded-full blur-2xl opacity-70"></span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 drop-shadow-lg z-10 relative">
                        Live Queue Updates
                    </h1>
                    <p className="text-base text-cyan-700 font-semibold tracking-wide uppercase mb-2 z-10 relative">
                        Real-time queue status
                    </p>
                </div>
                <div className="bg-white/80 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
                    <div className="mb-4 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${status === 'Connected' ? 'bg-teal-500' : status === 'Error' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                        <span className="text-slate-700 font-medium">Status: {status}</span>
                    </div>
                    <h2 className="text-xl font-bold text-cyan-700 mb-4">Messages</h2>
                    <ul className="text-left text-slate-700 space-y-2 w-full">
                        {messages.length === 0 && (
                            <li className="text-gray-500 italic">No messages yet.</li>
                        )}
                        {messages.map((msg, index) => (
                            <li key={index} className="bg-cyan-50 rounded-lg px-4 py-2 shadow text-slate-800">
                                {msg}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 w-full flex flex-col gap-4">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(`${user.name} says ${e.target.value}`)}
                            placeholder="Type a message..."
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                        />
                        <button
                            onClick={sendMessage}
                            className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                            Send Message To All
                        </button>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={() => setMessages([])}
                            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                        >
                            Clear Messages
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}