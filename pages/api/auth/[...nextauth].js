import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const url =
          "https://infinite-eyrie-81096.herokuapp.com/api/token-auth/";
        const res = await axios.post(url, credentials);
        console.log(res);
        if (res) {
          return res.data;
        } else {
          return {
            error: "Invalid username or password",
          };
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      console.log("here");
      console.log(token);
      console.log(user);
      const isSignIn = user ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      console.log("here2");
      console.log(token);
      console.log(session);
      if (!session?.user || !token?.account) {
        return session;
      }

      session.user.id = token.account.id;
      session.accessToken = token.account.accessToken;

      return session;
    },
  },
});
