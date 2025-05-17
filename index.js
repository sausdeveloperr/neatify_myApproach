import fs from 'fs';
import path from 'path';
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
]).then((answers) => {  
    const src = answers.src; 
    const dest = answers.dest;

    console.log('reading provided folder...');  
    fs.readdir(src, (err, files) => {
        if (err) {  
            return console.error(`Error reading dir: ${err}`);  
        }  
        console.log(`${files.length} files were found in the ${src} folder`); 
        for (let i = 0; i < 5; i++) {
            const currentFile = files[i];            
            const srcPath = path.join(src, currentFile)
            const destPath = path.join(dest, currentFile)

            moveFile(srcPath, destPath)
        }
        
        // Create folders based on 5 criteria: images, audio, video, document, others using fs.mkdir
        console.log(`Created 5 folders in ${dest} folder`);  
    });  
}).catch(
    (err) => {
        console.info(`Error - ${err}`)
    }
)