const { db } = require('./config/firebase');

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Safety Manager, ABC Manufacturing",
        quote: "Theuri Green Health Safe transformed our workplace safety culture. Their comprehensive audits and training programs have significantly reduced incidents and improved compliance.",
        order: 1
    },
    {
        name: "Michael Chen",
        role: "Environmental Director, GreenTech Solutions",
        quote: "Their environmental impact assessments helped us achieve our sustainability goals while maintaining operational efficiency. Highly professional and knowledgeable team.",
        order: 2
    },
    {
        name: "Emma Williams",
        role: "Operations Manager, Construction Plus",
        quote: "Outstanding consultancy services that provided practical solutions to our risk management challenges. Their expertise is unmatched in the industry.",
        order: 3
    }
];

async function seedTestimonials() {
    console.log('🌱 Seeding Testimonials...');
    try {
        const collection = db.collection('testimonials');

        // Check if collection is empty
        const snapshot = await collection.get();
        if (!snapshot.empty) {
            console.log('⚠️ Testimonials collection is not empty. Skipping seed.');
            return;
        }

        for (const item of testimonials) {
            await collection.add({
                ...item,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added testimonial from: ${item.name}`);
        }
        console.log('🎉 Seeding complete!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
}

seedTestimonials();
