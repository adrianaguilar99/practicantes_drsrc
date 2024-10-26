import { BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

export const searchFile = (internId: string, fileName: string) => {
  const path = join(`public/intern-files/${internId}/${fileName}`);
  if (!existsSync(path))
    throw new BadRequestException(`Not found file not with name: ${fileName}`);

  return path;
};
