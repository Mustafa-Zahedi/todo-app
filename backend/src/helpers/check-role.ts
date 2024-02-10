import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user";

export const checkIsInRole =
  (role: "ADMIN" | "USER") =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("req.user from checkIsInRole: ", req.user);

    if (!req.user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    const hasRole = ((req.user as { user: User }).user as User).role === role;
    if (!hasRole) {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized for this action.",
      });
    }

    return next();
  };
