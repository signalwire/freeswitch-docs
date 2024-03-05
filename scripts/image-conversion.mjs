import sharp from 'sharp'
import path from 'path'
import process from 'process'

const files = process.argv.slice(2);

if (files.length === 0) {
    console.log(`Usage:

node ${process.argv[1]} *.png *.jpg   
`)
    process.exit(0)
}

const lossyExtensions = ['.jpg', '.jpeg']
const losslessExtensions = ['.png']
const supportedExtensions = [...lossyExtensions, ...losslessExtensions]

files.forEach(async (f) => {
    const ext = path.extname(f).toLowerCase()
    const targetFile = f.split('.').slice(0, -1).join('.') + '.webP';

    if (supportedExtensions.includes(ext)) {
        sharp(f)
            .webp({ lossless: losslessExtensions.includes(ext) })
            .toFile(targetFile)
            .then(_ => { console.log("Wrote", targetFile) })
            .catch(_ => { console.error("Could not convert", f) });
    } else {
        console.error("Extension not supported:", f)
    }
})