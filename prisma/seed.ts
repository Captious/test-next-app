import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [{
            email: 'alice@example.com',
            name: 'Alice',
            createdAt: new Date(),
        }, {
            email: 'jon@example.com',
            name: 'Jon',
            createdAt: new Date(),
        }, {
            email: 'martin@example.com',
            name: 'Martin',
            createdAt: new Date(),
        }, {
            email: 'alex@example.com',
            name: 'Alex',
            createdAt: new Date(),
        }, {
            email: 'maxx@example.com',
            name: 'Maxx',
            createdAt: new Date(),
        }],
        skipDuplicates: true,
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
