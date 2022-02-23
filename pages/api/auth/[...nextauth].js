import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

async function refreshAccessToken(token) {
  try {
    const url =
      "https://infinite-eyrie-81096.herokuapp.com/api/token-ref-auth/";
    const refreshToken = { refresh: token.refreshToken };
    const response = await axios.post(url, refreshToken);

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: Date.now() + 50 * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        return {
          accessToken: user.access,
          accessTokenExpires: Date.now() + 50 * 1000,
          refreshToken: user.refresh,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
