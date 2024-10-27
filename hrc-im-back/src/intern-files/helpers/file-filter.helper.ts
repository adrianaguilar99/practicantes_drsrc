import { BadRequestException } from '@nestjs/common';

export const fileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|svg|pdf)$/)) {
    req.fileValidationError = 'Only image or PDF files are allowed!';
    return callback(
      new BadRequestException('Only image or PDF files are allowed!'),
      false,
    );
  }
  callback(null, true);
};
