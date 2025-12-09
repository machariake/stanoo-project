const { db } = require('./config/firebase');

const team = [
    {
        name: "John Theuri",
        role: "Chief Executive Officer",
        bio: "With over 20 years of experience in environmental management, John leads our strategic vision and ensures the highest quality of service delivery.",
        credentials: [
            "MSc Environmental Management",
            "Certified HSE Professional"
        ],
        order: 1
    },
    {
        name: "Dr. Sarah Mwangi",
        role: "Head of Health & Safety",
        bio: "Dr. Mwangi brings extensive expertise in occupational health and safety, leading our audit and compliance services with exceptional attention to detail.",
        credentials: [
            "PhD Occupational Health",
            "NEBOSH Certified"
        ],
        order: 2
    },
    {
        name: "Michael Kamau",
        role: "Environmental Specialist",
        bio: "Michael specializes in environmental impact assessments and sustainability consulting, helping clients achieve their environmental goals.",
        credentials: [
            "BSc Environmental Science",
            "EIA Lead Expert"
        ],
        order: 3
    },
    {
        name: "Grace Wanjiku",
        role: "Training & Development Manager",
        bio: "Grace designs and delivers comprehensive training programs that build safety culture and enhance organizational capabilities.",
        credentials: [
            "MSc Training & Development",
            "Certified Trainer"
        ],
        order: 4
    }
];

async function seedTeam() {
    console.log('🌱 Seeding Team Members...');
    try {
        const collection = db.collection('team');

        // Check if collection is empty
        const snapshot = await collection.get();
        if (!snapshot.empty) {
            console.log('⚠️ Team collection is not empty. Skipping seed.');
            return;
        }

        for (const member of team) {
            await collection.add({
                ...member,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added: ${member.name}`);
        }
        console.log('🎉 Seeding complete!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
}

seedTeam();
