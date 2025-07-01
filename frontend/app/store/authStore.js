import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSession } from "@/lib/actions/auth";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        image: "",
        name: "",
        email: "",
        role: "",
        id : "",
        token: ""
      },
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: true, error: null }),

      clearUser: () =>
        set({
          user: { image: "", name: "", email: "", role: "", id: "", token: "" },
          isAuthenticated: false
        }),

      fetchSession: async () => {
        set({ isLoading: true });
        try {
          const session = await getSession();
          if (session && session.user && session.user.token) {
            // Check if token is still valid
            const isExpiring = get().isTokenExpiring();
            if (isExpiring) {
              // Try to refresh token
              await get().refreshToken();
            } else {
              set({
                user: session.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            }
          } else {
            set({
              user: {id: "", image: "", name: "", email: "", role: "", token: "" },
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Error fetching session:", error);
          set({
            user: {id: "", image: "", name: "", email: "", role: "", token: "" },
            isAuthenticated: false,
            isLoading: false,
            error: error.message
          });
        }
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearAuth: () => set({ user: null, error: null }),

      // Update token in user object
      updateToken: (newToken) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, token: newToken } });
        }
      },

      // Check if token is about to expire (within 1 hour)
      isTokenExpiring: () => {
        const user = get().user;
        if (!user?.token) return true;

        try {
          const payload = JSON.parse(atob(user.token.split('.')[1]));
          const expiry = payload.exp * 1000; // Convert to milliseconds
          const now = Date.now();
          const oneHour = 60 * 60 * 1000;

          return expiry - now < oneHour;
        } catch (error) {
          console.error("Error checking token expiry:", error);
          return true;
        }
      },

      // Add token refresh functionality
      refreshToken: async () => {
        const currentUser = get().user;
        if (!currentUser?.token) return false;

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${currentUser.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: {
                ...currentUser,
                token: data.token,
                ...data.user
              },
              isAuthenticated: true,
              error: null
            });
            return true;
          } else {
            // Token refresh failed, clear auth
            get().clearUser();
            return false;
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          get().clearUser();
          return false;
        }
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
