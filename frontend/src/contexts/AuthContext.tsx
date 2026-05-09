import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
import { ALLOWED_ECELL_EMAILS } from '../config/allowedEmails';

// ── Types ────────────────────────────────────────────────────────────────────
export type UserRole = 'student' | 'ecell_member';

interface AuthContextType {
  currentUser: User | null;
  userRole:    UserRole | null;
  roleLoading: boolean;
  loading:     boolean;
  signUp:           (email: string, password: string, displayName: string) => Promise<void>;
  signIn:           (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  logOut:           () => Promise<void>;
  resetPassword:    (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
}

// ── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

// ── LocalStorage cache helpers (fallback when Firestore rules are restrictive)
const ROLE_CACHE_KEY = (uid: string) => `ecell_role_${uid}`;

function cacheRole(uid: string, role: UserRole) {
  try { localStorage.setItem(ROLE_CACHE_KEY(uid), role); } catch { /* ignore */ }
}

function getCachedRole(uid: string): UserRole | null {
  try { return (localStorage.getItem(ROLE_CACHE_KEY(uid)) as UserRole) ?? null; } catch { return null; }
}

function clearCachedRole(uid: string) {
  try { localStorage.removeItem(ROLE_CACHE_KEY(uid)); } catch { /* ignore */ }
}

// ── Firestore role fetch (best-effort, falls back to cache) ──────────────────
async function fetchRole(uid: string): Promise<UserRole | null> {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      const role = snap.data().role as UserRole;
      cacheRole(uid, role);   // keep cache in sync
      return role;
    }
  } catch {
    // Firestore rules may be blocking the read — use cached value
  }
  return getCachedRole(uid);
}

// ── Firestore write (fire-and-forget — never blocks sign-up) ─────────────────
function persistRoleToFirestore(uid: string, data: object) {
  setDoc(doc(db, 'users', uid), data, { merge: true })
    .catch(() => {
      // Expected to fail until Firestore security rules allow authenticated writes.
      // Role is already cached in localStorage as a fallback.
    });
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole,    setUserRole]    = useState<UserRole | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  // ── Email + Password sign-up ──────────────────────────────────────────────
  const signUp = async (
    email:       string,
    password:    string,
    displayName: string,
  ) => {
    const role: UserRole = ALLOWED_ECELL_EMAILS.includes(email.toLowerCase()) ? 'ecell_member' : 'student';
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });

    const uid = credential.user.uid;

    // 1. Set role in memory immediately — this is what drives navigation
    setUserRole(role);

    // 2. Cache the role locally so it survives page refresh
    cacheRole(uid, role);

    // 3. Persist to Firestore asynchronously (never blocks the UI)
    persistRoleToFirestore(uid, { uid, displayName, email, role, createdAt: new Date().toISOString() });

    // 4. Inform the backend (Admin SDK bypasses Firestore security rules)
    credential.user.getIdToken().then((idToken) => {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000'}/api/auth/register`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
          body:    JSON.stringify({ uid, displayName, email, role }),
        },
      ).catch(console.warn);  // backend may not be running locally — non-fatal
    }).catch(console.warn);
  };

  // ── Email + Password sign-in ──────────────────────────────────────────────
  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  // ── Google OAuth ──────────────────────────────────────────────────────────
  const signInWithGoogle = async (): Promise<UserCredential> => {
    const credential = await signInWithPopup(auth, googleProvider);
    const user = credential.user;
    const uid  = user.uid;

    // Check Firestore (or cache) for existing role
    const existingRole = await fetchRole(uid);

    if (!existingRole) {
      // First-time Google sign-in — determine role by email
      const email = user.email?.toLowerCase() ?? '';
      const role: UserRole = ALLOWED_ECELL_EMAILS.includes(email) ? 'ecell_member' : 'student';
      setUserRole(role);
      cacheRole(uid, role);
      persistRoleToFirestore(uid, {
        uid,
        displayName: user.displayName ?? '',
        email:       user.email ?? '',
        role:        'student',
        createdAt:   new Date().toISOString(),
      });
    } else {
      setUserRole(existingRole);
    }

    return credential;
  };

  // ── Sign out ──────────────────────────────────────────────────────────────
  const logOut = async () => {
    if (currentUser) clearCachedRole(currentUser.uid);
    await signOut(auth);
    setUserRole(null);
  };

  // ── Password reset ────────────────────────────────────────────────────────
  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  // ── Update current user password ───────────────────────────────────────────
  const updateUserPassword = async (password: string) => {
    if (currentUser) {
      await updatePassword(currentUser, password);
    } else {
      throw new Error('No user is currently signed in');
    }
  };

  // ── Sync Firebase auth state & load role ─────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // 1. Check localStorage synchronously — prevents blank-screen flicker
        const cachedRole = getCachedRole(user.uid);
        if (cachedRole) {
          setUserRole(cachedRole);
          setLoading(false);  // unblock children immediately
        } else {
          setRoleLoading(true);
        }

        // 2. Async Firestore fetch to get the authoritative role
        const freshRole = await fetchRole(user.uid);
        setUserRole(freshRole);
        setRoleLoading(false);
      } else {
        setUserRole(null);
        setRoleLoading(false);
      }

      setLoading(false);
    });
    return unsub;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userRole,
    roleLoading,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logOut,
    resetPassword,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
