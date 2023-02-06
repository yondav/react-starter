const { readdirSync: readDirectory } = require('fs');

exports.scopes = (() =>
  readDirectory('src', {
    withFileTypes: true,
  }).map(dir => dir.name.split('.')[0]))().concat(['repo', 'public']);
