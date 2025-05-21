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

        // no err? proceed to sorting...
        console.log(`${files.length} files were found in the ${src} folder`); 
        const images = ['jpg', 'png', 'gif', 'tiff', 'bmp', 'svg', 'heic'],  
            audio = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg'],  
            video = ['mp4', 'mkv', 'avi', 'mov', 'webm', 'flv', 'mpeg', 'wmv'],  
            documents = ['pdf', 'docx', 'doc', 'pptx', 'xlsx', 'odt', 'ods', 'csv', 'rtf', 'txt'],
            code = ['json', 'html', 'css', 'js', 'xml', 'py', 'java', 'c', 'cpp', 'rb', 'php', 'go', 'swift', 'rust'],  
            others = ['zip', 'rar', '7z', 'exe', 'bat', 'ps1'];

        // Create folders based on 5 criteria: images, audio, video, document, others using fs.mkdir
        console.log(`Created 5 folders in ${dest} folder`);  
        /* 
            TODO
            - add helper function for fs.exists/fs.mkdir which returns a true value if dir exists/created ✅
            - move logic below into each if condition above ✅
        */

        function dirMaker(dirName) {
            const dirPath = `'/${dest}/${dirName}'`;

            try {
                if (fs.existsSync(dirPath)) {
                    return true
                } else {
                    fs.mkdirSync(dirPath)
                    return true
                }
            } catch (err) {
                console.log(`dir error: ${err}`)
            }
        }

        function fileMover(dirName) {
            const currentFile = files[i];
            const srcPath = path.join(src, currentFile);
            const sortDir = `'/${dest}/${dirName}'`;
            const destPath = path.join(sortDir, currentFile) 

            moveFile(srcPath, destPath)
        }

        for (let i = 0; i < files.length; i++) {
            const currentFileFormat = files[i].split('.').pop().toLowerCase();
            
            if (images.includes(currentFileFormat) && dirMaker(images)) {
                fileMover(images);
            } else if (audio.includes(currentFileFormat) && dirMaker(audio)) {
                fileMover(audio);
            } else if (video.includes(currentFileFormat) && dirMaker(video)) {
                fileMover(video);
            } else if (documents.includes(currentFileFormat) && dirMaker(documents)) {
                fileMover(documents);
            } else if (code.includes(currentFileFormat) && dirMaker(code)) {
                fileMover(code);
            } else if (others.includes(currentFileFormat) && dirMaker(others)) {
                fileMover(others);
            } else {
                console.log('File cannot be sorted into predefined groups');
            }
        }
    });  
}).catch(
    (err) => {
        console.info(`Error - ${err}`)
    }
)