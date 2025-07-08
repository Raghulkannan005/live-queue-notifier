"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import useAuthStore from "@/store/authStore";
import { get_user_queues } from "@/utils/api"; // you should build this API to return queues for a given user
import { toast } from "react-hot-toast";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  async function fetchQueues() {
    try {
      if (!user || !user.id) {
        console.log("User data not available yet");
        setLoading(false);
        return;
      }

      toast.loading("Loading your queues...");
      const res = await get_user_queues(user.id, user.token);
      setQueues(res.queues || []);
      toast.dismiss();
    } catch (err) {
      console.error(err);
      toast.error("Failed to load queues");
    } finally {
      setLoading(false);
    }
  }

  // Initialize socket connection for dashboard updates
  useEffect(() => {
    if (!user?.token || typeof window === 'undefined') return;

    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      auth: {
        token: user.token
      }
    });

    newSocket.on('connect', () => {
      console.log('Dashboard connected to socket server');
    });

    newSocket.on('queue:room:update', (data) => {
      console.log('Dashboard queue update received:', data);
      // Refresh user queues when any queue updates
      fetchQueues();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.token]);

  useEffect(() => {
    fetchQueues();
  }, [user?.id, user?.token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 truncate">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">Here are your current queue positions</p>
          </div>
          <button
            onClick={() => router.push('/rooms')}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
          >
            Browse Rooms
          </button>
        </div>

        {/* Queue Cards */}
        {queues.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 sm:p-8 lg:p-12 text-center">
            <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-slate-100 mb-4 sm:mb-6">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-2">No active queues</h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
              You're not currently in any queues. Browse available rooms to join one and start saving time.
            </p>
            <button
              onClick={() => router.push('/rooms')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Rooms
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {queues.map((queue, index) => (
              <div 
                key={queue._id} 
                className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 truncate">
                      {queue.roomName}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-600">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 bg-green-400 rounded-full flex-shrink-0"></div>
                        <span className="font-medium">Position #{queue.position}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className="capitalize">{queue.status}</span>
                      </div>
                      {queue.estimatedWait && (
                        <div className="flex items-center space-x-2">
                          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <span>~{queue.estimatedWait} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/rooms/${queue.roomId}`)}
                    className="w-full sm:w-auto px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors font-medium text-sm shadow-md hover:shadow-lg"
                  >
                    View Queue
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {queues.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/rooms')}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-cyan-300 transition-colors text-left shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Join Another Queue</h3>
                    <p className="text-sm text-slate-600">Browse available rooms</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/profile')}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-cyan-300 transition-colors text-left shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Manage Profile</h3>
                    <p className="text-sm text-slate-600">Update preferences</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-cyan-300 transition-colors text-left shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Refresh Status</h3>
                    <p className="text-sm text-slate-600">Update queue positions</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
