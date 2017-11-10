var engine = require('./engine');
var conventionalCommitTypes = require('conventional-commit-types');

var messages = {
  type: 'Type:',
  scope: 'Scope (optional):',
  subject: 'Short description:',
  body: 'Longer description (optional):\n',
  breaking: 'BREAKING CHANGE (optional):\n',
  issues: 'Closes issues (optional):\n',
}

module.exports = engine({
  types: conventionalCommitTypes.types,
  messages: messages
});
