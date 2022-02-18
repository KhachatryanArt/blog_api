const path = require("path")
const multer = require("@koa/multer");

const storage = multer.diskStorage({
    destination: function (ctx, file, cb) {
        cb(null, path.join(__dirname, '../src/uploads'))
    },
    filename: function (ctx, file, cb) {
        let type = file.originalname.split('.')[1]
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
    }
})

const limits = {
    fields: 10,//Number of non-file fields
    fileSize: 500 * 1024,//File Size Unit b
    files: 1//Number of documents
}

const upload = multer({limits, storage})
module.exports = upload

