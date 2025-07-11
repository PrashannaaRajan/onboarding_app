import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  try {
    const jwtSecret = process.env["JWT_SECRET"];
    if (!jwtSecret) {
      res.status(500).json({ error: "JWT secret not configured" });
      return;
    }
    const decoded = jwt.verify(token, jwtSecret) as { userId?: number };

    if (!decoded.userId) {
      res.status(401).json({ error: "Token payload missing userId" });
      return;
    }

    (req as any).userId = decoded.userId;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
