import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { UserServices } from "../services/user";

const userService = new UserServices();

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET as string,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      try {
        console.log("payload: ", payload);

        // Fetch user from database based on payload (e.g., user ID)
        // const user = await userService.getUser(payload.sub);
        // if (!user) {
        //   return done(null, false); // User not found
        // }
        // // Attach user object to request for further use
        // return done(null, user);
      } catch (error) {
        return done(error, false);
      }

      done(null, payload);
    }
  )
);

export const authGuard = passport.authenticate(
  "jwt",
  { session: false }
  // checkUserRole
);

// const passport = require('passport');

// Middleware function to check if the user has the required role(s)
// function checkUserRole(req, res, next) {
//   // Get the user's role from the database (e.g., MongoDB)
//   const userRole = req.user.role; // Assuming you've stored the role in the user object

//   // Check if the user has the required role(s)
//   if (userRole === "premium") {
//     // User has the premium role
//     return next();
//   } else {
//     // User doesn't have the required role
//     return res.status(403).json({
//       status: 403,
//       message: "You are not authorized for this action.",
//       moreInfo: "[^1^][1]", // Provide a link to additional information
//     });
//   }
// }

// Example usage:
// app.get('/premium-content', passport.authenticate('bearer', { session: false }), checkUserRole, (req, res) => {
//   // This route is accessible only to premium users
//   res.send('Welcome to premium content!');
// });
