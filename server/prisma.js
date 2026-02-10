import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
});

// Testando conexão com o banco de dados
prisma.$connect()
    .then(() => {
        console.log('✅ Prisma conectado !');
    })
    .catch((error) => {
        console.error('❌ Erro em conectar ao banco:', error);
        process.exit(1);
    });

export default prisma;
