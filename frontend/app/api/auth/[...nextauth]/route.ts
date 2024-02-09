import NextAuth from "next-auth";

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   if (req.query.nextauth?.includes("callback") && req.method === "POST") {
//     console.log(
//       "Handling callback request from my Identity Provider",
//       req.body
//     );
//   }

//   // Get a custom cookie value from the request
//   const someCookie = req.cookies["some-custom-cookie"];

//   return await NextAuth(req, res, {
//     providers: [],
//     callbacks: {
//       session({ session, token }) {
//         // Return a cookie value as part of the session
//         // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
//         // session.someCookie = someCookie;
//         return session;
//       },
//     },
//   });
// }

// export default NextAuth(authOptions);

import { authOptions } from "./authoptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
