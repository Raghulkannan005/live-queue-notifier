import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSession } from "@/lib/actions/auth";

const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        image: "",
        name: "",
        email: "",
        role: ""
      },
      isAuthenticated: false,
      token: "",

      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      clearUser: () =>
        set({
          user: { image: "", name: "", email: "", role: "" },
          isAuthenticated: false,
          token: "",
        }),

      fetchSession: async () => {
        const session = await getSession();
        if (session && session.user) {
          set({
            user: session.user,
            isAuthenticated: true,
          });
        } else {
          set({
            user: { image: "", name: "", email: "", role: "" },
            isAuthenticated: false,
          });
        }
      },

      fetchToken: async () => {
        try {
            const session = await getSession();
            if (!session || !session.user) { return; }
            const { email, role } = session.user;
            const res = await fetch("/api/jwt/sign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              role
            }),
          });

          const data = await res.json();
          if (data.token) {
            set({ token: data.token });
          } else {
            console.error("Token missing in response");
          }
        } catch (err) {
          console.error("Error fetching token in Zustand:", err);
        }
      }
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
