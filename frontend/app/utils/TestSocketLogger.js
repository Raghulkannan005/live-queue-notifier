import { useEffect } from "react";
import { getSocket } from "@/utils/socket";
import useAuthStore from "@/store/authStore";
import { toast } from "react-hot-toast";

export default function TestSocketLogger() {
  const { user } = useAuthStore();

  useEffect(() => {
    const socket = getSocket() || io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      auth: { token: user.token }
    });

    socket.on("queue:update", (data) => {
      console.log("🔥 Received queue:update event:", data);
      toast.success(`Received test: ${JSON.stringify(data)}`);
    });

    return () => socket.off("queue:update");
  }, [user.token]);

  return null;
}
