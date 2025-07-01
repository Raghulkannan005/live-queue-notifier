"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { get_user_queues } from "@/utils/api"; // you should build this API to return queues for a given user
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchQueues();
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
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
          Queues You Have Joined
        </h2>
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
