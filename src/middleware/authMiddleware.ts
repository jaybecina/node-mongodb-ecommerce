import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User'; // Assuming the correct path to your User model
import { UserDocument } from '../types/user'; 

// Define a custom interface extending the Request interface
interface AuthenticatedRequest extends Request {
  user?: UserDocument; // This allows 'user' property to be available in the Request object
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // You can define a custom interface for the decoded payload for better type safety
      interface DecodedToken {
        userId: string;
        // Add other properties as needed
      }

      // Ensure the decoded object matches the DecodedToken interface
      const decodedToken: DecodedToken = decoded;

      req.user = await User.findById(decodedToken.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
