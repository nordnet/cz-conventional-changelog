const shell = require("shelljs");

const getTicketIdMatch = (branchName) =>
  branchName.match(new RegExp(`[A-Za-z]{2,}-[0-9]+`, "g"));

const compose = (...fns) => {
  const [tailFn, ...restFns] = fns.reverse();
  return (...args) => restFns.reduce((value, fn) => fn(value), tailFn(...args));
};

const head = (array) => (array && array.length ? array[0] : undefined);

const toUpperCase = (str) => str.toUpperCase();

const orValue = (fn, val) => (input) => fn(input) || val;

const extractTicketId = (branchName) =>
  compose(toUpperCase, orValue(head, ""), getTicketIdMatch)(branchName);

const getBranchName = () =>
  shell.exec("git symbolic-ref --short HEAD", { silent: true }).stdout;

module.exports = compose(extractTicketId, getBranchName);
