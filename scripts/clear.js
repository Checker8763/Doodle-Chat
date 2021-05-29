const FS = require('fs');
const PATH = require('path');

dirsToClear = [
    'website/script',
    'website/css'
]

const rmDir = function (dirPath, justContent = false) {
    if (!FS.existsSync(dirPath)) return false
    const files = FS.readdirSync(dirPath)
    files.forEach((filename) => {
        filepath = PATH.join(dirPath, filename)
        if (FS.statSync(filepath).isDirectory()) {
            rmDir(filepath)
        } else {
            FS.unlinkSync(filepath)
        }
    })
    if (!justContent) FS.rmdirSync(dirPath)
    return true
}

dirsToClear.forEach((dirName) => rmDir(dirName, true))