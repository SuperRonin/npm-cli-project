#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
    // const shell = require('shelljs');
const log = require('tracer').colorConsole()
const fs = require('fs');
const inquirer = require('inquirer');


program
    .version('1.0.3')
    .description('Bus365 mobile application development vue project scaffolding')
program
    .command('init <project>')
    .action(function(tpl, project) {
        inquirer.prompt([{
            type: 'confirm',
            name: 'ISSPA',
            message: '创建单页应用?',
            default: true
        }]).then((answers) => {
            console.log(answers.ISSPA)
            if (answers.ISSPA) {
                log.info(`正在拉取单页模板代码，下载位置：${process.cwd()}/ ...`)
                console.log(process.cwd())
                clone(`http://192.168.3.46/phone/vueTpl.git`, `${process.cwd()}`, null, function() {
                    // shell.rm('-rf', pwd + `/fruit/.git`)
                    deleteFolder(`${process.cwd()}/.git`);
                    log.info('模板工程建立完成')
                })
            } else {
                log.info(`正在拉取多页模板代码，下载位置：${process.cwd()}/ ...`)
                console.log(process.cwd())
                clone(`http://192.168.3.46/phone/vueMtpl.git`, `${process.cwd()}`, null, function() {
                    // shell.rm('-rf', pwd + `/fruit/.git`)
                    deleteFolder(`${process.cwd()}/.git`);
                    log.info('模板工程建立完成')
                })
            }

        })

    })
program.parse(process.argv)



function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}