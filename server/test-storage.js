const { admin } = require('./config/firebase');
const dotenv = require('dotenv');

dotenv.config();

console.log('Testing Firebase Storage Connection...');
console.log('Bucket Name:', process.env.FIREBASE_STORAGE_BUCKET);

if (!process.env.FIREBASE_STORAGE_BUCKET) {
    console.error('❌ Error: FIREBASE_STORAGE_BUCKET environment variable is missing.');
    process.exit(1);
}

const bucket = admin.storage().bucket();

async function testUpload() {
    try {
        const filename = `test-upload-${Date.now()}.txt`;
        const file = bucket.file(filename);

        console.log(`Attempting to upload ${filename}...`);

        await file.save('This is a test file to verify Firebase Storage permissions.', {
            metadata: {
                contentType: 'text/plain',
            }
        });

        console.log('✅ Upload successful!');

        try {
            console.log('Attempting to make public (ACL)...');
            await file.makePublic();
            console.log('✅ makePublic successful (ACLs are enabled).');
            console.log(`Public URL: https://storage.googleapis.com/${bucket.name}/${filename}`);
        } catch (aclError) {
            console.warn('⚠️ makePublic failed. This is expected if "Uniform Bucket Level Access" is enabled.');
            console.warn('Error:', aclError.message);

            console.log('Attempting to generate Signed URL instead...');
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491' // Far future
            });
            console.log('✅ Signed URL generated successfully.');
            console.log('Public URL:', url);
        }

        // Cleanup
        console.log('Cleaning up...');
        await file.delete();
        console.log('✅ Test file deleted.');

    } catch (error) {
        console.error('❌ Fatal Error:', error);
    }
}

testUpload();
