import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google-login`, {
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
      } catch (err) {
        console.error("SignIn callback failed:", err);
      }
      return true;
    },

    async session({ session }) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-role`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.user?.email,
          }),
        });
        const data = await res.json();
        session.user.role = data.role || "user";
      } catch (err) {
        console.error("Session role enrich failed:", err);
        session.user.role = "user";
      }

      return session;
    },
  },
});
