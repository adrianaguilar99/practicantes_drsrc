import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { normalizeString } from 'src/common/utils';
import { fileFilter } from 'src/intern-files/helpers';

const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = `public/intern-files/${req.params.internId}`;
      // console.log({ reqFiles: req });

      if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const name = normalizeString(file.originalname.split('.')[0])
        .split(' ')
        .join('-');
      const extension = extname(file.originalname);
      cb(null, `${name}${extension}`);
    },
  }),
  fileFilter,
  limits: { files: 5 },
};

export default multerOptions;
