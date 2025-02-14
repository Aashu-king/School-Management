import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Types for file upload configurations
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Storage configuration
const storage = multer.diskStorage({
    destination: (
      req: Request, 
      file: Express.Multer.File, 
      cb: (error: Error | null, destination: string) => void
    ): void => {
      // const uploadDir = 'uploads/';
      const uploadDir = `uploads/${req.body.context}` || "uploads/default"
      console.log("context",req.body)
  
      // Check if the directory exists, create if not
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      cb(null, uploadDir);
    },
    filename: (
      req: Request, 
      file: Express.Multer.File, 
      cb: (error: Error | null, filename: string) => void
    ): void => {
      // Create unique filename with original extension
      const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueSuffix);
    }
  });
  

// File filter configuration
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  // Define allowed file types
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs and Word documents are allowed.'));
  }
};

// Create different multer instances for different use cases
export const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export const documentUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed!'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 
  }
});

export const generalUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 
  }
});

// Export specific upload middlewares for different routes
export const uploadMiddleware = {
  // Single file uploads
  singleImage: imageUpload.single('image'),
  singleDocument: documentUpload.single('document'),
  
  // Multiple files upload
  multipleImages: imageUpload.array('images', 5), // Max 5 images
  multipleDocuments: documentUpload.array('documents', 3), // Max 3 documents
  
  // Mixed fields upload
  profileUpload: imageUpload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 4 }
  ]),
  
  // General single file upload
  singleFile: generalUpload.single('file')
};

export const imageUploads = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

export default uploadMiddleware;


export const saveImage = (fieldName: string, uploadDir: string) => {
  return (req: Request, res: Response): Promise<{ filePath: string; fileName: string }> => {
    return new Promise((resolve, reject) => {
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          const uploadPath = path.join(uploadDir);
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = path.extname(file.originalname);
          cb(null, fieldName + '-' + uniqueSuffix + extension);
        },
      });

      const upload = multer({ storage }).single(fieldName);

      upload(req, res, (err: any) => {
        if (err) {
          reject(err);
        } else if (!req.file) {
          console.log('req.file: ', req.file);
          // reject(new Error('No file uploaded'));
          resolve({
            filePath: '',
            fileName: '',
          })
        } else {
          resolve({
            filePath: path.join(uploadDir, req.file.filename),
            fileName: req.file.filename,
          });
        }
      });
    });
  };
};