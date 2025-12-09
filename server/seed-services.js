const { db } = require('./config/firebase');

const services = [
    {
        title: "Health & Safety Audits",
        icon: "fas fa-clipboard-check",
        shortDescription: "Comprehensive workplace assessments to identify hazards and ensure compliance with safety regulations.",
        fullDescription: "Comprehensive workplace assessments designed to identify hazards, evaluate risks, and ensure full compliance with health and safety regulations.",
        features: [
            "Workplace hazard identification and risk assessment",
            "Compliance audits for local and international standards",
            "Safety management system evaluation",
            "Incident investigation and analysis",
            "Emergency preparedness assessment",
            "Personal protective equipment evaluation"
        ],
        order: 1
    },
    {
        title: "Environmental Impact Assessments",
        icon: "fas fa-leaf",
        shortDescription: "Detailed environmental studies to minimize ecological impact and ensure sustainable operations.",
        fullDescription: "Detailed environmental studies to minimize ecological impact, ensure regulatory compliance, and promote sustainable business operations.",
        features: [
            "Environmental impact screening and scoping",
            "Baseline environmental studies",
            "Impact prediction and evaluation",
            "Mitigation measures development",
            "Environmental management plans",
            "Monitoring and audit programs"
        ],
        order: 2
    },
    {
        title: "Training & Consultancy",
        icon: "fas fa-chalkboard-teacher",
        shortDescription: "Expert training programs and consultancy services to build safety culture and best practices.",
        fullDescription: "Expert training programs and consultancy services designed to build safety culture, enhance competencies, and implement best practices across your organization.",
        features: [
            "Health and safety awareness training",
            "Environmental management training",
            "Risk assessment and management",
            "Emergency response training",
            "Leadership development programs",
            "Customized industry-specific training"
        ],
        order: 3
    },
    {
        title: "Risk Management Solutions",
        icon: "fas fa-exclamation-triangle",
        shortDescription: "Comprehensive risk assessment and management strategies to protect your business and employees.",
        fullDescription: "Comprehensive risk assessment and management strategies to protect your business, employees, and stakeholders from potential hazards and uncertainties.",
        features: [
            "Comprehensive risk identification and analysis",
            "Risk assessment methodologies",
            "Risk mitigation strategy development",
            "Business continuity planning",
            "Crisis management protocols",
            "Risk monitoring and review systems"
        ],
        order: 4
    }
];

async function seedServices() {
    console.log('🌱 Seeding Services...');
    try {
        const collection = db.collection('services');

        // Check if services prevent duplication
        const snapshot = await collection.get();
        if (!snapshot.empty) {
            console.log('⚠️ Services collection is not empty. Skipping seed to prevent duplicates.');
            return;
        }

        for (const service of services) {
            await collection.add({
                ...service,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Added: ${service.title}`);
        }
        console.log('🎉 Seeding complete!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
}

seedServices();
