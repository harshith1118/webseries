import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } 
  // else if (req.cookies.token) {
  //   // Set token from cookie
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };

    const user = await User.findById(decoded.id);
    if (!user) {
        res.status(401).json({ success: false, message: 'No user found with this id' });
        return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ 
          success: false, 
          message: `User role ${req.user?.role} is not authorized to access this route` 
      });
      return;
    }
    next();
  };
};
