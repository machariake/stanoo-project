const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

try {
    // Option 1: Load from a service account file path
    // const serviceAccount = require('../../service-account-key.json');

    // Option 2: Load from environment variables (More secure for production)
    // For this to work, you need to construct the object from env vars or simpler:
    // admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

    // For local development with a file:
    // Option A: Load from environment variable (Best for Render/Heroku)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('✅ Firebase Admin Initialized from Env Var');
    }
    // Option B: Load from a service account file path (Local Dev)
    else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
        const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('✅ Firebase Admin Initialized from File');
    } else {
        // If no explicit key, it might try to use default Google Cloud credentials if available
        admin.initializeApp();
        console.log('⚠️ Firebase initialized with default credentials (check if this is intended)');
    }

} catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    console.error('To fix this:');
    console.error('1. Go to Firebase Console > Project Settings > Service Accounts');
    console.error('2. Generate a new private key');
    console.error('3. Save it as "service-account-key.json" in the server folder');
    console.error('4. Update your .env file or require path');
}

const db = admin.firestore();

module.exports = { admin, db };
