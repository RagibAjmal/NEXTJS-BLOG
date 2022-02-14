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
        const url = "http://localhost:8000";
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
});
