const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function add_task(userId, title, description) {
  await prisma.task
    .create({
      data: {
        title: title,
        description: description,
        userId: userId,
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

async function delete_task(task_id) {
  const task = await prisma.task.findFirst({
    where: {
      id: task_id,
    },
  });

  if (task) {
    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });
  }
}

async function get_user_tasks(userId) {
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });

  return tasks;
}

module.exports = { add_task, delete_task, get_user_tasks };
