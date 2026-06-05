import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount: any = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const resolvedPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    if (fs.existsSync(resolvedPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
    } else {
      console.warn(`⚠️ Firebase service account file not found at: ${resolvedPath}`);
    }
  } else {
    console.warn('⚠️ Neither FIREBASE_SERVICE_ACCOUNT_JSON nor FIREBASE_SERVICE_ACCOUNT_PATH is set.');
  }
} catch (err) {
  console.error('❌ Failed to parse Firebase service account credentials:', err);
}

if (serviceAccount && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin initialized successfully');
  } catch (err) {
    console.error('❌ Firebase Admin initialization failed:', err);
  }
} else if (!serviceAccount) {
  console.warn('⚠️ Firebase Admin is NOT initialized. Auth routes will fail.');
}

export const adminAuth = admin.auth();
export const adminDb   = admin.firestore();
export default admin;
