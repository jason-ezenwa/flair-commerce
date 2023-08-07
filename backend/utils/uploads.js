const multer = require('multer');

const FILE_TYPE_MAP = { // allowed extensions
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]; // check if extension is in FILE_TYPE_MAP
    let uploadError = new Error('invalid image type');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads') // if confused check Disk Storage multer documentation
  },
  filename: function (request, file, cb) {
    const fileName = file.originalname.replace(' ', '-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})

const upload = multer({ storage: storage });

module.exports = upload;