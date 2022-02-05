import NextAuth from "next-auth";
import GithubProvide from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvide({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
