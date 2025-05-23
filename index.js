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
        console.log(`${files.length} files were found in the ${src}`); 
        const imagesExt = ['jpg', 'png', 'gif', 'tiff', 'bmp', 'svg', 'heic'],  
            audioExt = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg'],  
            videoExt = ['mp4', 'mkv', 'avi', 'mov', 'webm', 'flv', 'mpeg', 'wmv'],  
            documentsExt = ['pdf', 'docx', 'doc', 'pptx', 'xlsx', 'odt', 'ods', 'csv', 'rtf', 'txt'],
            codeExt = ['json', 'html', 'css', 'js', 'xml', 'py', 'java', 'c', 'cpp', 'rb', 'php', 'go', 'swift', 'rust', 'ts', 'sass', 'less', 'env', 'gitignore', 'yml'],  
            othersExt = ['zip', 'rar', '7z', 'exe', 'bat', 'ps1'];

        // Create folders based on 5 criteria: images, audio, video, document, others using fs.mkdir
        console.log(`Created 5 sort folders in ${dest}`);  

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

        var undefined = [];
        let imgCount = 0, audCount = 0, vidCount = 0, docCount = 0, codeCount = 0, othersCount = 0;
        for (let i = 0; i < files.length; i++) {
            const currentFileFormat = files[i].split('.').pop().toLowerCase();
            
            if (imagesExt.includes(currentFileFormat) && dirMaker('images')) { 
                fileMover('images', files[i]);
                imgCount++;
            } else if (audioExt.includes(currentFileFormat) && dirMaker('audio')) {
                fileMover('audio', files[i]);
                audCount++;
            } else if (videoExt.includes(currentFileFormat) && dirMaker('video')) {
                fileMover('video', files[i]);
                vidCount++;
            } else if (documentsExt.includes(currentFileFormat) && dirMaker('documents')) {
                fileMover('documents', files[i]);
                docCount++;
            } else if (codeExt.includes(currentFileFormat) && dirMaker('code')) {
                fileMover('code', files[i]);
                codeCount++;
            } else if (othersExt.includes(currentFileFormat) && dirMaker('others')) {
                fileMover('others', files[i]);
                othersCount++;
            } else {
                undefined.push(files[i]);
            }
        } 
        console.log(`Organized ${files.length - undefined.length} files into ${dest} folders:
                - images: ${imgCount}
                - audio: ${audCount}
                - videos: ${vidCount}
                - documents: ${docCount}
                - code files: ${codeCount}
                - other files: ${othersCount}
            `);  
        console.log(`${undefined.length} files could not be sorted into predefined groups: ${undefined}`); 
        
        // TODO 
        // account for resets of the undefined array and the count vars. Is it needed since I'm doing node index.js each time
        // do you want to move unsorted files into 'undefined' folder or delete them - y yes, n no, d delete - NOT DECIDED YET!
    });  
}).catch(
    (err) => {
        console.info(`Error - ${err}`)
    }
)