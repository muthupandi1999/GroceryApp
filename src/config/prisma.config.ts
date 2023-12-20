import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
}

main()
  .then(() => {
    //console.log("DB Connected successfully");
  })
  .catch((err) => {
    //console.log("🚀  file: prisma.client.ts:15  err:", err);
  })
  .finally(() => prisma.$disconnect());
