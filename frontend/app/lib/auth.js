import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, trigger }) {
      // Initial login
      if (account && user) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              googleId: account.providerAccountId,
            }),
          });
          const data = await res.json();
          token.backendToken = data.token;
          token.role = data.user.role;
          token.userId = data.user._id;
          token.tokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
        } catch (err) {
          console.error("JWT callback backend login failed:", err);
        }
      }

      // Check if token needs refresh (refresh 2 hours before expiry)
      if (token.backendToken && token.tokenExpiry && Date.now() > token.tokenExpiry - 2 * 60 * 60 * 1000) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.backendToken}`,
            },
          });
          
          if (res.ok) {
            const data = await res.json();
            token.backendToken = data.token;
            token.role = data.user.role;
            token.userId = data.user._id;
            token.tokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
          } else {
            console.error("Token refresh failed:", res.statusText);
            // Keep existing token until natural expiry
          }
        } catch (err) {
          console.error("Token refresh failed:", err);
          // Keep existing token until natural expiry
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.token = token.backendToken || null;
      session.user.role = token.role || "user";
      session.user.id = token.userId || null;
      session.expires = new Date(token.tokenExpiry || Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      return session;
    },
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/signin",
  },
});
