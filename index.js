import fs from 'fs';
import path from 'path';
import { moveFile } from 'move-file';
import inquirer from 'inquirer';


inquirer.prompt([
    {
        name: 'src',
        type: 'input',
        message: 'input the source folder path or address'
    }
]).then((answers) => {  
    const src = answers.src; 

    console.log('reading folder...');  
    fs.readdir(src, (err, files) => {
        if (err) {  
            return console.error(`Error reading dir: ${err}`);  
        }  

        console.log(`${files.length} files found in ${src}`); 
        const imagesExt = ['jpg', 'png', 'gif', 'tiff', 'bmp', 'svg', 'heic'],  
            audioExt = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'ogg'],  
            videoExt = ['mp4', 'mkv', 'avi', 'mov', 'webm', 'flv', 'mpeg', 'wmv'],  
            documentsExt = ['pdf', 'docx', 'doc', 'pptx', 'xlsx', 'odt', 'ods', 'csv', 'rtf', 'txt'],
            codeExt = ['json', 'html', 'css', 'js', 'xml', 'py', 'java', 'c', 'cpp', 'rb', 'php', 'go', 'swift', 'rust', 'ts', 'sass', 'less', 'env', 'gitignore', 'yml'],  
            othersExt = ['zip', 'rar', '7z', 'exe', 'bat', 'ps1'];

        // Create folders based on 6 criteria: images, audio, video, document, codeFiles, others
        console.log(`Created 6 new folders in ${src}`);  

        function dirMaker(dirName) {
            const dirPath = `${src}/${dirName}`;

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

            const sortDir = `${src}/${dirName}`;
            const destPath = path.join(sortDir, currentFile);

            moveFile(srcPath, destPath);
        }

        var unknownFiles = [];
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
                fileMover('code files', files[i]);
                codeCount++;
            } else if (othersExt.includes(currentFileFormat) && dirMaker('others')) {
                fileMover('others', files[i]);
                othersCount++;
            } else {
                unknownFiles.push(files[i]);
            }
        } 
        console.log(`Organized ${files.length - unknownFiles.length} files into ${src} folders:
                - images: ${imgCount}
                - audio: ${audCount}
                - videos: ${vidCount}
                - documents: ${docCount}
                - code files: ${codeCount}
                - other files: ${othersCount}
            `);  
        console.log(`${unknownFiles.length} files could not be sorted into predefined groups: ${unknownFiles}`); 
        
        inquirer.prompt([
                {
                type: 'list',
                name: 'unsorted',
                message: 'delete unsorted files?',
                choices: ['yes', 'no'],
                },
            ])
            .then(answers => {
                console.info('Answer:', answers.unsorted);
                if (answers.unsorted === 'yes') {
                    for (let i = 0; i < unknownFiles.length; i++) {
                        const unsortedFile = unknownFiles[i];
                        const unsortedFilePath = path.join(src, unsortedFile);

                        try {
                            fs.unlinkSync(unsortedFilePath);
                            console.log(`${unsortedFile} deleted successfully`);
                        } catch (error) {
                            console.log(`${unsortedFile} delete error: ${error}`);
                        }
                    }
                }
            });
    });  
}).catch(
    (err) => {
        console.info(`inq error - ${err}`)
    }
)

// OUTPUT
/* HP-PC@SWIFTWEBBER-ILM4KF7 MINGW64 ~/Documents/Salami Olamilekan/MERN/JS/Projects/neatify (main)
$ node index.js 
✔ input the source folder path or address C:\Users\HP-PC\3D Objects\unsorted-files
reading folder...
30 files found in C:\Users\HP-PC\3D Objects\unsorted-files
Created 6 new folders in C:\Users\HP-PC\3D Objects\unsorted-files
Organized 28 files into C:\Users\HP-PC\3D Objects\unsorted-files folders:
                - images: 9
                - audio: 2
                - videos: 2
                - documents: 2
                - code files: 11
                - other files: 2

2 files could not be sorted into predefined groups: file329.xyz,file338.xyz
✔ delete unsorted files? no
Answer: no
 */