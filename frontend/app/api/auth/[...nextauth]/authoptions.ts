import CredentialProvider from "next-auth/providers/credentials";

const apiUrl =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000/api/";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          name: "email",
          type: "text",
          label: "Email",
          placeholder: "Ali@gmail.com",
        },
        password: {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // console.log("credentials: ", credentials);
        try {
          // Add logic here to look up the user from the credentials provided
          // Get users data from database and check if credentials are valid
          const res = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });

          return res.json();
        } catch (error) {
          console.log(
            "An error happend while trying to authorize using credentials: ",
            error
          );

          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
  },
};
