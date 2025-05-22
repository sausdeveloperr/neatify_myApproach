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
        const imagesExt = ['jpg', 'png', 'gif', 'tiff', 'bmp', 'svg', 'heic'],  
            audioExt = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg'],  
            videoExt = ['mp4', 'mkv', 'avi', 'mov', 'webm', 'flv', 'mpeg', 'wmv'],  
            documentsExt = ['pdf', 'docx', 'doc', 'pptx', 'xlsx', 'odt', 'ods', 'csv', 'rtf', 'txt'],
            codeExt = ['json', 'html', 'css', 'js', 'xml', 'py', 'java', 'c', 'cpp', 'rb', 'php', 'go', 'swift', 'rust'],  
            othersExt = ['zip', 'rar', '7z', 'exe', 'bat', 'ps1'];

        // Create folders based on 5 criteria: images, audio, video, document, others using fs.mkdir
        console.log(`Created 5 folders in ${dest} folder`);  
        /* 
            TODO
            - add helper function for fs.exists/fs.mkdir which returns a true value if dir exists/created ✅
            - move logic below into each if condition above ✅
            - refactor code to do file movement within the For loop instead of outside. Move fileMover() to inside loop -
                passed the file[i] part into the fileMover() instead, hoping it works!✅
        */

        function dirMaker(dirName) {
            const dirPath = `${dest}/${dirName}`;

            try {
                if (fs.existsSync(dirPath)) {
                    return true
                } else {
                    fs.mkdirSync(dirPath)
                    return true
                }
            } catch (err) {
                console.log(`mkdir/exist error: ${err}`)
            }
        }

        function fileMover(dirName, filename) {
            const currentFile = filename;
            const srcPath = path.join(src, currentFile);
            const sortDir = `${dest}/${dirName}`;
            const destPath = path.join(sortDir, currentFile);
            moveFile(srcPath, destPath);
        }

        for (let i = 0; i < files.length; i++) {
            const currentFileFormat = files[i].split('.').pop().toLowerCase();
            
            if (imagesExt.includes(currentFileFormat) && dirMaker(images)) {
                let dirName = 'images';
                fileMover(dirName, files[i]);
            } else if (audioExt.includes(currentFileFormat) && dirMaker(audio)) {
                let dirName = 'audio';
                fileMover(dirName, files[i]);
            } else if (videoExt.includes(currentFileFormat) && dirMaker(video)) {
                let dirName = 'video';
                fileMover(dirName, files[i]);
            } else if (documentsExt.includes(currentFileFormat) && dirMaker(documents)) {
                let dirName = 'documents';
                fileMover(dirName, files[i]);
            } else if (codeExt.includes(currentFileFormat) && dirMaker(code)) {
                let dirName = 'code';
                fileMover(dirName, files[i]);
            } else if (othersExt.includes(currentFileFormat) && dirMaker(others)) {
                let dirName = 'others';
                fileMover(dirName, files[i]);
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