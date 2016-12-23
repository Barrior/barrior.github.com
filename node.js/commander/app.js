#!/usr/bin/env node

// learn the start
// http://www.tuicool.com/articles/UbUfY3E
// http://tj.github.io/commander.js
const program = require('commander');

// 终端输出颜色
const chalk = require('chalk');

program
    // 设置版本号
    .version('1.0.0')

    // 容错处理
    .allowUnknownOption()

    // 添加命令
    .option('-p, --proj', 'I\'m proj')
    .option('-a, --all', 'I\'m all')

    // <path> required argument, 必需参数
    .option('-i, --pipe <path>', 'I\'m pipe')

    // [env] optional argument, 可选参数
    .option('-e, --env [env]', 'I\'m env')

    // 第一个参数：长短命令
    // 第二个参数：命令描述
    // 第三个参数：回调函数，如果有了回调函数，那么下面的 if (program.test) { 不会执行
    // 第四个参数：默认值，如果有了默认值，并且没有输入该选项，
    // 那么程序会使用默认值，然后一定执行到 if (program.test) {
    .option('-t, --test [arg]', 'Descriptions of test', function (inputVal) {

        console.log(inputVal);

    }, 'default_value_of_test')

    // 监听 help 事件来输出额外的帮助信息
    .on('--help', function () {
        console.log('  Examples:');
        console.log('    appName -e dev');
        console.log('    appName -p qmyx');
    })

    // 解析命令行参数，才能让命令行正常执行
    .parse(process.argv);

// 得到命令时，执行的操作
// 注意：如果命令带多个选项，程序执行的顺序取决于程序在文件中的执行顺序，与命令行顺序无关
if (program.proj) {
    console.log('I\'m proj')
}

if (program.all) {
    console.log('I\'m all')
}

if (program.pipe) {
    console.log('I\'m pipe arg is ' + program.pipe)
}

if (program.env) {
    console.log('I\'m env arg is ' + program.env)
}

console.log(program.test); // undefined
if (program.test) {
    console.log('I\'m test, arg is ' + chalk.red(program.test))
}
