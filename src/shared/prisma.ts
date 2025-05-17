import { PrismaClient } from "@prisma/client";
// prisma
const prisma = new PrismaClient({
    errorFormat: 'minimal'
})

export default prisma;