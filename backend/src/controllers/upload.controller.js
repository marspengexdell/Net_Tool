import multer from 'multer';
import path from 'path';

// 1. 配置 Multer 存储选项
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// 2. 文件类型检查函数
function checkFileType(file, cb) {
  // 修正：同时允许图片和视频的文件类型
  const filetypes = /jpeg|jpg|png|gif|mp4|webm|ogg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only images and videos are allowed.'));
  }
}

// 3. 创建 Multer 上传实例
export const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 新增：将文件大小限制增加到 20MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// 4. 创建上传控制器函数
export const uploadImage = (req, res) => {
  console.log('Upload attempt received...');
  console.log('File details:', req.file);

  if (req.file) {
    console.log(`File ${req.file.filename} was uploaded successfully.`);
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      url: `/uploads/${req.file.filename}`,
    });
  } else {
    console.error('Upload failed: No file received from multer.');
    res.status(400).json({
      success: false,
      message: 'No file uploaded or file type is incorrect.',
    });
  }
};
