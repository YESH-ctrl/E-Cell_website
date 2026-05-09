import { Response, NextFunction } from 'express';
import { adminDb } from '../config/firebaseAdmin';
import { AuthRequest } from './verifyToken';

export type UserRole = 'student' | 'ecell_member';

/**
 * requireRole
 * Factory that returns a middleware enforcing a specific role.
 * Must be used AFTER verifyToken (needs req.user.uid).
 *
 * Usage: router.get('/admin', verifyToken, requireRole('ecell_member'), handler)
 */
export function requireRole(role: UserRole) {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user?.uid) {
      res.status(401).json({ error: 'Unauthorised — no user found on request' });
      return;
    }

    try {
      const userDoc = await adminDb.collection('users').doc(req.user.uid).get();

      if (!userDoc.exists) {
        res.status(403).json({ error: 'Forbidden — user profile not found' });
        return;
      }

      const data = userDoc.data();
      const userRole = data?.role as UserRole | undefined;

      if (userRole !== role) {
        res.status(403).json({
          error: `Forbidden — requires role: ${role}`,
          yourRole: userRole ?? 'unknown',
        });
        return;
      }

      // Attach role to req.user for downstream handlers
      req.user!.role = userRole;
      next();
    } catch (err) {
      console.error('[requireRole] Firestore error:', err);
      res.status(500).json({ error: 'Internal server error during role check' });
    }
  };
}
