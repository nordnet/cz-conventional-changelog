var wrap = require("word-wrap");
var map = require("lodash.map");
var longest = require("longest");
var rightPad = require("right-pad");
var extractTicketId = require("./lib/extract-ticket-id");

var filter = function (array) {
  return array.filter(function (x) {
    return x;
  });
};
function merge(x, y) {
  return Object.assign({}, x, y);
}

const defaultMessages = {
  type: "Select the type of change that you're committing:",
  scope:
    "Denote the scope of this change ($location, $browser, $compile, etc.):\n",
  subject: "Write a short, imperative tense description of the change:\n",
  body: "Provide a longer description of the change:\n",
  breaking: "List any breaking changes:\n",
  issues: "List any issues closed by this change:\n",
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function (options) {
  var types = options.types;
  var messages = merge(defaultMessages, options.messages);

  var length = longest(Object.keys(types)).length + 1;
  var choices = map(types, function (type, key) {
    return {
      name: rightPad(key + ":", length) + " " + type.description,
      value: key,
    };
  });

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function (cz, commit) {
      console.log(
        "\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n"
      );

      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
        {
          type: "list",
          name: "type",
          message: messages.type,
          choices: choices,
        },
        {
          type: "input",
          name: "scope",
          message: messages.scope,
        },
        {
          type: "input",
          name: "subject",
          message: messages.subject,
        },
        {
          type: "input",
          name: "body",
          message: messages.body,
        },
        {
          type: "input",
          name: "breaking",
          message: messages.breaking,
        },
        {
          type: "input",
          name: "issues",
          message: messages.issues,
          default: extractTicketId(),
        },
      ]).then(function (answers) {
        var maxLineWidth = 100;

        var wrapOptions = {
          trim: true,
          newline: "\n",
          indent: "",
          width: maxLineWidth,
        };

        // parentheses are only needed when a scope is present
        var scope = answers.scope.trim();
        scope = scope ? "(" + answers.scope.trim() + ")" : "";

        // Hard limit this line
        var head = (answers.type + scope + ": " + answers.subject.trim()).slice(
          0,
          maxLineWidth
        );

        // Wrap these lines at 100 characters
        var body = wrap(answers.body, wrapOptions);

        // Apply breaking change prefix, removing it if already present
        var breaking = answers.breaking.trim();
        breaking = breaking
          ? "BREAKING CHANGE: " + breaking.replace(/^BREAKING CHANGE: /, "")
          : "";
        breaking = wrap(breaking, wrapOptions);

        var issues = answers.issues.trim();
        issues = issues ? "Closes issues: " + answers.issues : "";
        issues = wrap(issues, wrapOptions);

        var footer = filter([breaking, issues]).join("\n\n");

        commit(head + "\n\n" + body + "\n\n" + footer);
      });
    },
  };
};
