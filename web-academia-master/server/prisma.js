import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
});

// Test connection
prisma.$connect()
    .then(() => {
        console.log('✅ Prisma connected to MySQL database');
    })
    .catch((error) => {
        console.error('❌ Error connecting to database:', error);
        process.exit(1);
    });

export default prisma;
