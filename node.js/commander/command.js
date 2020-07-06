#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

program
    .version('1.0.0')
    .option('-C, --chdir <path>', 'change the working directory')
    .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    .option('-T, --no-tests', 'ignore test hook')

program
    .allowUnknownOption()

    // 那这样写又有什么意义呢？
    .command('search [query]', 'search with optional query')
    .command('list', 'list packages installed', {isDefault: true});

program
    .command('install [name]')

    // 这样写描述不行，下面的 action，会被当作全局命令执行？
    //.command('install [name]', 'install one or more packages')
    .description('install one or more packages')
    .alias('i')
    .action((options) => {
        console.log(chalk.red(`install argument's: ${options}`));
    });

program
    .command('exec <cmd>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option("-e, --exec_mode <mode>", "Which exec mode to use")
    .action(function(cmd, options){
        console.log('exec "%s" using %s mode', cmd, options.exec_mode);
    })
    .on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log('    $ deploy exec sequential');
        console.log('    $ deploy exec async');
        console.log();
    });

program.parse(process.argv);

if (program.config) {
    console.log(chalk.red(`config argument's: ${program.config}`));
}