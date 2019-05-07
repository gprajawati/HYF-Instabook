'use strict';

// Import our webserver library
const webserver = require('./src/webserver/webserver');
const userTable = require('./src/database/tables/user-table');
const postTable = require('./src/database/tables/post-table');
const commentTable = require('./src/database/tables/comment-table');

// If the CTRL + C keys are pressed, exit
process.on('SIGINT', () => process.exit(128));

(async () => {
  await userTable.createTable();
})();

process.on('SIGINT', () => process.exit(128));

(async () => {
  await postTable.createTable();
})();

process.on('SIGINT', () => process.exit(128));

(async () => {
  await commentTable.createTable();
})();