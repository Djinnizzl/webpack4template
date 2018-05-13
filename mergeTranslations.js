const fs = require('fs');
const chalk = require('chalk')
const globSync = require('glob').sync;
const mkdirpSync = require('mkdirp').sync;

const filePattern = './dist/messages/**/*.json';
const outputDir = './dist/locales/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
let defaultMessages = globSync(filePattern)
  .map((filename) => fs.readFileSync(filename, 'utf8'))
  .map((file) => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({id, defaultMessage}) => {
      if (collection.hasOwnProperty(id)) {
        throw new Error(`\n\nDuplicate message id: ${chalk.red('>>>>   ' + id + '   <<<<')}\n\n\n`);
      }
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});
// Create a new directory that we want to write the aggregate messages to
mkdirpSync(outputDir);

// Write the messages to this directory
fs.writeFileSync(outputDir + 'data.json', `{ "en": ${JSON.stringify(defaultMessages, null, 2)} }`);