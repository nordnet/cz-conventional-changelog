module.exports = {
  branches: ["master"],
  plugins: [
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "@semantic-release/npm",
  ],
};
