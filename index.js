import fs from 'fs';
// import path from 'path'
import { moveFile } from 'move-file';
import inquirer from 'inquirer';

// const src = path.join(__dirname,'source');
// const dest = path.join(__dirname,'destination');

inquirer.prompt([
    {
        name: 'src',
        type: 'input',
        message: 'input the source folder path or address'
    }, 
    {
        name: 'dest',
        type: 'input',
        message: 'input the destination folder path or address'
    }
]).then(
    (answers) => {
        console.log(answers.src)
        console.log(answers.dest)
    }
).catch(
    (err) => {
        console.info(`Error ${err} occured while parsing answers`)
    }
)