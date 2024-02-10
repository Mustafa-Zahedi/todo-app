import { NextFunction, Request, Response } from "express";
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
    async (payload, done) => {
      done(null, payload);
    }
  )
);

export const authGuard = passport.authenticate("jwt", { session: false });
