import { hash, compare } from "bcrypt";
import { useEncoding, useDecoding } from "../src/Helpers/Base64";
import { PrismaClient } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();
const ROLES = [
  {
    ID: 1,
    Name: "Admin",
  },
  {
    ID: 2,
    Name: "Company",
  },
  {
    ID: 3,
    Name: "Proffessional",
  },
];
async function main() {
    await insertRoles();
    console.log({});
}
async function insertRoles() {
    console.log("INSERTING ROLES .....");
    
    for (const role of ROLES) {
      const result = await prisma.role.upsert({
        where: { name: role.Name },
        update: {},
        create: {
          id: role.ID,
          name: role.Name,
        },
      });
      console.log(result);
    }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });