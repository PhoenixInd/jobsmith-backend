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

const SKILLS = [
    { Name: "JavaScript" },
    { Name: "TypeScript" },
    { Name: "Python" },
    { Name: "Java" },
    { Name: "C++" },
    { Name: "C#" },
    { Name: "PHP" },
    { Name: "Ruby" },
    { Name: "Go" },
    { Name: "Rust" },
    { Name: "Kotlin" },
    { Name: "Swift" },
    { Name: "Objective-C" },
    { Name: "SQL" },
    { Name: "NoSQL" },
    { Name: "HTML" },
    { Name: "CSS" },
    { Name: "Sass" },
    { Name: "LESS" },
    { Name: "React" },
    { Name: "Angular" },
    { Name: "Vue" },
    { Name: "Svelte" },
    { Name: "Node.js" },
    { Name: "Express.js" },
    { Name: "NestJS" },
    { Name: "Django" },
    { Name: "Flask" },
    { Name: "Spring Boot" },
    { Name: "Hibernate" },
    { Name: "Laravel" },
    { Name: "Symfony" },
    { Name: "Ruby on Rails" },
    { Name: "ASP.NET" },
    { Name: "GraphQL" },
    { Name: "RESTful APIs" },
    { Name: "Docker" },
    { Name: "Kubernetes" },
    { Name: "Terraform" },
    { Name: "AWS" },
    { Name: "Azure" },
    { Name: "Google Cloud" },
    { Name: "Jenkins" },
    { Name: "Git" },
    { Name: "CI/CD" },
    { Name: "Agile Methodologies" },
    { Name: "Scrum" },
    { Name: "Kanban" },
    { Name: "Jira" },
  ];

  async function main() {
    await insertRoles();
    await insertSkills();
    console.log('Seeding completed successfully');
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
  
  async function insertSkills() {
    console.log("INSERTING SKILLS .....");
  
    for (const skill of SKILLS) {
      const result = await prisma.skill.upsert({
        where: { name: skill.Name },
        update: {},
        create: {
          name: skill.Name,
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