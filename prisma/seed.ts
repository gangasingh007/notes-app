import 'dotenv/config';
import prisma from '@/lib/prisma';
import { ResourceType } from '../app/generated/prisma/client';
import * as bcrypt from 'bcryptjs';

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.resource.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        firstaName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
        email: 'john.doe@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        firstaName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '+1234567891',
        email: 'jane.smith@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        firstaName: 'Michael',
        lastName: 'Johnson',
        phoneNumber: '+1234567892',
        email: 'michael.johnson@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        firstaName: 'Emily',
        lastName: 'Brown',
        phoneNumber: '+1234567893',
        email: 'emily.brown@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        firstaName: 'David',
        lastName: 'Wilson',
        phoneNumber: '+1234567894',
        email: 'david.wilson@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Create Classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        course: 'Computer Science',
        section: 'A',
        semester: 'Fall 2024',
      },
    }),
    prisma.class.create({
      data: {
        course: 'Computer Science',
        section: 'B',
        semester: 'Fall 2024',
      },
    }),
    prisma.class.create({
      data: {
        course: 'Mathematics',
        section: 'A',
        semester: 'Fall 2024',
      },
    }),
    prisma.class.create({
      data: {
        course: 'Physics',
        section: 'A',
        semester: 'Fall 2024',
      },
    }),
    prisma.class.create({
      data: {
        course: 'Computer Science',
        section: 'A',
        semester: 'Spring 2024',
      },
    }),
  ]);

  console.log(`Created ${classes.length} classes`);

  // Create Subjects for Computer Science Fall 2024 Section A
  const csSubjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Data Structures',
        classId: classes[0].id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Algorithms',
        classId: classes[0].id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Database Systems',
        classId: classes[0].id,
      },
    }),
  ]);

  // Create Subjects for Computer Science Fall 2024 Section B
  const csBSubjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Web Development',
        classId: classes[1].id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Software Engineering',
        classId: classes[1].id,
      },
    }),
  ]);

  // Create Subjects for Mathematics
  const mathSubjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Calculus I',
        classId: classes[2].id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Linear Algebra',
        classId: classes[2].id,
      },
    }),
  ]);

  // Create Subjects for Physics
  const physicsSubjects = await Promise.all([
    prisma.subject.create({
      data: {
        name: 'Classical Mechanics',
        classId: classes[3].id,
      },
    }),
    prisma.subject.create({
      data: {
        name: 'Electromagnetism',
        classId: classes[3].id,
      },
    }),
  ]);

  console.log('Created subjects for all classes');

  // Create Resources for Data Structures
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'Introduction to Arrays',
        link: 'https://www.youtube.com/watch?v=arrays-intro',
        type: ResourceType.video,
        subjectId: csSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Linked Lists Tutorial',
        link: 'https://www.youtube.com/watch?v=linked-lists',
        type: ResourceType.video,
        subjectId: csSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Data Structures Textbook Chapter 1',
        link: 'https://example.com/docs/ds-chapter1.pdf',
        type: ResourceType.document,
        subjectId: csSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Trees and Graphs Guide',
        link: 'https://example.com/docs/trees-graphs.pdf',
        type: ResourceType.document,
        subjectId: csSubjects[0].id,
      },
    }),
  ]);

  // Create Resources for Algorithms
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'Sorting Algorithms Explained',
        link: 'https://www.youtube.com/watch?v=sorting-algos',
        type: ResourceType.video,
        subjectId: csSubjects[1].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Big O Notation',
        link: 'https://www.youtube.com/watch?v=big-o',
        type: ResourceType.video,
        subjectId: csSubjects[1].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Algorithm Analysis Notes',
        link: 'https://example.com/docs/algo-analysis.pdf',
        type: ResourceType.document,
        subjectId: csSubjects[1].id,
      },
    }),
  ]);

  // Create Resources for Database Systems
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'SQL Basics Tutorial',
        link: 'https://www.youtube.com/watch?v=sql-basics',
        type: ResourceType.video,
        subjectId: csSubjects[2].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Database Normalization',
        link: 'https://example.com/docs/normalization.pdf',
        type: ResourceType.document,
        subjectId: csSubjects[2].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Indexing and Query Optimization',
        link: 'https://www.youtube.com/watch?v=db-optimization',
        type: ResourceType.video,
        subjectId: csSubjects[2].id,
      },
    }),
  ]);

  // Create Resources for Web Development
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'HTML & CSS Fundamentals',
        link: 'https://www.youtube.com/watch?v=html-css',
        type: ResourceType.video,
        subjectId: csBSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'JavaScript ES6 Features',
        link: 'https://www.youtube.com/watch?v=es6-features',
        type: ResourceType.video,
        subjectId: csBSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'React Documentation',
        link: 'https://example.com/docs/react-guide.pdf',
        type: ResourceType.document,
        subjectId: csBSubjects[0].id,
      },
    }),
  ]);

  // Create Resources for Software Engineering
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'Agile Methodology Overview',
        link: 'https://www.youtube.com/watch?v=agile-intro',
        type: ResourceType.video,
        subjectId: csBSubjects[1].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Design Patterns Guide',
        link: 'https://example.com/docs/design-patterns.pdf',
        type: ResourceType.document,
        subjectId: csBSubjects[1].id,
      },
    }),
  ]);

  // Create Resources for Calculus
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'Limits and Continuity',
        link: 'https://www.youtube.com/watch?v=limits',
        type: ResourceType.video,
        subjectId: mathSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Derivatives Tutorial',
        link: 'https://www.youtube.com/watch?v=derivatives',
        type: ResourceType.video,
        subjectId: mathSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Calculus Textbook',
        link: 'https://example.com/docs/calculus.pdf',
        type: ResourceType.document,
        subjectId: mathSubjects[0].id,
      },
    }),
  ]);

  // Create Resources for Linear Algebra
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'Matrices and Vectors',
        link: 'https://www.youtube.com/watch?v=matrices',
        type: ResourceType.video,
        subjectId: mathSubjects[1].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Eigenvalues and Eigenvectors',
        link: 'https://example.com/docs/eigenvalues.pdf',
        type: ResourceType.document,
        subjectId: mathSubjects[1].id,
      },
    }),
  ]);

  // Create Resources for Physics subjects
  await Promise.all([
    prisma.resource.create({
      data: {
        name: 'Newton\'s Laws of Motion',
        link: 'https://www.youtube.com/watch?v=newtons-laws',
        type: ResourceType.video,
        subjectId: physicsSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Classical Mechanics Lecture Notes',
        link: 'https://example.com/docs/mechanics.pdf',
        type: ResourceType.document,
        subjectId: physicsSubjects[0].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Maxwell\'s Equations Explained',
        link: 'https://www.youtube.com/watch?v=maxwell',
        type: ResourceType.video,
        subjectId: physicsSubjects[1].id,
      },
    }),
    prisma.resource.create({
      data: {
        name: 'Electromagnetic Theory',
        link: 'https://example.com/docs/em-theory.pdf',
        type: ResourceType.document,
        subjectId: physicsSubjects[1].id,
      },
    }),
  ]);

  console.log('Created resources for all subjects');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });