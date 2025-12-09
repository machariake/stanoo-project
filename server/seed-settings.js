const { db } = require('./config/firebase');

const defaultSettings = {
    companyName: "Theuri Green Health Safe",
    email: "info@theurigreenhealthsafe.com",
    phone: "+254 700 000 000",
    address: "Westlands, Nairobi, Kenya",
    tagline: "Your Partner in Health, Safety & Environment",
    facebookUrl: "https://facebook.com",
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
    whatsappNumber: "254700000000"
};

async function seedSettings() {
    console.log('🌱 Seeding Default Settings...');
    try {
        const docRef = db.collection('settings').doc('general');

        const doc = await docRef.get();
        if (doc.exists) {
            console.log('⚠️ Settings already exist. Skipping seed to prevent overwrite.');
            return;
        }

        await docRef.set({
            ...defaultSettings,
            createdAt: new Date().toISOString()
        });
        console.log('✅ Default settings created!');
        console.log('🎉 Seeding complete!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
}

seedSettings();
