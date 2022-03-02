import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { faunaDBClient } from "../../../services/faunaDB";
import { query as q } from "faunadb";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        const userId = await faunaDBClient.query(
          q.Get(
            q.Match(q.Index("user_by_email"), q.Casefold(session.user.email))
          )
        );
        return {
          ...session,
          userId: userId.ref.id,
          userBofes: userId.data.bofes,
        };
      } catch {
        return {
          ...session,
          userId: null,
        };
      }
    },
    async signIn({ user }) {
      const { email } = user;

      try {
        await faunaDBClient.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), { data: { email, bofes: [] } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});
