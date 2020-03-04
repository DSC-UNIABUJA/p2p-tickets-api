'use strict';

const dotenv = require('dotenv');
const command_line_args = require('command-line-args');
const options = command_line_args([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'production',
    type: String,
  },
]);

const result2 = dotenv.config({
  path: `./env/${options.env}.env`,
});

if (result2.error) {
  throw result2.error;
}
