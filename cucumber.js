let common = [
  'test/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require test/step_definitions/**/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
].join(' ');

module.exports = {
  default: common
};