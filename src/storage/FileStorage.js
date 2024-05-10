const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("public/images/products"));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  module.exports = { uploadProduct : multer({ storage: diskStorage }).single("image") };