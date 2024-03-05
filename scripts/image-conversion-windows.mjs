// Windows version of image-conversion.mjs. Will also work on other OS's.
// Made because the other script was not working on Windows.

// import the required modules
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// get the directory path from command line arguments
const directoryPath = process.argv[2];

if (!directoryPath) {
    console.error('Please provide a directory path');
    process.exit(1);
}

// read the contents of the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    // filter the files for .png and .jpg
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    // loop through each file and convert to webP
    imageFiles.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const outputFilePath = path.join(directoryPath, path.basename(file, path.extname(file)) + '.webp');

        sharp(filePath)
            .webp()
            .toFile(outputFilePath, (err) => {
                if (err) {
                    console.error('Error converting image:', err);
                } else {
                    console.log('Image converted successfully:', outputFilePath);
                }
            });
    });
});
