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
        role: "",
        id : "",
        token: ""
      },
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      clearUser: () => {

        try{
            if ( typeof window !== 'undefined' ) {
                localStorage.removeItem("auth-storage");
            }else {
                console.warn("localStorage is not available, cannot clear auth storage");
            }
            set({
                user: { image: "", name: "", email: "", role: "", id: "", token: "" },
                isAuthenticated: false
            });
        } catch (error) {
            console.error("Error clearing user:", error);
        }

      },

      fetchSession: async () => {
        const session = await getSession();
        if (session && session.user) {
          set({
            user: session.user,
            isAuthenticated: true
          });
        } else {
          set({
            user: {id: "", image: "", name: "", email: "", role: "", token: "" },
            isAuthenticated: false,
          });
        }
      },

    }),
    {
      name: "auth-storage",
      storage: typeof window !== "undefined" ? localStorage : undefined,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore;