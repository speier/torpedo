var program = require('commander');
var torpedo = require('../torpedo');
var commands = require('./commands');

program.version(torpedo.version, '-v, --version').usage('[options] <command>');
program.command('new <name> [skeleton]').description('create a new project with the specified name').action(commands.create);
program.command('build').description('create a bundle from this application').action(commands.build);
program.command('watch [--server]').description('watch for changes and rebuild when needed').action(function() {});
program.parse(process.argv);

if (!program.args.length) {
  process.stdout.write(program.helpInformation());
  process.exit(0);
}
