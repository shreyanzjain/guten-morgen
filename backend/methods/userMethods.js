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

async function user_exists(username) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (user !== null) {
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

  const verified = await bcrypt.compare(
    password,
    hashed_password.hashed_password.toString()
  );
  return verified;
}

async function get_userId(username) {
  return await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      username: username,
    },
  });
}

module.exports = {
  create_user,
  user_exists,
  get_users,
  password_matches,
  get_userId,
};
