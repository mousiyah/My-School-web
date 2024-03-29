const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();


async function main() {
  await prisma.user.deleteMany({});

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const password = '12345';
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email: "student@myschool.com",
    password: hashedPassword,
    role: "student",
  };

  try {
    await prisma.user.create({ data: user });
    console.log('Fake user created successfully');
  } catch (error) {
    console.error('Error creating fake user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();




// async function main() {

//   await prisma.user.deleteMany({}); 

//   const amountOfUsers = 50;
//   const users = [];

//   const saltRounds = 1;
//   const salt = await bcrypt.genSalt(saltRounds);
//   const password = '12345';
//   const hashedPassword = await bcrypt.hash(password, salt);

//   for (let i = 0; i < amountOfUsers; i++) {
//     const user = {
//       email: faker.internet.email(),
//       password: hashedPassword,
//       role: faker.random.arrayElement(['student', 'teacher', 'admin']),
//     };

//     users.push(user);
//   }

//   try {
//     await prisma.user.createMany({ data: users });
//     console.log('Fake users created successfully');
//   } catch (error) {
//     console.error('Error creating fake users:', error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();
