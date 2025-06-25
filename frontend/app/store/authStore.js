import { create } from 'zustand';

import { getSession } from '@/lib/actions/auth';

const useAuthStore = create((set) => ({
    user: {
        image: '',
        name: '',
        email: '',
    },

    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),

    clearUser: () =>
        set({
            user: { image: '', name: '', email: '' },
            isAuthenticated: false,
        }),

    fetchSession: async () => {

        const session = await getSession();
        if (session && session.user) {
            set({ user: session.user, isAuthenticated: true });
        } else {
            set({
                user: { image: '', name: '', email: '' },
                isAuthenticated: false,
            });
        }

    },
}));

export default useAuthStore;