import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

async function refreshAccessToken(token) {
  try {
    const url = process.env.BACKEND_URL + "api/token-ref-auth/";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const url = process.env.BACKEND_URL + "api/token-auth/";
        const res = await axios.post(url, credentials);
        if (res) {
          const userData = await axios.get(
            process.env.BACKEND_URL + "auth/user_details/",
            {
              headers: {
                Authorization: `Bearer ${res.data.access}`,
              },
            }
          );
          if (userData) {
            res.data.userData = userData.data;
          }
          return res.data;
        } else {
          return {
            error: "Invalid username or password",
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/store/sample";
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.

      session.accessToken = token.accessToken;
      session.userData = token.userData;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account.provider !== "credentials") {
          // extract these two tokens
          // make a POST request to the DRF backend
          try {
            const response = await axios.post(
              // tip: use a seperate .ts file or json file to store such URL endpoints
              process.env.BACKEND_URL + "auth/OAuth/" + account.provider + "/",
              {
                email: user.email,
                access_token: account.access_token, // note the differences in key and value variable names
              }
            );

            // extract the returned token from the DRF backend and add it to the `user` object
            const res = response.data;
            // reform the `token` object from the access token we appended to the `user` object
            token = {
              accessToken: res.access_token,
              accessTokenExpires: Date.now() + 50 * 1000,
              refreshToken: res.refresh_token,
              userData: res.userData,
            };

            return token;
          } catch (error) {
            return null;
          }
        }
        return {
          accessToken: user.access,
          accessTokenExpires: Date.now() + 50 * 1000,
          refreshToken: user.refresh,
          userData: user.userData,
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
