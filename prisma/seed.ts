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
const APPLICATION_STATUSES = [
  {
    ID: 1,
    Name: "Saved",
    Description: "Application saved",
  },
  {
    ID: 2,
    Name: "Applied",
    Description: "Application applied",
  },
  {
    ID: 3,
    Name: "Interview",
    Description: "Application on interview",
  },
  {
    ID: 4,
    Name: "Offer",
    Description: "Application on offer",
  },
  {
    ID: 5,
    Name: "Rejected",
    Description: "Application rejected",
  }
];

const selectionProbabilities = [
  {
    ID: 1,
    Name: "Low",
    Description: "Low selection probability",
  },
  {
    ID: 2,
    Name: "Medium",
    Description: "Medium selection probability",
  },
  {
    ID: 3,
    Name: "High",
    Description: "High selection probability",
  },
]

const rankingCriteria = [
  {
    ID: 1,
    Name: "High Priority",
    Description: "High priority of choice",
    Weight: 1.0,
  },
  {
    ID: 2,
    Name: "Medium Priority",
    Description: "Medium priority of choice",
    Weight: 0.6,
  },
  {
    ID: 3,
    Name: "Low Priority",
    Description: "Low priority of choice",
    Weight: 0.3,
  },
]
  async function main() {
    await insertRoles();
    await insertSkills();
    await insertApplicationStatuses();
    await insertSelectionProbabilities();
    await insertRankingCriteria();
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

  async function insertApplicationStatuses() {
    console.log("INSERTING APPLICATION STATUSES .....");
  
    for (const applicationStatus of APPLICATION_STATUSES) {
      const result = await prisma.applicationStatus.upsert({
        where: { id: applicationStatus.ID },
        update: {},
        create: {
          id: applicationStatus.ID,
          name: applicationStatus.Name,
          description: applicationStatus.Description,
        },
      });
      console.log(result);
    }
  }

  async function insertSelectionProbabilities() {
    console.log("INSERTING SELECTION PROBABILITIES .....");
  
    for (const selectionProbability of selectionProbabilities) {
      const result = await prisma.selectionProbabilityTag.upsert({
        where: { id: selectionProbability.ID },
        update: {},
        create: {
          id: selectionProbability.ID,
          name: selectionProbability.Name,
          description: selectionProbability.Description,
        },
      });
      console.log(result);
    }
  }

  async function insertRankingCriteria() {
    console.log("INSERTING RANKING CRITERIA .....");
  
    for (const ranking of rankingCriteria) {
      const result = await prisma.rankingCriteria.upsert({
        where: { id: ranking.ID },
        update: {},
        create: {
          id: ranking.ID,
          name: ranking.Name,
          description: ranking.Description,
          weight: ranking.Weight,
        },
      })
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