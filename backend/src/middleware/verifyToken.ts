import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../config/firebaseAdmin';

// Extend Express Request to carry decoded user
export interface AuthRequest extends Request {
  user?: {
    uid:   string;
    email: string | undefined;
    name:  string | undefined;
    role?: string;
  };
}

/**
 * verifyToken
 * Reads the Firebase ID token from the Authorization header,
 * verifies it with Firebase Admin, and attaches decoded user to req.user.
 *
 * Usage:  router.get('/protected', verifyToken, handler)
 */
export async function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorised — no token provided' });
    return;
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    req.user = {
      uid:   decoded.uid,
      email: decoded.email,
      name:  decoded.name,
    };
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorised — invalid or expired token' });
  }
}
