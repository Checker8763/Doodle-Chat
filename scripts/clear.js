const FS = require('fs');
const PATH = require('path');

function rmDirSync (dirPath, justContent = false) {
    // No Dir -> nothing to do
    if (!FS.existsSync(dirPath)) return false
    // recursivly call rmDir on any subdirectory or delete the file
    const files = FS.readdirSync(dirPath)
    files.forEach((filename) => {
        filepath = PATH.join(dirPath, filename)
        if (FS.statSync(filepath).isDirectory()) {
            rmDirSync(filepath)
        } else {
            FS.unlinkSync(filepath)
        }
    })
    // Whether to delete only the contents
    if (!justContent) FS.rmdirSync(dirPath)
    return true
}

module.exports.rmDirSync = rmDirSync


if (require.main === module) {
    dirsToClear = [
        'dist',
        'website/script',
        'website/css'
    ]
    
    dirsToClear.forEach((dirName) => rmDirSync(dirName, true))
}
