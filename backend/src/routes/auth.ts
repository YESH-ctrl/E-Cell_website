import { Router, Response } from 'express';
import { verifyToken, AuthRequest } from '../middleware/verifyToken';
import { adminAuth, adminDb } from '../config/firebaseAdmin';

const router = Router();

// ── Types ─────────────────────────────────────────────────────────────────────
type UserRole = 'student' | 'ecell_member';

/**
 * POST /api/auth/register
 * Body: { uid, displayName, email, role }
 * Called by the frontend right after Firebase creates the account.
 * Persists the user document with role to Firestore.
 */
router.post('/register', async (req, res: Response): Promise<void> => {
  const { uid, displayName, email, role } = req.body as {
    uid?: string;
    displayName?: string;
    email?: string;
    role?: UserRole;
  };

  if (!uid || !email || !role) {
    res.status(400).json({ error: 'uid, email and role are required' });
    return;
  }

  if (role !== 'student' && role !== 'ecell_member') {
    res.status(400).json({ error: 'role must be "student" or "ecell_member"' });
    return;
  }

  try {
    await adminDb.collection('users').doc(uid).set(
      {
        uid,
        displayName: displayName ?? '',
        email,
        role,
        createdAt: new Date().toISOString(),
      },
      { merge: true },       // safe on re-registration (e.g., Google first sign-in)
    );

    res.status(201).json({ uid, role });
  } catch (err) {
    console.error('[/register] Firestore write error:', err);
    res.status(500).json({ error: 'Failed to save user profile' });
  }
});

/**
 * POST /api/auth/verify
 * Body: { idToken: string }
 * Verifies a Firebase ID token and returns the decoded user payload.
 */
router.post('/verify', async (req, res: Response): Promise<void> => {
  const { idToken } = req.body as { idToken?: string };

  if (!idToken) {
    res.status(400).json({ error: 'idToken is required' });
    return;
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    res.json({
      uid:         decoded.uid,
      email:       decoded.email,
      displayName: decoded.name,
      photoURL:    decoded.picture,
    });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

/**
 * GET /api/auth/me
 * Protected — requires Bearer token.
 * Returns the Firebase Auth profile merged with the Firestore role.
 */
router.get('/me', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [userRecord, userDoc] = await Promise.all([
      adminAuth.getUser(req.user!.uid),
      adminDb.collection('users').doc(req.user!.uid).get(),
    ]);

    const firestoreData = userDoc.exists ? userDoc.data() : {};

    res.json({
      uid:         userRecord.uid,
      email:       userRecord.email,
      displayName: userRecord.displayName,
      photoURL:    userRecord.photoURL,
      role:        firestoreData?.role ?? 'student',
      createdAt:   userRecord.metadata.creationTime,
      lastSignIn:  userRecord.metadata.lastSignInTime,
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch user record' });
  }
});

export default router;
