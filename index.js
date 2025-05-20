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
        const images = ['jpg', 'png', 'gif', 'tiff', 'bmp', 'svg', 'heic'],  
            audio = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg'],  
            video = ['mp4', 'mkv', 'avi', 'mov', 'webm', 'flv', 'mpeg', 'wmv'],  
            documents = ['pdf', 'docx', 'doc', 'pptx', 'xlsx', 'odt', 'ods', 'csv', 'rtf', 'txt'],
            code = ['json', 'html', 'css', 'js', 'xml', 'py', 'java', 'c', 'cpp', 'rb', 'php', 'go', 'swift', 'rust'],  
            others = ['zip', 'rar', '7z', 'exe', 'bat', 'ps1'];

        /* 
            TODO
            - add helper function for fs.exists/fs.mkdir which returns a true value if dir exists/created
        */

        for (let i = 0; i < files.length; i++) {
            const currentFile = files[i],
                currentFileFormat = currentFile.split('.').pop().toLowerCase();
            
            if (images.includes(currentFileFormat)) {
                
            } else if (audio.includes(currentFileFormat)) {

            } else if (video.includes(currentFileFormat)) {

            } else if (documents.includes(currentFileFormat)) {

            } else if (code.includes(currentFileFormat)) {

            } else (others.includes(currentFileFormat)) {

            }
            
            // move logic below into each if condition above
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