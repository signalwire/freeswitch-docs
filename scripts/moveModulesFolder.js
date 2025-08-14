/*
 We are moving the Modules folder from docs/FreeSWITCH-Explained/Modules to docs/Modules.
 This script exists individually in order to not conflict with current PRs that are being worked on.
 It can be run manually after the PRs are merged to move the folder and update the links in the markdown files.
*/
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const docsDir = path.join(repoRoot, 'docs');

function moveModulesFolder() {
    const oldPath = path.join(docsDir, 'FreeSWITCH-Explained', 'Modules');
    const newPath = path.join(docsDir, 'Modules');
    if (fs.existsSync(oldPath)) {
        try {
            fs.renameSync(oldPath, newPath);
            console.log(`Moved folder from ${oldPath} to ${newPath}`);
        } catch (err) {
            if (err.code === 'EPERM') {
                fs.cpSync(oldPath, newPath, { recursive: true });
                fs.rmSync(oldPath, { recursive: true, force: true });
                console.log(`Copied folder from ${oldPath} to ${newPath} and removed original`);
            } else {
                throw err;
            }
        }
    } else {
        console.log(`Folder not found: ${oldPath}`);
    }
}

function updateMarkdownLinks(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = content;
    const relativeFilePath = path.relative(docsDir, filePath);
    // If file is within docs/Modules, update ../Installation/ links.
    if (relativeFilePath.startsWith('Modules' + path.sep)) {
        // Change links like ../Installation/ to ../FreeSWITCH-Explained/Installation/
        updated = updated.replace(/(\(\s*\.\.\/)Installation\//g, '$1FreeSWITCH-Explained/Installation/');
    } else {
        // Update links pointing to ../FreeSWITCH-Explained/Modules/
        updated = updated.replace(/(\(\s*\.\.\/)FreeSWITCH-Explained\/Modules\//g, '$1Modules/');
    }
    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Updated links in: ${filePath}`);
    }
}

function traverseDir(dirPath) {
    fs.readdirSync(dirPath, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(dirPath, dirent.name);
        if (dirent.isDirectory()) {
            traverseDir(fullPath);
        } else if (dirent.isFile() && fullPath.endsWith('.mdx')) {
            updateMarkdownLinks(fullPath);
        }
    });
}

function main() {
    moveModulesFolder();
    traverseDir(docsDir);
}

main();
