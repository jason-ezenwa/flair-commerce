import multer, { diskStorage } from 'multer';
import { mkdir } from 'fs/promises';
const FILE_TYPE_MAP = { // allowed extensions
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = diskStorage({
  destination: async function (request, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]; // check if extension is in FILE_TYPE_MAP
    let uploadError = new Error('invalid image type');
    if (isValid) {
      uploadError = null;
    }
    try {
      await mkdir('public');
      await mkdir('public/flair-commerce-uploads');
    } catch (error) {
      // do nothing if folder exists
    }
    cb(uploadError, 'public/flair-commerce-uploads') // if confused check Disk Storage multer documentation
  },
  filename: function (request, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})

const upload = multer({ storage: storage });

export default upload;