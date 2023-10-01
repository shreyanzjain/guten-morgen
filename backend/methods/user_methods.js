const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 8;
const prisma = new PrismaClient();

async function create_user(username, password) {
  const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

  await prisma.user
    .create({
      data: {
        username: username,
        hashed_password: hashed_password,
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (err) => {
      console.log(err);
      await prisma.$disconnect();
      process.exit(1);
    });
}

function user_exists(username) {
  const user = async () => {
    return await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  };

  if (user) {
    return true;
  }

  return false;
}

async function get_users() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });

  return users;
}

async function password_matches(username, password) {
  const hashed_password = await prisma.user.findFirst({
    select: {
      hashed_password: true,
    },
    where: {
      username: username,
    },
  });

  const verified = await bcrypt.compare(password, hashed_password.hashed_password.toString());
  return verified;
}

async function add_task(userId, title, description){
    await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userId
      }
    })
    .then(async() => {
      await prisma.$disconnect();
    })
    .catch(async(err) => {
      console.log(err);
      await prisma.$disconnect();
      process.exit(1);
    });
}

async function get_userId(username){
  return await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      username: username
    }
  });
}

async function get_user_tasks(userId) {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId
    }
  });

  return tasks;
}

module.exports = { create_user, user_exists, get_users, password_matches, get_userId, add_task, get_user_tasks };
