const path = require('path');
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const User = require('~/models/User');
const connect = require('./connect');

async function findOldGuestUsers(beforeDate) {
  try {
    const guestUsers = await User.find({
      email: { $regex: /@guest\.local$/ },
      createdAt: { $lt: beforeDate },
    });

    return guestUsers;
  } catch (error) {
    console.red('Error finding guest users: ' + error.message);
    silentExit(1);
  }
}

async function deleteGuestUserCompletely(user) {
  const {
    Balance,
    deleteFiles,
    deleteConvos,
    deletePresets,
    deleteMessages,
    deleteUserById,
    deleteAllUserSessions,
  } = require('~/models');
  const { deleteUserPluginAuth } = require('~/server/services/PluginService');
  const { deleteUserKey } = require('~/server/services/UserService');
  const { deleteAllSharedLinks } = require('~/models/Share');
  const { deleteToolCalls } = require('~/models/ToolCall');
  const { Transaction } = require('~/models/Transaction');

  await deleteMessages({ user: user.id });
  await deleteAllUserSessions({ userId: user.id });
  await Transaction.deleteMany({ user: user.id });
  await deleteUserKey({ userId: user.id, all: true });
  await Balance.deleteMany({ user: user._id });
  await deletePresets(user.id);
  try {
    await deleteConvos(user.id);
  } catch (_e) {
    //silent
  }
  await deleteUserPluginAuth(user.id, null, true);
  await deleteUserById(user.id);
  await deleteAllSharedLinks(user.id);
  await deleteFiles(null, user.id);
  await deleteToolCalls(user.id);

  return true;
}

async function deleteGuestUsers(users) {
  let deletedCount = 0;

  for (const user of users) {
    try {
      await deleteGuestUserCompletely(user);
      deletedCount++;
      console.gray(`Completely deleted: ${user.email}`);
    } catch (error) {
      console.red(`Failed to delete ${user.email}: ${error.message}`);
    }
  }

  return deletedCount;
}

(async () => {
  await connect();

  const beforeDate = new Date();
  beforeDate.setDate(beforeDate.getDate() - 1); // Yesterday

  const oldGuestUsers = await findOldGuestUsers(beforeDate);

  const deletedCount = await deleteGuestUsers(oldGuestUsers);

  console.green(`Successfully deleted ${deletedCount} guest user(s).`);

  if (deletedCount !== oldGuestUsers.length) {
    console.yellow(`Note: ${oldGuestUsers.length - deletedCount} user(s) could not be deleted.`);
  }

  silentExit(0);
})();

process.on('uncaughtException', (err) => {
  if (!err.message.includes('fetch failed')) {
    console.error('There was an uncaught error:');
    console.error(err);
  }

  if (err.message.includes('fetch failed')) {
    return;
  }

  process.exit(1);
});
