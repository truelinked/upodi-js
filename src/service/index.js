const fs = require('fs')
filedir = fs.readdirSync(__dirname + '/')
filedir.forEach(function(file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      var name = file.replace('.js', '');
      exports[name] = require('./' + file);
    }
});