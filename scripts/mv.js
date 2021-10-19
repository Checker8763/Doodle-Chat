const fs = require('fs');
const path = require('path');
const { rmDirSync } = require(`${__dirname}/clear`)

function copyFileSync(source, target) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.statSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target, onlyContents = false) {
    //TODO: normalize needed?
    source = path.normalize(source)
    target = path.normalize(target)

    if (
        !fs.existsSync(source) |
        !fs.statSync(source).isDirectory()
    ) return false

    //TODO: Implement try renaming firs
    // fs.renameSync https://nodejs.org/docs/latest/api/fs.html#fsrenamesyncoldpath-newpath
    /** https://stackoverflow.com/questions/8579055/how-do-i-move-files-in-node-js
     * 
var fs = require('fs');

module.exports = function move(oldPath, newPath, callback) {

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}
     */

    // if only contents target = target else target/subfolder
    if (!onlyContents) {
        target = path.join(target, path.basename(source));
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }
    }

    // Copy
    const files = fs.readdirSync(source);
    files.forEach((file) => {
        let currentFile = path.join(source, file);
        if (fs.statSync(currentFile).isDirectory()) {
            copyFolderRecursiveSync(currentFile, target);
        } else {
            copyFileSync(currentFile, target);
        }
    });
}


function move(oldPath, newPath, onlyContents) {
    copyFolderRecursiveSync(oldPath, newPath, onlyContents)
    rmDirSync(oldPath, onlyContents)
}

if (require.main === module) {
    let src = "dist/website"
    let dst = "website/script"
    move(src, dst, true)
}