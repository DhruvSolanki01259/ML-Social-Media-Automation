import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/responseHandlers.js";

export const verifyToken = (req, res, next) => {
  try {
    let token;

    // Try to get token from cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // If not found, try Authorization header: Bearer <token>
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token found
    if (!token) {
      return errorHandler(res, 401, "Access denied. No token provided.");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded data to request
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return errorHandler(res, 403, "Invalid or expired token");
  }
};
