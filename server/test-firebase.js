const { db } = require('./config/firebase');

async function testFirebase() {
    console.log('🧪 Starting Firebase Connection Test...');
    try {
        const testCollection = 'test_connection';
        const testDoc = {
            message: 'Hello Firebase!',
            timestamp: new Date().toISOString()
        };

        // 1. Write
        console.log('📝 Attempting to write document...');
        const docRef = await db.collection(testCollection).add(testDoc);
        console.log('✅ Write successful! ID:', docRef.id);

        // 2. Read
        console.log('📖 Attempting to read document...');
        const doc = await docRef.get();
        if (doc.exists) {
            console.log('✅ Read successful! Data:', doc.data());
        } else {
            console.error('❌ Document not found after write.');
        }

        // 3. Delete
        console.log('🗑️ Attempting to delete document...');
        await docRef.delete();
        console.log('✅ Delete successful!');

        console.log('🎉 Firebase connection verified successfully!');
    } catch (error) {
        console.error('❌ Firebase Test Failed:', error);
        if (error.code === 'MODULE_NOT_FOUND') {
            console.error('   👉 Hint: Make sure you ran "npm install firebase-admin"');
        }
        if (error.message.includes('credential')) {
            console.error('   👉 Hint: Check your "service-account-key.json" file and path in .env');
        }
    }
}

testFirebase();
