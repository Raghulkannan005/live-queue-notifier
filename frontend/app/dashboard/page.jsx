"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import useAuthStore from "@/store/authStore";
import { get_user_queues } from "@/utils/api"; // you should build this API to return queues for a given user
import { toast } from "react-hot-toast";
import { connectSocket } from "@/utils/socket";

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
    if (!user?.token) return;

    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      auth: {
        token: user.token,
      },
    });

    newSocket.on("connect", () => {
      console.log("Dashboard connected to socket server");
    });

    newSocket.on("queue:room:update", (data) => {
      console.log("Dashboard queue update received:", data);
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

    // Set up socket connection for real-time updates
    if (user?.token) {
      const socket = connectSocket(user.token);

      if (socket) {
        // Listen for general queue updates
        const handleQueueRoomUpdate = (data) => {
          console.log("Dashboard queue update received:", data);
          // Refresh queues when any room's queue is updated
          fetchQueues();
        };

        socket.on("queue:room:update", handleQueueRoomUpdate);

        // Cleanup on unmount
        return () => {
          socket.off("queue:room:update", handleQueueRoomUpdate);
        };
      }
    }
  }, [user?.id, user?.token]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-50 to-white">
        <div className="text-cyan-700 font-semibold text-lg animate-pulse">
          Loading dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 min-h-screen bg-gradient-to-br from-cyan-50 to-white">
      <section className="bg-white rounded-xl shadow p-6 mb-8 border border-cyan-100">
        <div className="flex items-center gap-6 mb-4">
          <img
            src={user.image || "/avatar-placeholder.png"}
            alt={user.name}
            className="w-20 h-20 rounded-full border shadow object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-cyan-800">{user.name}</h1>
            <p className="text-slate-600">{user.email}</p>
            <span className="inline-block mt-1 px-3 py-1 rounded bg-cyan-100 text-cyan-700 font-semibold text-xs uppercase">
              {user.role}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6 border border-cyan-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-cyan-700">
            Queues You Have Joined
          </h2>
          <div className="flex gap-3">
            <button
              onClick={fetchQueues}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              Refresh
            </button>
            <button
              onClick={() => router.push("/rooms")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Browse Rooms
            </button>
          </div>
        </div>
        {queues.length === 0 ? (
          <p className="text-slate-500">You have not joined any queues yet.</p>
        ) : (
          <div className="space-y-4">
            {queues.map((q) => (
              <div
                key={q._id}
                className="border border-cyan-100 rounded-lg p-4 shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-slate-800">
                    Room:{" "}
                    <span className="text-cyan-700">{q.roomName || q.roomId}</span>
                  </div>
                  <div className="text-slate-500 text-sm">
                    Status:{" "}
                    <span className="uppercase font-medium">{q.status}</span>
                  </div>
                </div>
                <div className="text-cyan-700 text-lg font-bold">
                  Position {q.position}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
