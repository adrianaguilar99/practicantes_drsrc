import { BadRequestException } from '@nestjs/common';

export const checkForDuplicates = (array: Array<Express.Multer.File>): void => {
  const elements = new Set(array.map((f) => f.originalname));
  // console.log({ elements, array });

  if (elements.size !== array.length) {
    throw new BadRequestException(
      'Files with repeated names are being sent...',
    );
  }
};
