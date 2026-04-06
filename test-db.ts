import prisma from './server/lib/prisma.js';

async function main() {
    try {
        console.log("Testing connection...");
        const user = await prisma.user.findFirst();
        console.log("Success! Found:", user);
    } catch (e) {
        console.error("DB Error:", e);
    }
}
main();
