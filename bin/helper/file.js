var fs = require('fs');
var FileError = require("./error.js").FileError;

/**
 *
 * @param {string} filePath
 * @param {function} resolve
 * @param {?function} reject
 * @return void
 */
var readFileStream = function (filePath, resolve, reject) {
    var readStream = fs.createReadStream(filePath);
    readStream
        .on('end', function () {
            resolve && resolve();
        })
        .on('error', function (err) {
            reject && reject(err);
        });
};

/**
 *
 * @param {string} filePath
 * @param {function} resolve
 * @param {?function} reject
 * @return void
 */
var readFileMsg = function (filePath, resolve, reject) {
    fs.stat(filePath, function (err, stat) {
        if (err) {
            if (reject) {
                reject(err);
            } else {
                throw new FileError('file load failed!!!');
            }
        } else {
            resolve && resolve(stat);
        }
    })
};

/**
 *
 * @param {string} readPath
 * @param {string} writePath
 * @param {function} resolve
 * @param {?function} reject
 * @return void
 */
var copyFile = function (readPath, writePath, resolve, reject) {
    fs.createReadStream(readPath)
        .on('end', function () {
            resolve && resolve();
        })
        .on('error', function (err) {
            reject && reject(err);
        })
        .pipe(fs.createWriteStream(writePath));
};

exports.readFileStream = readFileStream;
exports.readFileMsg = readFileMsg;
exports.copyFile = copyFile;
